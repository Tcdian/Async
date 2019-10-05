import isNull from './isNull';

function isObject(value: any): value is object {
  const type = typeof value;
  return type === 'function' || type === 'object' && !isNull(value);
}

export default isObject;
