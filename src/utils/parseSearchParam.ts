/**
 * receive a searchParam and parses it into a number
 * If the parameter is not a valid integer, returns 1.
 */
function parseNumberSearchParam({
  fallback = 1,
  searchParam,
}: {
  searchParam: string | null | undefined | string[];
  fallback: number;
}) {
  const parsedNumber = +(searchParam || fallback);

  if (Number.isNaN(parsedNumber) || !Number.isFinite(parsedNumber))
    return fallback;
  return Math.max(fallback, Math.floor(parsedNumber));
}

export { parseNumberSearchParam };
