function reverse<T extends any[]>(array: T): T {
  return [...array].reverse() as T;
}

export default reverse;
