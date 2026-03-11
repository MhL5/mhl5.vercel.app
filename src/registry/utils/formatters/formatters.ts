// String formatters
// ----------------------------------------------------------------
export function toCamelCase(str: string) {
  return str.replace(/[-_ ]+(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

export function toCapitalize(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function toKebabCase(str: string) {
  return str.replaceAll(" ", "-");
}

/** @example "userInformation" => "User Information" */
export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

/**
 * Truncates the string from the middle if it exceeds the specified requiredLength.
 * If the length is exceeded, the string will be truncated from both the start and the middle.
 * by default The truncation point for each part will be at the halfway mark of the requiredLength.
 *
 * @example
 * truncateMiddle("M3GAN.2.0.2025.720p.WEBRip.x264.AAC.YTS.SoftSub.Sermovie.mkv") =>  "M3GAN.2.0.2025.720p....SoftSub.Sermovie.mkv"
 */
export function truncateMiddle(
  str: string,
  {
    requiredLength = 40,
    startTruncationLength,
    endTruncationLength,
  }: {
    requiredLength?: number;
    startTruncationLength?: number;
    endTruncationLength?: number;
  } = {},
) {
  const halfRequiredLength = Math.round(requiredLength / 2);

  return str.length > requiredLength
    ? `${str.slice(0, startTruncationLength || halfRequiredLength)}...${str.slice(endTruncationLength || str.length - halfRequiredLength)}`
    : str;
}

// Date and time formatters
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

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
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
