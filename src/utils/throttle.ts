// eslint-disable-next-line @typescript-eslint/ban-types
export default function throttle<F extends Function>(func: F, timeFrame: number): F {
  let lastTime = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}
