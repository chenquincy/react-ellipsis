/// <reference types="resize-observer-browser" />
import React, { useEffect, useRef, useState } from 'react';

import { JsEllipsisProps } from '../../type';

import { getMaxHeight } from '../../utils/compute';
import { frameThrottle, throttle } from '../../utils/throttle';
import { isSupportRequestAnimationFrame, isEffective } from '../../utils/is';

function JsEllipsis(props: JsEllipsisProps) {
  const {
    text,
    maxLine = 1,
    maxHeight,
    ellipsisChar,
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

  function handleOnReflow(ellipsis: boolean, result: string) {
    if (onReflow && typeof onReflow === 'function') {
      onReflow(ellipsis, result);
    }
  }
  // Truncate text until meet the ellipsis conditions.
  function truncate() {
    if (!ref.current || !textRef.current || !ellipsisRef.current || truncating.current) {
      return;
    }
    const max = isNaN(Number(maxHeight))
      ? getMaxHeight(ref.current, maxLine)
      : Number(maxHeight);
    textRef.current.innerText = text;
    ellipsisRef.current.style.display = 'none';
    const { height } = ref.current.getBoundingClientRect();
    if (height <= max) {
      handleOnReflow(false, text);
      return;
    }
    ellipsisRef.current.style.display = 'inline';
    truncating.current = true;
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
      textRef.current.innerText = currentText + temp;
      const { height } = ref.current.getBoundingClientRect();
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
    textRef.current.innerText = currentText;
    truncating.current = false;
  }
  // Call truncate function to reflow when the main props change.
  useEffect(() => {
    truncate();
  }, [text, maxLine, maxHeight, ellipsisChar, ellipsisNode, endExcludes]);

  // Observe resize event of container if reflowOnResize is true.
  useEffect(() => {
    let observer: ResizeObserver;
    if (ref.current && reflowOnResize) {
      // For performance, throttle the truncate frequency
      let throttleFn;
      if (!isEffective(reflowThresholdOnResize) && isSupportRequestAnimationFrame) {
        // Resize by using window.requestAnimationFrame
        // if it supported and "reflowThresholdOnResize" isn't effective.
        throttleFn = frameThrottle(truncate);
      } else {
        // Or using setTimeout with throttle.
        throttleFn = throttle(truncate, reflowThresholdOnResize);
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
      <span ref={textRef} className="__react-ellipsis-js-text"></span>
      <span
        ref={ellipsisRef}
        className="__react-ellipsis-js-ellipsis"
        onClick={handleEllipsisClick}
      >
        {ellipsisNode || ellipsisChar}
      </span>
    </div>
  );
}
export default React.memo(JsEllipsis);
