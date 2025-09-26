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
