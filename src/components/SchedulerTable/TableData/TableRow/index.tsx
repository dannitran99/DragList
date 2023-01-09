import { Box } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect } from "react";
import { useDrop } from "react-dnd";
import { listGetAll } from "../../../../app/actions/dragList";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { TableConstants } from "../../../../constants/dragItem";
import { IDataList } from "../../../../types/listDrag";
import Scheduler from "./Scheduler";
import useStyles from "./styles";
import TableCell from "./TableCell";

interface IProps {
  start: number;
  end: number;
  cellWidth: number;
}

export default function TableRow({ start, end, cellWidth }: IProps) {
  const { cx, classes } = useStyles();
  const { ref, width, height } = useElementSize();

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.listDrag);
  useEffect(() => {
    dispatch(listGetAll());
  }, [dispatch]);

  const cell = [];
  for (let index = start; index < end; index++) {
    cell.push(<TableCell key={index} cellWidth={cellWidth} />);
  }

  const [{ canDrop }, drop] = useDrop({
    accept: TableConstants.keydrag,
    drop(item: { id: string; left: number; width: number }, monitor) {
      console.log(item.left);

      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
      };

      let newleft = Math.round(item.left + delta.x);
      console.log(newleft);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Box ref={ref} className={classes.container}>
      {cell}
      {canDrop && <Box ref={drop} className={classes.dropArea}></Box>}
      {data
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
