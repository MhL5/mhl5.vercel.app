import { discordLog } from "@/features/discord-logs/discordLogs";

/**
 * Formats a date string to the format "12 شهریور 1394" using Intl.DateTimeFormat.
 *
 * @example
 * const formattedDate = formatDate("2023-10-05"); // returns "13 مهر 1402"
 */
export function formatDate(date: string) {
  try {
    const d = new Date(date);
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatter.format(d);
  } catch (error) {
    discordLog({
      title: "formatDate",
      description: `\n
      formatDate util failed to format ${date}.
      \n \`${error}\`
      \n \`\`\`ts\n${JSON.stringify(error, null, 2)}\`\`\` 
      \n
      `,
      variant: "error",
    });
    return date;
  }
}

/**
 * Converts a duration in seconds to a string formatted as "H:MM:SS" or "D day HH:MM:SS".
 * If the duration is less than an hour, it returns "MM:SS".
 * If the duration is more than a day, it prepends the number of days.
 *
 * @param {number} seconds - The duration in seconds.
 * @returns {string} The formatted time string.
 *
 * @example
 * formatSecondsToHMS(59);      // "00:59"
 * formatSecondsToHMS(80);    // "01:20"
 * formatSecondsToHMS(60 * 65);   // "01:05:00"
 * formatSecondsToHMS(60 * 60 * 28);  // "1d 04:00:00"
 */
export function formatSecondsToHMS(
  seconds: number,
  options: {
    labels?: {
      day?: string;
    };
  } = {
    labels: {
      day: "روز",
    },
  },
): string {
  const labels = options.labels;

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600); // Ensure hours stay within 0-23
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const hoursString = `${hours.toString().padStart(2, "0")}:`;
  const minutesString = `${minutes.toString().padStart(2, "0")}`;

  const formattedTime = `${hoursString === "00:" ? "" : hoursString}${minutesString}:${remainingSeconds.toString().padStart(2, "0")}`;

  return days > 0 ? `${days}${labels?.day} ${formattedTime}` : formattedTime;
}

/**
 * formats a date into YYYY-MM-DD
 */
export function formatDateYMD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // YYYY-MM-DD format
}

export function getSecondsLeft({
  startedAt,
  durationInSecond,
}: {
  startedAt: number;
  durationInSecond: number;
}) {
  const now = Date.now();
  const elapsedSeconds = Math.floor((now - startedAt) / 1000);
  return Math.max(durationInSecond - elapsedSeconds, 0); // Ensure it doesn't go negative
}
