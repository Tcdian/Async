import _baseGetTag, { _TYPE_TAG } from './_baseGetTag';

interface Func {
  (...args: any[]): any;
}

function isFunction(value: any): value is Func {
  const tag = _baseGetTag(value);
  return tag === _TYPE_TAG.functionTag 
    || tag === _TYPE_TAG.asyncFunctionTag
    || tag === _TYPE_TAG.generatorFunctionTag
    || tag === _TYPE_TAG.proxyTagTag;
}

export default isFunction;
