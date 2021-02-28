export const isArray = Array.isArray;

export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
/** Whether the environment support -webkit-line-clamp. */
export const isSupportNativeEllipsis =
  isBrowser && document.body.style.webkitLineClamp !== 'undefined';

export const isExistentAndEqualTo = (value: any, target: any) => {
  return value && value === target;
};
export const isSupportRequestAnimationFrame: boolean =
  window && window.requestAnimationFrame !== undefined;
