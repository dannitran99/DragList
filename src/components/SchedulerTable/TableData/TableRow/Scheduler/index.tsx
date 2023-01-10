import { Box } from "@mantine/core";
import { useDrag } from "react-dnd";
import { TableConstants } from "../../../../../constants/dragItem";
import { IDataList } from "../../../../../types/listDrag";
import {
  checkToDisplaySchedule,
  convertDurationToPixel,
  convertTimeToPos,
} from "../../../../../utils/convertDate";
import { compareExact, compareHour } from "../../../../../utils/selectDay";
import useStyles from "./styles";

interface IProps {
  data: IDataList;
  parentWidth: number;
  parentHeight: number;
  start: number;
  end: number;
}
export default function Scheduler({
  data,
  parentWidth,
  parentHeight,
  start,
  end,
}: IProps) {
  const { cx, classes } = useStyles();
  const { id } = data;
  const { update_at, end_at, name } = data;
  const left = convertTimeToPos(data.update_at, parentWidth, start, end);
  const width = convertDurationToPixel(
    update_at,
    end_at,
    parentWidth,
    start,
    end
  );
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: TableConstants.keydrag,
      item: { id, left, width, update_at, end_at },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left]
  );

  if (!checkToDisplaySchedule(data.update_at, data.end_at, start, end))
    return <></>;
  if (isDragging) {
    return <Box ref={drag} />;
  }
  return (
    <Box
      ref={compareExact(update_at, new Date()) >= 0 ? drag : null}
      sx={() => ({
        left,
        width,
        height: parentHeight,
      })}
      className={cx(classes.scheduler, {
        [classes.disableDrag]: compareExact(update_at, new Date()) < 0,
      })}
    >
      {name}
    </Box>
  );
}
