// <reference types="resize-observer-browser" />
import React, { useCallback, useLayoutEffect, useRef } from 'react';

import { JsEllipsisProps } from '../../type';

import { getLineHeight } from '../../utils/compute';
import { getElementHeight, wrapTextChildNodesWithSpan } from '../../utils/dom';

function JsEllipsis(props: JsEllipsisProps) {
  const {
    text,
    dangerouslyUseInnerHTML,
    maxLine = 1,
    visibleLine,
    maxHeight,
    visibleHeight,
    ellipsis,
    ellipsisNode,
    endExcludes = [],
    reflowOnResize,
    onReflow,
    onEllipsisClick,
  } = props;
  // default visibleLine equal to maxLine.
  const _visibleLine = typeof visibleLine === 'undefined' ? maxLine : visibleLine;

  const observerRef = useRef<ResizeObserver | null>(null);
  const truncating = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const ellipsisRef = useRef<HTMLSpanElement>(null);

  const lineHeightRef = useRef(0);

  function handleOnReflow(ellipsis: boolean, result: string) {
    if (onReflow && typeof onReflow === 'function') {
      onReflow(ellipsis, result);
    }
  }

  const reflow = useCallback(() => {
    if (!ref.current || !textRef.current || !ellipsisRef.current || truncating.current) {
      return;
    }
    ellipsisRef.current.style.display = 'none';
    if (dangerouslyUseInnerHTML) {
      textRef.current.innerHTML = text;
    } else {
      textRef.current.innerText = text;
    }
    if (!ellipsis) {
      return;
    }

    const max =
      typeof maxHeight === 'undefined' ? lineHeightRef.current * maxLine : maxHeight;
    // desired visible height of container.
    const visibleMax =
      typeof visibleHeight === 'undefined'
        ? typeof maxHeight === 'undefined'
          ? lineHeightRef.current * _visibleLine
          : maxHeight
        : visibleHeight;

    const height = getElementHeight(ref.current);
    // content will be truncated if the content's height bigger than Math.max(max, visibleMax).
    if (height <= Math.max(max, visibleMax)) {
      handleOnReflow(false, text);
      return;
    }

    truncating.current = true;
    ellipsisRef.current.style.display = 'inline';
    if (dangerouslyUseInnerHTML) {
      // wrap the text children node with span element.
      wrapTextChildNodesWithSpan(textRef.current);
      truncateHTML(ref.current, textRef.current, visibleMax);
    } else {
      truncateText(ref.current, textRef.current, visibleMax);
    }
    truncating.current = false;
  }, [
    text,
    ellipsis,
    dangerouslyUseInnerHTML,
    maxLine,
    visibleLine,
    maxHeight,
    visibleHeight,
    ellipsisNode,
    endExcludes,
  ]);
  function truncateText(container: HTMLElement, textContainer: HTMLElement, max: number) {
    const text = textContainer.textContent || '';
    let currentText = '';
    let l = 0;
    let r = text.length;
    // Binary truncate text until get the max limit fragment of text.
    while (l < r) {
      const m = Math.floor((l + r) / 2);
      if (l === m) {
        break;
      }
      const temp = text.slice(l, m);
      textContainer.innerText = currentText + temp;
      const { height } = container.getBoundingClientRect();
      if (height > max) {
        r = m;
      } else {
        currentText += temp;
        l = m;
      }
    }
    // Remove the exclude char at the end of the content.
    while (endExcludes.includes(currentText[currentText.length - 1])) {
      currentText = currentText.slice(0, -1);
    }
    textContainer.innerText = currentText;
    // Callback after reflow.
    handleOnReflow(true, currentText);
  }
  function truncateHTML(container: HTMLElement, textContainer: HTMLElement, max: number) {
    // only enter this function when container overflow.
    const children = textContainer.childNodes;
    if (children.length === 1) {
      const node = children[0] as HTMLElement;
      if (node.nodeType === Node.TEXT_NODE) {
        truncateText(container, textContainer, max);
      } else {
        const html = node.innerHTML;
        // clear content to determine whether the empty node can be placed.
        node.innerHTML = '';
        const { height } = container.getBoundingClientRect();
        if (height > max) {
          // return after remove the node, if overflow with empty node.
          textContainer.removeChild(node);
          handleOnReflow(true, textContainer.innerHTML);
          return;
        }
        node.innerHTML = html;
        // recursive truncate node
        truncateHTML(container, node, max);
      }
    } else {
      const nodes = [].slice.call(children);
      textContainer.innerHTML = '';
      let i = 0;
      // find the critical node
      while (i < nodes.length) {
        textContainer.appendChild(nodes[i]);
        const { height } = container.getBoundingClientRect();
        if (height > max) {
          break;
        }
        i++;
      }
      if (textContainer.childNodes[i]) {
        // truncate the critical node
        truncateHTML(container, textContainer.childNodes[i] as HTMLElement, max);
      }
    }
  }
  // Call truncate function to reflow when the main props change.
  useLayoutEffect(() => {
    if (ref.current) {
      lineHeightRef.current = getLineHeight(ref.current);
    }
    reflow();
  }, [reflow]);

  // Observe resize event of container if reflowOnResize is true.
  useLayoutEffect(() => {
    const dom = ref.current;
    if (dom && reflowOnResize) {
      if (!observerRef.current && ellipsis) {
        observerRef.current = new ResizeObserver(reflow);
        observerRef.current.observe(dom);
      }
    }
    return () => {
      if (observerRef.current && dom) {
        // Remove observer when component unmounted.
        observerRef.current?.unobserve(dom);
        observerRef.current = null;
      }
    };
  }, [ellipsis, ref.current]);

  // callback of ellipsis click event
  function handleEllipsisClick() {
    if (onEllipsisClick && typeof onEllipsisClick === 'function') {
      onEllipsisClick();
    }
  }

  return (
    <div ref={ref} className="__react-ellipsis-js">
      <span ref={textRef} className="__react-ellipsis-js-content"></span>
      <span
        ref={ellipsisRef}
        className="__react-ellipsis-js-ellipsis"
        onClick={handleEllipsisClick}
      >
        {ellipsisNode}
      </span>
    </div>
  );
}
export default React.memo(JsEllipsis);
