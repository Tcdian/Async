interface BooleanFunc {
  (...args: any[]): any;
};

function negate(func: BooleanFunc): BooleanFunc {
  return function(this: any, ...args: any[]): boolean {
    return !func.call(this, ...args);
  }
}

export default negate;
