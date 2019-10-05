import isObject from './isObject';

interface Func {
  (...args: any[]): any;
}

function _executeBound(sourceFunc: Func, boundFunc: Func, context: any, callingContext: any, args: any[]) {
  if (!Object.prototype.isPrototypeOf.call(boundFunc, callingContext)) {
    return sourceFunc.call(context, ...args);
  }
  const instance = Object.create(sourceFunc.prototype);
  const result = sourceFunc.call(instance, ...args);
  if (isObject(result)) {
    return result;
  }
  return instance;
}

export default _executeBound;
