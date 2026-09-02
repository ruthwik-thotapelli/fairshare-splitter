export function formatDate(date) {
  if (date instanceof Date) {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return String(date);
}

export function dateValue(date) {
  if (date instanceof Date) return date.getTime();
  return date;
}
