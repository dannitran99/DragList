import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isoWeek);

export function convertDurationToPixel(
  start: string | Date | undefined,
  end: string | Date | undefined,
  rowWidth: number,
  durationStart: number,
  durationEnd: number
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
  return width;
}

export function checkToDisplaySchedule(
  start: string | Date | undefined,
  end: string | Date | undefined,
  durationStart: number,
  durationEnd: number
) {
  let check = false;
  if (
    (dayjs(start).hour() >= durationStart &&
      dayjs(start).hour() < durationEnd) ||
    (dayjs(end).hour() >= durationStart && dayjs(end).hour() < durationEnd) ||
    (dayjs(start).hour() < durationStart && dayjs(end).hour() >= durationEnd)
  )
    check = true;
  return check;
}

export function convertTimeToPos(
  date: string | Date | undefined,
  rowWidth: number,
  durationStart: number,
  durationEnd: number
) {
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
  if (pos < 0) return dayjs(day).hour(durationStart).minute(0).second(0);

  const duration = durationEnd - durationStart;
  const oneHourWidth = rowWidth / duration;
  const oneMinWidth = oneHourWidth / 60;
  const oneSecWidth = oneMinWidth / 60;

  const hour = Math.floor(pos / oneHourWidth) + durationStart;
  const minute = Math.floor((pos % oneHourWidth) / oneMinWidth);
  const second = Math.floor(((pos % oneHourWidth) % oneMinWidth) / oneSecWidth);
  return dayjs(day).hour(hour).minute(minute).second(second);
}
