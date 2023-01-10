import dayjs from "dayjs";

export function selectWeek(date: Date) {
  return Array(7)
    .fill(new Date(date))
    .map(
      (el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx + 1))
    );
}

export function compareDay(
  date1: string | Date | undefined,
  date2: string | Date | undefined
) {
  return (
    dayjs(date1)
      .hour(0)
      .minute(0)
      .second(0)
      .diff(dayjs(date2).hour(0).minute(0).second(0), "hour") === 0
  );
}

export function compareHour(
  date1: string | Date | undefined,
  date2: string | Date | undefined
) {
  return (
    dayjs(date1)
      .minute(0)
      .second(0)
      .diff(dayjs(date2).minute(0).second(0), "minute") === 0
  );
}
