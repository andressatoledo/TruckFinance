

export function convertUndefinedToNull(obj: any): any {
  // undefined → null
  if (obj === undefined) return null;

  // Date válida → mantém
  if (obj instanceof Date) {
    return isNaN(obj.getTime()) ? null : obj;
  }

  // Array → sanitiza cada item
  if (Array.isArray(obj)) {
    return obj.map(convertUndefinedToNull);
  }

  // Object
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        convertUndefinedToNull(value),
      ])
    );
  }

  // 🔥 STRING (aqui está o ouro)
  if (typeof obj === "string") {
    const trimmed = obj.trim();

    // string vazia → null
    if (!trimmed) return null;

    return trimmed;
  }

  // número, boolean, etc
  return obj;
}