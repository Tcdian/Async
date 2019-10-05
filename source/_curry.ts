import _replacePlaceholders from './_replacePlaceholders';
import _executeBound from './_executeBound';

interface Func {
  (...args: any[]): any;
};

function _curry(func: Func, arity: number, partials: any[], placeholder: any): any {
  function boundFunc(this: any, ...args: any[]): any {
    const argsLen = args.filter((arg) => arg !== placeholder).length;
    const finalArgs = _replacePlaceholders(partials, args, placeholder);
    if (argsLen >= arity) {
      return _executeBound(func, boundFunc, this, this, finalArgs);
    }
    return _curry(func, arity - argsLen, finalArgs, placeholder);
  }
  return boundFunc;
}

export default _curry;
