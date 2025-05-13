export function getWeekKey(dateStr) {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const oneJan = new Date(Date.UTC(year, 0, 1));
  const week = Math.ceil((((date - oneJan) / 86400000) + oneJan.getUTCDay() + 1) / 7);
  return `${year}-W${week.toString().padStart(2, '0')}`;
}