import React from 'react';
import { NativeEllipsisProps } from '../../type';
import classNames from '../../utils/classNames';
import './index.css';

function NativeEllipsis({
  text,
  maxLine,
  ellipsis,
  dangerouslyUseInnerHTML,
}: NativeEllipsisProps) {
  return (
    <div
      className={classNames('__react-ellipsis-native', { ellipsis })}
      style={{
        WebkitLineClamp: maxLine,
      }}
    >
      {dangerouslyUseInnerHTML ? (
        <span dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
export default React.memo(NativeEllipsis);
