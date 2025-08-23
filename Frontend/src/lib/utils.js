export function formatDate(dateString, locale = "en-TN") {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(date);
}