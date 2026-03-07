// String formatters
// ----------------------------------------------------------------
export const toCamelCase = (str: string) =>
  str.replace(/[-_ ]+(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));

export const toCapitalize = (str: string) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export const toKebabCase = (str: string) => str.replaceAll(" ", "-");

/** @example "userInformation" => "User Information" */
export const toSentenceCase = (str: string) =>
  str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

// Date formatters
// ----------------------------------------------------------------
export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat("en-US", {
    month: opts.month ?? "long",
    day: opts.day ?? "numeric",
    year: opts.year ?? "numeric",
    ...opts,
  }).format(new Date(date));
}

/**
 * format seconds
 * @example
 * formatSeconds(0.5) => 0.5s
 * formatSeconds(2) => 2s
 * formatSeconds(100) => 1m 40s
 * formatSeconds(8700) => 2h 25m
 * formatSeconds(28700) => 7h 58m 20s
 * formatSeconds(2318702) => 26d 20h 5m 2s
 */
export function formatSeconds(sec: number) {
  const days = Math.floor(sec / 86400);
  const remainingSecondsAfterDays = sec % 86400;

  const hours = Math.floor(remainingSecondsAfterDays / 3600);
  const remainingSecondsAfterHours = sec % 3600;

  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  const seconds = remainingSecondsAfterHours % 60;
  /**
   * @example
   * 2 sec left => 2
   * 0.7 sec left => 0.7
   */
  const formattedSeconds =
    seconds > 1 ? Math.round(seconds) : seconds.toFixed(1);

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${formattedSeconds}s`);

  return parts.join(" ");
}

// Number formatters
// ----------------------------------------------------------------
export function formatNumber(
  number: number | string,
  opts: Intl.NumberFormatOptions = {},
  locale: Intl.LocalesArgument = "en-US",
) {
  return new Intl.NumberFormat(locale, {
    style: opts.style ?? "decimal",
    notation: opts.notation ?? "standard",
    minimumFractionDigits: opts.minimumFractionDigits ?? 0,
    maximumFractionDigits: opts.maximumFractionDigits ?? 2,
    ...opts,
  }).format(Number(number));
}

// Currency formatters
// ----------------------------------------------------------------
export function formatPrice(
  price: number | string,
  opts: Intl.NumberFormatOptions = {},
  locale: Intl.LocalesArgument = "en-US",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: opts.currency ?? "USD",
    notation: opts.notation ?? "compact",
    ...opts,
  }).format(Number(price));
}
