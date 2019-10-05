import identity from './identity';

interface Func {
  (...args: any[]): any;
}

interface MapCache {
  cache: Map<any, any>;
}

function memoize<T extends Func>(func: T, resolver: Func = identity): T & MapCache {
  const memoized = function (this: any, ...args: any[]): any {
    const key = resolver.call(this, ...args);
    const { cache } = memoized;
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.call(this, ...args);
    cache.set(key, result);
    return result;
  } as T & MapCache;

  memoized.cache = new Map();
  return memoized;
}

export default memoize;
