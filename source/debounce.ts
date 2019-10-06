import now from './now';
import isObject from './isObject';

interface Func {
  (...args: any[]): any;
}

interface DebounceSettings {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

interface Cancelable {
  cancel(): void;
  flush(): void;
}

function debounce<T extends Func>(func: T, wait = 0, options?: DebounceSettings): T & Cancelable {
  let lastArgs: any[] | undefined;
  let lastThis: any;
  let maxWait: number | undefined;
  let result: any;
  let timerId: number | undefined;
  let lastCallTime: number | undefined;
  let lastInvokeTime: number | undefined = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  if (isObject(options)) {
    leading = 'leading' in options ? options.leading : leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(options.maxWait, wait) : maxWait;
    trailing = 'trailing' in options ? options.trailing : trailing;
  }

  function shouldInvoke(time: number): boolean {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (lastCallTime === void 0)
      || (timeSinceLastCall >= wait)
      || (timeSinceLastCall < 0)
      || (maxing && timeSinceLastInvoke >= maxWait);
  }

  function invokeFunc(time: number): any {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.call(thisArg, ...args);
    return result;
  }

  function trailingEdge(time: number): any {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }

  function remainingWait(time: number): number {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function timerExpired(): void {
    const time = now();
    if (shouldInvoke(time)) {
      trailingEdge(time);
      return;
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function leadingEdge(time: number): any {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  const debounced = function (this: any, ...args: any[]): any {
    const time = now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  } as T & Cancelable;

  function cancel(): void {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }

  function flush(): void {
    return timerId === void 0 ? result : trailingEdge(now());
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

export default debounce;
