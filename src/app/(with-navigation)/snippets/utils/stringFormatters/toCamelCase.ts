export function toCamelCase(str: string): string {
  return str.replace(/[-_ ]+(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}
