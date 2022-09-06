function getFirstDayOfWeek(d) {
  // 👇️ clone date object, so we don't mutate it
  const date = new Date(d);
  const day = date.getDay(); // 👉️ get day of week

  // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);

  return new Date(date.setDate(diff));
}

export function firstAndLastDateOfWeek() {
  const today = new Date();
  const firstDay = getFirstDayOfWeek(today);

  const lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);

  return [firstDay, lastDay];
}
