export interface NativeEllipsisProps {
  /** Whether ellipsis content, default true. */
  ellipsis: boolean;
  /** Pure text that you want to ellipsis. */
  text: string;
  /** Max count of visible lines. */
  maxLine: number;
}
export interface JsEllipsisProps {
  /** Pure text that you want to ellipsis. */
  text: string;
  /** Max count of visible lines. */
  maxLine?: number;
  /** Max visible height of container. */
  maxHeight?: number;
  /** Text content of ellipsis, default '...'. */
  ellipsisChar?: string;
  /**
   * Customize the ellipsis style with html.
   * (Warning: make sure the html is safe).
   **/
  dangerousEllipsisHtml?: string;
  /** The chars that will be removed before ellipsis. */
  endExcludes?: string[];
  /** Whether update when container resize, default false. */
  reflowOnResize?: boolean;
  /** The threshold of reflow throttle on resize, default 60. */
  reflowThresholdOnResize?: number;
  /** Text reflow callback, only supported with js ellipsis. */
  onReflow?: (ellipsis: boolean, text: string) => void;
}
export interface EllipsisProps extends JsEllipsisProps {
  /** Custom className of component. */
  className?: string;
  /** Whether ellipsis content, default true. */
  ellipsis: boolean;
}
