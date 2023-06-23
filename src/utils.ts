export function randomId(): string {
  return Date.now().toString();
}

export function stringified(value: any) {
  return JSON.stringify(value);
}
