// a throttle function using window.requestAnimationFrame
export function frameThrottle(fn: Function) {
  let lock = false;
  return function() {
    // @ts-ignore
    const context = this;
    const args = arguments;
    if (lock) {
      return;
    }
    lock = true;
    fn.apply(context, args);
    window.requestAnimationFrame(() => {
      lock = false;
    });
  };
}

// normal throttle function
export function throttle(fn: Function, threshold = 60) {
  let last: number;
  let timer: NodeJS.Timeout;

  return function() {
    // @ts-ignore
    const context = this;
    const args = arguments;
    const now = +new Date();
    if (last && now < last + threshold) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
