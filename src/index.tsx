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
    dangerouslyUseInnerHTML = false,
    maxLine = 1,
    maxHeight,
    ellipsisNode = '…',
    endExcludes = [],
    reflowOnResize = false,
    reflowThresholdOnResize,
    onReflow,
    onEllipsisClick,
  } = props;
  const useNativeEllipsis =
    isSupportNativeEllipsis &&
    maxHeight === undefined &&
    ellipsisNode === '…' &&
    endExcludes.length === 0 &&
    !onReflow &&
    !onEllipsisClick;

  return (
    <div className={classNames('__react-ellipsis', className)}>
      {useNativeEllipsis ? (
        <NativeEllipsis
          ellipsis={ellipsis}
          dangerouslyUseInnerHTML={dangerouslyUseInnerHTML}
          text={text}
          maxLine={maxLine}
        />
      ) : (
        <JsEllipsis
          text={text}
          dangerouslyUseInnerHTML={dangerouslyUseInnerHTML}
          maxLine={maxLine}
          maxHeight={maxHeight}
          ellipsis={ellipsis}
          ellipsisNode={ellipsisNode}
          endExcludes={endExcludes}
          reflowOnResize={reflowOnResize}
          reflowThresholdOnResize={reflowThresholdOnResize}
          onReflow={onReflow}
          onEllipsisClick={onEllipsisClick}
        />
      )}
    </div>
  );
}

export default React.memo(ReactEllipsis);
