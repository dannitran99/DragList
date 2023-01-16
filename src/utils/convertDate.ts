import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import isoWeek from "dayjs/plugin/isoWeek";
import { compareDay, compareHour } from "./selectDay";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isoWeek);

export function convertDurationToPixel(
  start: string | Date | undefined,
  end: string | Date | undefined,
  rowWidth: number,
  durationStart: number,
  durationEnd: number,
  dateCompare: Date
) {
  const duration = durationEnd - durationStart;
  const oneHourWidth = rowWidth / duration;
  const oneMinWidth = oneHourWidth / 60;
  const oneSecWidth = oneMinWidth / 60;
  let width = dayjs(end).diff(dayjs(start), "second") * oneSecWidth;
  const subAtStart =
    dayjs(start).diff(
      dayjs(start).hour(durationStart).minute(0).second(0),
      "second"
    ) * oneSecWidth;
  const subAtEnd =
    dayjs(end)
      .hour(durationEnd)
      .minute(0)
      .second(0)
      .diff(dayjs(end), "second") * oneSecWidth;
  if (subAtStart < 0 && !compareDay(start, dateCompare)) width += subAtStart;
  if (subAtEnd < 0 && !compareDay(end, dateCompare)) width += subAtEnd;
  if (compareDay(start, dateCompare) !== 0) {
    width +=
      dayjs(start).diff(
        dayjs(dateCompare).hour(0).minute(0).second(0),
        "second"
      ) * oneSecWidth;

    width -= durationStart * oneHourWidth;
  }
  if (compareDay(end, dateCompare) !== 0) {
    width +=
      dayjs(dateCompare)
        .hour(0)
        .minute(0)
        .second(0)
        .add(1, "day")
        .diff(dayjs(end), "second") * oneSecWidth;
    width -= (24 - durationEnd) * oneHourWidth;
  }
  return width;
}

export function checkToDisplaySchedule(
  start: string | Date | undefined,
  end: string | Date | undefined,
  durationStart: number,
  durationEnd: number,
  dateCompare: Date
) {
  const compareDayStart = dayjs(dateCompare)
    .hour(durationStart)
    .minute(0)
    .second(0)
    .toDate();
  const compareDayEnd = dayjs(dateCompare)
    .hour(durationEnd)
    .minute(0)
    .second(0)
    .toDate();
  let check = false;
  if (
    (compareHour(dayjs(start).toDate(), compareDayStart) >= 0 &&
      compareHour(dayjs(start).toDate(), compareDayEnd) < 0) ||
    (compareHour(dayjs(end).toDate(), compareDayStart) >= 0 &&
      compareHour(dayjs(end).toDate(), compareDayEnd) < 0) ||
    (compareHour(dayjs(start).toDate(), compareDayStart) < 0 &&
      compareHour(dayjs(end).toDate(), compareDayEnd) >= 0)
  ) {
    check = true;
  }
  return check;
}

export function convertTimeToPos(
  date: string | Date | undefined,
  rowWidth: number,
  durationStart: number,
  durationEnd: number,
  dateCompare?: string | Date | undefined
) {
  if (dateCompare && compareDay(date, dateCompare) !== 0) return 0;
  if (dayjs(date).hour() < durationStart) return 0;
  const duration = durationEnd - durationStart;
  const oneHourWidth = rowWidth / duration;
  const oneMinWidth = oneHourWidth / 60;
  const oneSecWidth = oneMinWidth / 60;
  const pos =
    (dayjs(date).hour() - durationStart) * oneHourWidth +
    dayjs(date).minute() * oneMinWidth +
    dayjs(date).second() * oneSecWidth;
  return pos;
}

export function convertPostoTime(
  pos: number,
  rowWidth: number,
  durationStart: number,
  durationEnd: number,
  day?: Date
) {
  const duration = durationEnd - durationStart;
  const oneHourWidth = rowWidth / duration;
  const oneMinWidth = oneHourWidth / 60;
  const oneSecWidth = oneMinWidth / 60;

  const hour =
    pos > 0
      ? Math.floor(pos / oneHourWidth) + durationStart
      : Math.ceil(pos / oneHourWidth) + durationStart;
  const minute =
    pos > 0
      ? Math.floor((pos % oneHourWidth) / oneMinWidth)
      : Math.ceil((pos % oneHourWidth) / oneMinWidth);
  const second =
    pos > 0
      ? Math.floor(((pos % oneHourWidth) % oneMinWidth) / oneSecWidth)
      : Math.ceil(((pos % oneHourWidth) % oneMinWidth) / oneSecWidth);
  return dayjs(day).hour(hour).minute(minute).second(second);
}
