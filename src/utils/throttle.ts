export default function(fn: Function, threshold = 60) {
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
