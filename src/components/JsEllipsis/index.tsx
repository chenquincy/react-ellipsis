/// <reference types="resize-observer-browser" />
import React, { useEffect, useRef, useState } from 'react';

import { JsEllipsisProps } from '../../type';

import classNames from '../../utils/classNames';
import { getMaxHeight } from '../../utils/compute';
import throttle from '../../utils/throttle';

import './index.css';

function JsEllipsis(props: JsEllipsisProps) {
  const {
    text,
    maxLine = 1,
    maxHeight,
    ellipsisChar,
    dangerousEllipsisHtml,
    endExcludes = [],
    reflowOnResize,
    reflowThresholdOnResize,
    onReflow,
  } = props;

  const truncating = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [showEllipsis, setShowEllipsis] = useState(true);

  function handleOnReflow(ellipsis: boolean, result: string) {
    setShowEllipsis(ellipsis);
    if (onReflow && typeof onReflow === 'function') {
      onReflow(ellipsis, result);
    }
  }
  /**
   * Truncate text until meet the ellipsis conditions.
   * @param maxHeight The max height of the container.
   */
  function truncate() {
    if (!ref.current || !textRef.current || truncating.current) {
      return;
    }
    textRef.current.innerText = text;
    const max = isNaN(Number(maxHeight))
      ? getMaxHeight(ref.current, maxLine)
      : Number(maxHeight);
    const { height } = ref.current.getBoundingClientRect();
    if (height <= max) {
      handleOnReflow(false, text);
      return;
    }
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
  }, [text, maxLine, maxHeight, ellipsisChar, dangerousEllipsisHtml, endExcludes]);

  // Observe resize event of container if reflowOnResize is true.
  useEffect(() => {
    let observer: ResizeObserver;
    if (ref.current && reflowOnResize) {
      observer = new ResizeObserver(
        // For performance, throttle the truncate frequency
        throttle(() => {
          truncate();
        }, reflowThresholdOnResize)
      );
      observer.observe(ref.current);
    }
    return () => {
      // Remove observer when component unmounted.
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="__react-ellipsis-js">
      <span ref={textRef} className="__react-ellipsis-js-text"></span>
      {dangerousEllipsisHtml ? (
        <span
          className={classNames('__react-ellipsis-js-ellipsis', {
            hidden: !showEllipsis,
          })}
          dangerouslySetInnerHTML={{
            __html: dangerousEllipsisHtml,
          }}
        ></span>
      ) : (
        <span
          className={classNames('__react-ellipsis-js-ellipsis', {
            hidden: !showEllipsis,
          })}
        >
          {ellipsisChar}
        </span>
      )}
    </div>
  );
}
export default React.memo(JsEllipsis);
