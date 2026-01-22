export function capitalize(str: string): string {
  if (!str) { // Trata strings vazias ou null/undefined
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}