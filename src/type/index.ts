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
  /** Max count of visible lines. */
  maxLine?: number;
  /** Max visible height of container. */
  maxHeight?: number;
  /** Customize the ellipsis node. */
  ellipsisNode?: ReactNode;
  /** The chars that will be removed before ellipsis. */
  endExcludes?: string[];
  /** Whether update when container resize, default false. */
  reflowOnResize?: boolean;
  /** The threshold of reflow throttle on resize, default 60. */
  reflowThresholdOnResize?: number;
  /** Text reflow callback, only supported with js ellipsis. */
  onReflow?: (ellipsis: boolean, text: string) => void;
  /** Ellipsis click callback. */
  onEllipsisClick?: () => void;
}
export interface EllipsisProps extends JsEllipsisProps {
  /** Custom className of component. */
  className?: string;
}
