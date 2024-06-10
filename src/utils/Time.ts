export function timeToDate(date: Date) {
  return date.toISOString().substr(0, 10);
}
export function timeToHours(date: Date) {
  return date.toISOString().substr(11, 5);
}
