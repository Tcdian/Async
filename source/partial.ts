import _replacePlaceholders from './_replacePlaceholders';
import _executeBound from './_executeBound';

interface Func {
  (...args: any[]): any;
};

function partial(func: Func, ...partials: any[]): Func {
  const placeholder = partial.placeholder;
  function boundFunc(this: any, ...args: any[]): any {
    const finalArgs = _replacePlaceholders(partials, args, placeholder);
    return _executeBound(func, boundFunc, this, this, finalArgs);
  }
  return boundFunc;
}

partial.placeholder = '_';

export default partial;
