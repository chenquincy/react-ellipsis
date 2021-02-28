import React from 'react';

import { EllipsisProps } from './type';
import { isSupportNativeEllipsis } from './utils/is';
import classNames from './utils/classNames';

import NativeEllipsis from './components/NativeEllipsis';
import JsEllipsis from './components/JsEllipsis';

function ReactEllipsis(props: EllipsisProps) {
  const {
    className,
    ellipsis = true,
    text,
    maxLine = 1,
    maxHeight,
    ellipsisChar = '…',
    dangerousEllipsisHtml = undefined,
    endExcludes = [],
    reflowOnResize = false,
    reflowThresholdOnResize = 60,
    onReflow,
  } = props;
  const useNativeEllipsis =
    isSupportNativeEllipsis &&
    maxHeight === undefined &&
    ellipsisChar === '…' &&
    !dangerousEllipsisHtml &&
    endExcludes.length === 0 &&
    !onReflow;

  return ellipsis ? (
    <div className={classNames('__react-ellipsis', className)}>
      {useNativeEllipsis ? (
        <NativeEllipsis ellipsis={ellipsis} text={text} maxLine={maxLine} />
      ) : (
        <JsEllipsis
          text={text}
          maxLine={maxLine}
          maxHeight={maxHeight}
          ellipsisChar={ellipsisChar}
          dangerousEllipsisHtml={dangerousEllipsisHtml}
          endExcludes={endExcludes}
          onReflow={onReflow}
          reflowOnResize={reflowOnResize}
          reflowThresholdOnResize={reflowThresholdOnResize}
        />
      )}
    </div>
  ) : (
    <div className={classNames('__react-ellipsis', className)}>{text}</div>
  );
}

export default React.memo(ReactEllipsis);
