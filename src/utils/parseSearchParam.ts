/**
 * Receives a searchParam and parses it into a number.
 * Returns null if the parameter is not a valid integer.
 */
function parseNumberSearchParam(
  searchParam: string | null | undefined | string[],
): number | null {
  const value = Array.isArray(searchParam) ? searchParam[0] : searchParam;

  if (value == null) return null;

  const trimmed = value.trim();

  if (trimmed === "") return null; // IMPORTANT FIX

  const parsedNumber = Number(trimmed);

  if (!Number.isFinite(parsedNumber)) return null;
  if (Number.isNaN(parsedNumber)) return null;
  if (parsedNumber < 0) return null;

  return Math.floor(parsedNumber);
}

export { parseNumberSearchParam };
