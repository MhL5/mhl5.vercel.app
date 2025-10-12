export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formatter.format(date);
}
