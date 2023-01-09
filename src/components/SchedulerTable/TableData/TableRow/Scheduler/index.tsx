import { Box } from "@mantine/core";
import { useDrag } from "react-dnd";
import { TableConstants } from "../../../../../constants/dragItem";
import { IDataList } from "../../../../../types/listDrag";
import {
  checkToDisplaySchedule,
  convertDurationToPixel,
  convertTimeToPos,
} from "../../../../../utils/convertDate";
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
  const { classes } = useStyles();
  const { id } = data;

  const left = convertTimeToPos(data.update_at, parentWidth, start, end);
  const width = convertDurationToPixel(
    data.update_at,
    data.end_at,
    parentWidth,
    start,
    end
  );

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: TableConstants.keydrag,
      item: { id, left, width },
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
      ref={drag}
      sx={() => ({
        left,
        width,
        height: parentHeight,
      })}
      className={classes.scheduler}
    >
      {data.name}
    </Box>
  );
}
