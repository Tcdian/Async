import _curry from './_curry';

interface Func {
  (...args: any[]): any;
};

function curry(func: Func, arity = func.length): any {
  const placeholder = curry.placeholder;
  return _curry(func, arity, [], placeholder);
}

curry.placeholder = '_';

export default curry;
