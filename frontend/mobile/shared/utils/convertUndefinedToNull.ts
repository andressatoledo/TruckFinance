export function convertUndefinedToNull(obj: any): any {
  if (obj === undefined) return null;

  // ⭐ NÃO mexer em Date
  if (obj instanceof Date) return obj;

  if (Array.isArray(obj)) {
    return obj.map(convertUndefinedToNull);
  }

  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        convertUndefinedToNull(value),
      ])
    );
  }

  return obj;
}