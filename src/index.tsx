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
    ellipsisNode = undefined,
    endExcludes = [],
    reflowOnResize = false,
    reflowThresholdOnResize = 60,
    onReflow,
    onEllipsisClick,
  } = props;
  const useNativeEllipsis =
    isSupportNativeEllipsis &&
    maxHeight === undefined &&
    ellipsisChar === '…' &&
    !ellipsisNode &&
    endExcludes.length === 0 &&
    !onReflow &&
    !onEllipsisClick;

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
          ellipsisNode={ellipsisNode}
          endExcludes={endExcludes}
          reflowOnResize={reflowOnResize}
          reflowThresholdOnResize={reflowThresholdOnResize}
          onReflow={onReflow}
          onEllipsisClick={onEllipsisClick}
        />
      )}
    </div>
  ) : (
    <div className={classNames('__react-ellipsis', className)}>{text}</div>
  );
}

export default React.memo(ReactEllipsis);
