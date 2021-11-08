export const isArray = Array.isArray;

/** Whether the variable effective. */
export const isEffective = (variable: any): boolean =>
  typeof variable !== 'undefined' && variable !== null;

export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/** Whether the environment support -webkit-line-clamp. */
export const isSupportNativeEllipsis =
  isBrowser && typeof document.body.style.webkitLineClamp !== 'undefined';

/** Whether the environment support window.requestAnimationFrame. */
export const isSupportRequestAnimationFrame =
  isBrowser && typeof window.requestAnimationFrame !== 'undefined';
