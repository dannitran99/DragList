import dayjs from "dayjs";

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
  const width = dayjs(end).diff(dayjs(start), "second") * oneSecWidth;
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

// export function convertPostoTime(
//   start: number,
//   scheduleWidth: number,
//   rowWidth: number
// ) {
//   const startTime = start > 0 ? start : 0;
//   const oneHourWidth = rowWidth / 24;
//   const oneMinWidth = oneHourWidth / 60;
//   const oneSecWidth = oneMinWidth / 60;
//   // const time =
//   // return time;
// }
