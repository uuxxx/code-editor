export function randomId(): string {
  return Date.now().toString();
}

export function stringified(value: any) {
  return JSON.stringify(value);
}

export function isKeyOf<T extends Object>(
  key: string | number | symbol,
  obj: T,
): asserts key is keyof typeof obj {
  if (!obj.hasOwnProperty(key)) {
    throw new Error();
  }
}
