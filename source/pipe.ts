interface Func {
  (...args: any[]): any;
};

function pipe(...funcs: Func[]): Func {
  const firstFunc = funcs[0];
  const resFuncs = funcs.slice(1);
  return function(this: any, ...args: any[]): any {
    return resFuncs.reduce((prev, func) => {
      return func.call(this, prev);
    }, firstFunc.call(this, ...args));
  }
}

export default pipe;
