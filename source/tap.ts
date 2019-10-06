interface VoidFunc {
  (...args: any[]): void;
}

function tap<T>(value: T, interceptor: VoidFunc): T {
  interceptor(value);
  return value;
}

export default tap;
