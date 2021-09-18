/// <reference types="resize-observer-browser" />
import React, { useCallback, useEffect, useRef } from 'react';

import { JsEllipsisProps } from '../../type';

import { getLineHeight } from '../../utils/compute';
import { frameThrottle, throttle } from '../../utils/throttle';
import { isSupportRequestAnimationFrame, isEffective } from '../../utils/is';
import { getElementHeight, wrapTextChildNodesWithSpan } from '../../utils/dom';

function JsEllipsis(props: JsEllipsisProps) {
  const {
    text,
    dangerouslyUseInnerHTML,
    maxLine = 1,
    maxHeight,
    ellipsis,
    ellipsisNode,
    endExcludes = [],
    reflowOnResize,
    reflowThresholdOnResize,
    onReflow,
    onEllipsisClick,
  } = props;

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
    const max = isNaN(Number(maxHeight))
      ? lineHeightRef.current * maxLine
      : Number(maxHeight);
    let height = getElementHeight(ref.current);
    if (height <= max) {
      handleOnReflow(false, text);
      return;
    }
    truncating.current = true;
    ellipsisRef.current.style.display = 'inline';
    if (dangerouslyUseInnerHTML) {
      // wrap the text children node with span element.
      wrapTextChildNodesWithSpan(textRef.current);
      truncateHTML(ref.current, textRef.current, max);
    } else {
      truncateText(ref.current, textRef.current, max);
    }
    truncating.current = false;
  }, [
    text,
    ellipsis,
    dangerouslyUseInnerHTML,
    maxLine,
    maxHeight,
    ellipsisNode,
    endExcludes,
  ]);
  function truncateText(container: HTMLElement, textContainer: HTMLElement, max: number) {
    const text = textContainer.textContent || '';
    let currentText = '';
    let l = 0;
    let r = text.length - 1;
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
    // Callback after reflow.
    handleOnReflow(true, currentText);
    textContainer.innerText = currentText;
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
  useEffect(() => {
    if (ref.current) {
      lineHeightRef.current = getLineHeight(ref.current);
    }
    reflow();
  }, [reflow]);

  // Observe resize event of container if reflowOnResize is true.
  useEffect(() => {
    let observer: ResizeObserver;
    if (ref.current && reflowOnResize) {
      // For performance, throttle the truncate frequency
      let throttleFn;
      if (!isEffective(reflowThresholdOnResize) && isSupportRequestAnimationFrame) {
        // Resize by using window.requestAnimationFrame
        // if it supported and "reflowThresholdOnResize" isn't effective.
        throttleFn = frameThrottle(reflow);
      } else {
        // Or using setTimeout with throttle.
        throttleFn = throttle(reflow, reflowThresholdOnResize);
      }
      observer = new ResizeObserver(throttleFn);
      observer.observe(ref.current);
    }
    return () => {
      // Remove observer when component unmounted.
      observer?.disconnect();
    };
  }, []);

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
