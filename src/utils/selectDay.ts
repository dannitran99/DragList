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
  return dayjs(date1)
    .hour(0)
    .minute(0)
    .second(0)
    .diff(dayjs(date2).hour(0).minute(0).second(0), "hour");
}

export function compareHour(
  date1: string | Date | undefined,
  date2: string | Date | undefined
) {
  return dayjs(date1)
    .minute(0)
    .second(0)
    .diff(dayjs(date2).minute(0).second(0), "minute");
}

export function compareExact(
  date1: string | Date | undefined,
  date2: string | Date | undefined
) {
  return dayjs(date1).diff(dayjs(date2), "second");
}

export function checkDayInDuration(
  dayCheck: string | Date | undefined,
  start: string | Date | undefined,
  end: string | Date | undefined
) {
  return compareDay(dayCheck, start) >= 0 && compareDay(dayCheck, end) <= 0;
}
export function checkDayBetween(
  dayCheck: string | Date | undefined,
  start: string | Date | undefined,
  end: string | Date | undefined
) {
  return compareDay(dayCheck, start) > 0 && compareDay(dayCheck, end) < 0;
}
