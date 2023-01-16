import { Box, Divider } from "@mantine/core";
import { useDisclosure, useElementSize } from "@mantine/hooks";
import dayjs from "dayjs";
import _ from "lodash";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { addItem } from "../../../../app/actions/dragList";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { ItemTypes, TableConstants } from "../../../../constants/dragItem";
import { IDataList } from "../../../../types/listDrag";
import {
  checkToDisplaySchedule,
  convertPostoTime,
  convertTimeToPos,
} from "../../../../utils/convertDate";
import {
  checkDayInDuration,
  compareDay,
  compareExact,
  compareHour,
} from "../../../../utils/selectDay";
import AddModal from "../../../AddModal";
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
  handleDelete?(id: string, handlers: () => void): void;
  openModalEdit?(id: string): void;
  mousePos(): number;
}

export default function TableRow({
  start,
  end,
  cellWidth,
  cellHeight,
  date,
  isEvenRow,
  mousePos,
  handleDelete,
  openModalEdit,
}: IProps) {
  const { cx, classes } = useStyles();
  const { ref, width } = useElementSize();
  const [openedModal, handlersModal] = useDisclosure(false);
  const [isCreateItem, setIsCreateItem] = useState<boolean>(false);
  const [isItemValid, setIsItemValid] = useState<boolean>(false);
  const [isDragReverse, setIsDragReverse] = useState<boolean>(false);
  const [posItemPreview, setPosItemPreview] = useState<number>(0);
  const [posEnd, setPosEnd] = useState<number>(0);
  const [widthItemPreview, setWidthItemPreview] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.listDrag);

  const cell = [];
  for (let index = start; index < end; index++) {
    cell.push(
      <TableCell
        key={index}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        isNow={
          compareHour(dayjs(date).hour(index).toString(), new Date()) === 0
        }
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
      const newStart = convertPostoTime(
        newleft ? newleft : 0,
        width,
        start,
        end,
        date
      );
      let newEnd = item.update_at
        ? newStart.add(
            dayjs(item.end_at).diff(dayjs(item.update_at), "second"),
            "second"
          )
        : newStart.add(30, "minute");
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

  const handleMouseDown = () => {
    setIsItemValid(
      compareExact(
        convertPostoTime(mousePos() + 3, width, start, end, date).toDate(),
        new Date()
      ) > 0
    );
    setIsCreateItem(true);
    setPosItemPreview(mousePos() + 3);
    setWidthItemPreview(0);
  };

  const handleMouseMove = () => {
    if (isCreateItem) {
      setWidthItemPreview(Math.abs(mousePos() - posItemPreview + 3));
      if (mousePos() - posItemPreview > 0) {
        setIsDragReverse(false);
      } else {
        setIsItemValid(
          compareExact(
            convertPostoTime(
              posItemPreview - widthItemPreview,
              width,
              start,
              end,
              date
            ).toDate(),
            new Date()
          ) > 0
        );
        setIsDragReverse(true);
      }
    }
  };

  const handleMouseUp = () => {
    setPosEnd(mousePos() + 3);
    if (isItemValid) {
      handlersModal.open();
    } else {
      setIsItemValid(false);
      setIsCreateItem(false);
    }
  };

  const onModalClose = () => {
    setIsItemValid(false);
    setIsCreateItem(false);
    handlersModal.close();
  };

  return (
    <Box
      ref={ref}
      className={cx(classes.container, {
        [classes.evenRow]: isEvenRow,
        [classes.stripes]: compareDay(date, new Date()) < 0,
      })}
      sx={() => ({
        height: cellHeight,
      })}
    >
      <Box
        className={classes.containerRow}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {cell}
        {isCreateItem && (
          <Box
            className={cx(classes.itemCreatePreview, {
              [classes.invalidItem]: !isItemValid,
            })}
            sx={{
              width: widthItemPreview,
              left: isDragReverse
                ? posItemPreview - widthItemPreview
                : posItemPreview,
            }}
          >
            <Divider size={10} color={isItemValid ? "violet" : "black"} />
          </Box>
        )}
      </Box>
      {canDrop && compareDay(date, new Date()) >= 0 && (
        <Box
          ref={drop}
          className={classes.dropArea}
          sx={() => ({
            left:
              compareDay(date, new Date()) === 0
                ? convertTimeToPos(new Date(), width, start, end)
                : 0,
          })}
        ></Box>
      )}
      {data
        .filter((item: IDataList) => {
          return (
            checkDayInDuration(date, item.update_at, item.end_at) &&
            item.end_at &&
            checkToDisplaySchedule(
              item.update_at,
              item.end_at,
              start,
              end,
              date
            )
          );
        })
        .map((item: IDataList, idx: number) => (
          <Scheduler
            key={idx}
            data={item}
            parentWidth={width}
            start={start}
            end={end}
            openModalEdit={openModalEdit}
            handleDelete={handleDelete}
            date={date}
            mousePos={mousePos()}
          />
        ))}
      <AddModal
        isOpened={openedModal}
        setOpened={onModalClose}
        updateAt={
          posItemPreview
            ? isDragReverse
              ? convertPostoTime(posEnd, width, start, end, date).toISOString()
              : convertPostoTime(
                  posItemPreview,
                  width,
                  start,
                  end,
                  date
                ).toISOString()
            : undefined
        }
        endAt={
          posEnd
            ? isDragReverse
              ? convertPostoTime(
                  posItemPreview,
                  width,
                  start,
                  end,
                  date
                ).toISOString()
              : convertPostoTime(posEnd, width, start, end, date).toISOString()
            : undefined
        }
      />
    </Box>
  );
}
