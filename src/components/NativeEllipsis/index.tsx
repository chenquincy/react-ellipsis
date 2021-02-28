import React from 'react';
import { NativeEllipsisProps } from '../../type';
import classNames from '../../utils/classNames';
import './index.css';

function NativeEllipsis({ ellipsis, text, maxLine }: NativeEllipsisProps) {
  return (
    <div
      className={classNames('__react-ellipsis-native', {
        ellipsis,
      })}
      style={{
        WebkitLineClamp: maxLine,
      }}
    >
      {text}
    </div>
  );
}
export default React.memo(NativeEllipsis);
