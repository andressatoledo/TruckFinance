export function convertUndefinedToNull(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === undefined ? null : value,
    ])
  );
}