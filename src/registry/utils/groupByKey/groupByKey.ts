// biome-ignore lint/suspicious/noExplicitAny: we need to use any to allow for any grouped values
export function groupByKey<T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const groupKey = String(item[key]); // Ensure the key is a string
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}
