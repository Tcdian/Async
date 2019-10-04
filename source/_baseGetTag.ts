export enum _TYPE_TAG {
  arrayTag = '[object Array]',
  asyncFunctionTag = '[object AsyncFunction]',
  booleanTagTag = '[object Boolean]',
  dateTag = '[object Date]',
  errorTag = '[object Error]',
  functionTag = '[object Function]',
  generatorFunctionTag = '[object GeneratorFunction]',
  mapTag = '[object Map]',
  nullTag = '[object Null]',
  numberTag = '[object Number]',
  objectTag = '[object Object]',
  proxyTagTag = '[object Proxy]',
  regExpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]',
  undefinedTag = '[object Undefined]'
}

function _baseGetTag(value: any): string {
  return Object.prototype.toString.call(value);
}

export default _baseGetTag;
