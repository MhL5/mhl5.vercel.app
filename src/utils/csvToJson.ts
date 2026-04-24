export function csvToJson(csv: string): Record<string, unknown>[] {
  if (!csv) return [];

  const lines = csv.split("\n");

  if (lines.length === 0) return [];

  const firstLine = lines[0];
  if (!firstLine) return [];

  const headers = firstLine.split(",");

  const data = lines.slice(1).reduce(
    (acc, line) => {
      // if line is empty, return the accumulator
      if (!line) return acc;

      const lineValues = line.split(",");

      const result = headers.reduce(
        (acc, header, index) => {
          const rawValue = lineValues[index];
          const value = rawValue || "";

          acc[header] = value === "" || Number.isNaN(+value) ? value : +value;
          return acc;
        },
        {} as Record<string, unknown>,
      );
      acc.push(result);
      return acc;
    },
    [] as Record<string, unknown>[],
  );

  return data;
}
