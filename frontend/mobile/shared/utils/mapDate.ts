export function mapDate(value?: Date | string | null) {
  return value ? new Date(value) : undefined;
}