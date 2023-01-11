import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import isoWeek from "dayjs/plugin/isoWeek";
import { compareDay } from "./selectDay";

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
  if (subAtStart < 0) width += subAtStart;
  if (subAtEnd < 0) width += subAtEnd;
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
  let check = false;
  if (
    (dayjs(start).hour() >= durationStart &&
      dayjs(start).hour() < durationEnd) ||
    (dayjs(end).hour() >= durationStart && dayjs(end).hour() < durationEnd) ||
    (dayjs(start).hour() < durationStart && dayjs(end).hour() >= durationEnd)
  ) {
    check = true;
  }
  if (
    (compareDay(start, dateCompare) !== 0 &&
      dayjs(end).hour() < durationStart) ||
    (compareDay(end, dateCompare) !== 0 && dayjs(start).hour() >= durationEnd)
  ) {
    check = false;
  }
  if (
    (compareDay(start, end) !== 0 &&
      dayjs(start).hour() < durationEnd &&
      compareDay(end, dateCompare) !== 0) ||
    (compareDay(start, end) !== 0 &&
      dayjs(end).hour() >= durationStart &&
      compareDay(start, dateCompare) !== 0)
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
