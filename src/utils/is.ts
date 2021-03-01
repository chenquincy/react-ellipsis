export const isArray = Array.isArray;

export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
/** Whether the environment support -webkit-line-clamp. */
export const isSupportNativeEllipsis =
  isBrowser && document.body.style.webkitLineClamp !== 'undefined';

export const isExistentAndEqualTo = (value: any, target: any) => {
  return value && value === target;
};
/** Whether the environment support window.requestAnimationFrame. */
export const isSupportRequestAnimationFrame =
  isBrowser && window.requestAnimationFrame !== undefined;

/** Whether the variable effective. */
export const isEffective = (variable: any): boolean =>
  variable !== undefined && variable !== null;
