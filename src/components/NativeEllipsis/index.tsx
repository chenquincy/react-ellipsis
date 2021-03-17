import React, { useRef, useEffect } from 'react';
import { NativeEllipsisProps } from '../../type';
import classNames from '../../utils/classNames';
import './index.css';

function NativeEllipsis({
  text,
  maxLine,
  ellipsis,
  dangerouslyUseInnerHTML,
}: NativeEllipsisProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const method = dangerouslyUseInnerHTML ? 'innerHTML' : 'innerText';
      ref.current[method] = text;
    }
  }, [text, dangerouslyUseInnerHTML]);
  return (
    <div
      ref={ref}
      className={classNames('__react-ellipsis-native', { ellipsis })}
      style={{
        WebkitLineClamp: maxLine,
      }}
    >
      {text}
    </div>
  );
}
export default React.memo(NativeEllipsis);
