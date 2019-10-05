interface BooleanFunc {
  (...args: any[]): boolean;
}

function negate(func: BooleanFunc): BooleanFunc {
  return function(this: any, ...args: any[]): boolean {
    return !func.call(this, ...args);
  }
}

export default negate;
