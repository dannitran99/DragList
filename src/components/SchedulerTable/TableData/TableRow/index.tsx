import { Box } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import dayjs from "dayjs";
import _ from "lodash";
import { useDrop } from "react-dnd";
import { addItem } from "../../../../app/actions/dragList";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { ItemTypes, TableConstants } from "../../../../constants/dragItem";
import { IDataList } from "../../../../types/listDrag";
import { convertPostoTime } from "../../../../utils/convertDate";
import { compareDay, compareHour } from "../../../../utils/selectDay";
import Scheduler from "./Scheduler";
import useStyles from "./styles";
import TableCell from "./TableCell";

interface IProps {
  isEvenRow: boolean;
  start: number;
  end: number;
  cellWidth: number;
  cellHeight: number;
  date: Date;
}

export default function TableRow({
  start,
  end,
  cellWidth,
  cellHeight,
  date,
  isEvenRow,
}: IProps) {
  const { cx, classes } = useStyles();
  const { ref, width, height } = useElementSize();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.listDrag);

  const cell = [];
  for (let index = start; index < end; index++) {
    cell.push(
      <TableCell
        key={index}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        isNow={compareHour(dayjs(date).hour(index).toString(), new Date())}
      />
    );
  }

  const [{ canDrop }, drop] = useDrop({
    accept: TableConstants.keydrag,
    drop(
      item: {
        id: string;
        left: number;
        width: number;
        update_at: string;
        end_at: string;
      },
      monitor
    ) {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
      };

      let newleft = Math.round(item.left + delta.x);
      const newStart = convertPostoTime(newleft, width, start, end, date);
      let newEnd;
      if (item.update_at) {
        newEnd = newStart.add(
          dayjs(item.end_at).diff(dayjs(item.update_at), "second"),
          "second"
        );
      } else {
        newEnd = newStart.add(30, "minute");
      }

      let newData: IDataList[] = _.cloneDeep(data);

      let index = newData.map((item: IDataList) => item.id).indexOf(item.id);
      if (item.update_at) {
        newData[index].update_at = newStart.toISOString();
        newData[index].end_at = newEnd.toISOString();
      } else {
        newData[index].status = ItemTypes.DONE;
        newData[index] = {
          ...newData[index],
          update_at: newStart.toISOString(),
          end_at: newEnd.toISOString(),
        };
      }

      dispatch(addItem(newData));
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Box
      ref={ref}
      className={cx(classes.container, { [classes.evenRow]: isEvenRow })}
      sx={() => ({
        height: cellHeight,
      })}
    >
      {cell}
      {canDrop && <Box ref={drop} className={classes.dropArea}></Box>}
      {data
        .filter((item: IDataList) => {
          return compareDay(item.update_at, date);
        })
        .filter((item: IDataList) => {
          return item.end_at;
        })
        .map((item: IDataList, idx: number) => (
          <Scheduler
            key={idx}
            data={item}
            parentWidth={width}
            parentHeight={height}
            start={start}
            end={end}
          />
        ))}
    </Box>
  );
}
