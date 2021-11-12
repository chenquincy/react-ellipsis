import { ReactNode } from 'react';

export interface NativeEllipsisProps {
  /** Pure text that you want to ellipsis. */
  text: string;
  /** Whether ellipsis content, default true. */
  ellipsis: boolean;
  /** Max count of visible lines. */
  maxLine: number;
  /** Insert text to container with innerHTML(Warning: make sure the text is safe). */
  dangerouslyUseInnerHTML?: boolean;
}
export interface JsEllipsisProps {
  /** Pure text that you want to ellipsis. */
  text: string;
  /** Whether ellipsis content, default true. */
  ellipsis: boolean;
  /** Insert text to container with innerHTML(Warning: make sure the text is safe). */
  dangerouslyUseInnerHTML?: boolean;
  /** Content will be truncated if the line count of visible content more than it. */
  maxLine?: number;
  /** Max count of visible lines, default equal to maxLine. */
  visibleLine?: number;
  /** Content will be truncated if the height of visible content more than it. */
  maxHeight?: number;
  /** Max height of visible content, default equal to maxHeight. */
  visibleHeight?: number;
  /** Customize the ellipsis node. */
  ellipsisNode?: ReactNode;
  /** The chars that will be removed before ellipsis. */
  endExcludes?: string[];
  /** Whether update when container resize, default false. */
  reflowOnResize?: boolean;
  /** Text reflow callback, only supported with js ellipsis. */
  onReflow?: (ellipsis: boolean, text: string) => void;
  /** Ellipsis click callback. */
  onEllipsisClick?: () => void;
}
export interface EllipsisProps extends JsEllipsisProps {
  /** Custom className of component. */
  className?: string;
}
