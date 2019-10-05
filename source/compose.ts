import pipe from './pipe';
import reverse from './reverse';

interface Func {
  (...args: any[]): any;
};

function compose(...funcs: Func[]): Func {
  const reversedFuncs = reverse(funcs);
  return pipe(...reversedFuncs);
}

export default compose;
