import pipe from './pipe';
import reverse from './reverse';

interface Func {
  (...args: any[]): any;
};

function compose(...funcs: Func[]): Func {
  const reverseFuncs = reverse(funcs);
  return pipe(...reverseFuncs);
}

export default compose;
