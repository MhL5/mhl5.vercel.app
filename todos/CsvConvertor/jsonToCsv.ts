// from sad man code

/**
 * Converts an array of objects to CSV format
 *
 * @example
 * const data = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
 * const csv = JsonToCsv({ data });
 * // Returns: "name,age\r\n"John",30\r\n"Jane",25"
 */
export function jsonToCsv<T extends Record<string, unknown>>({
  data,
}: {
  data: T[];
}): string {
  if (!Array.isArray(data) || data.length === 0)
    return "Data must be a non-empty array";

  // Get all unique headers from all objects
  const headers = Array.from(
    new Set(
      data.reduce<string[]>((acc, obj) => {
        return [...acc, ...Object.keys(obj)];
      }, []),
    ),
  );

  // Generate CSV content
  const csv = [
    headers.join(","), // header row
    ...data.map((row) =>
      headers
        .map((fieldName) =>
          JSON.stringify(
            row[fieldName as keyof T] ?? "",
            // Handle null/undefined values and ensure proper escaping
            (key: string, value: unknown) =>
              value === null || value === undefined ? "" : value,
          ).replaceAll(",", "،"),
        )
        .join(","),
    ),
  ].join("\r\n");

  return csv;
}

// from sad man code
export function exportTableToCSV<TData>(
  /**
   * The table to export.
   * @type Table<TData>
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any, // Table<TData>
  opts: {
    /**
     * The filename for the CSV file.
     * @default "table"
     * @example "tasks"
     */
    filename?: string;
    /**
     * The columns to exclude from the CSV file.
     * @default []
     * @example ["select", "actions"]
     */
    excludeColumns?: (keyof TData | "select" | "actions")[];
  } = {},
): void {
  const { filename = "table", excludeColumns = [] } = opts;

  // Retrieve headers (column names)
  const headers = table
    .getAllLeafColumns()
    .map((column) => column.id)
    .filter((id) => !excludeColumns.includes(id));

  // Build CSV content
  const csvContent = [
    headers.join(","),
    ...table.getRowModel().rows.map((row) =>
      headers
        .map((header) => {
          const cellValue = row.getValue(header);
          // Handle values that might contain commas or newlines
          return typeof cellValue === "string"
            ? `"${cellValue.replace(/"/g, '""')}"`
            : cellValue;
        })
        .join(","),
    ),
  ].join("\n");

  // Create a Blob with CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a link and trigger the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
