import { Box, ScrollArea, Text } from "@mantine/core";
import TableRow from "./TableRow";
import useStyles from "./styles";
import { useElementSize, useMouse } from "@mantine/hooks";
import { convertPostoTime } from "../../../utils/convertDate";
import { useState } from "react";

interface IProps {
  start: number;
  end: number;
  cellWidth: number;
  cellHeight: number;
  dateRange: Date[];
  isHovered: boolean;
}

export default function TableData({
  start,
  end,
  cellWidth,
  cellHeight,
  dateRange,
  isHovered,
}: IProps) {
  const { classes } = useStyles();
  const { ref, x } = useMouse();
  const eTableSize = useElementSize();
  const [scrollPosition, onScrollPositionChange] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const time = [];

  for (let index = start; index < end; index++) {
    time.push(
      <Box
        key={index}
        sx={() => ({
          height: "50px",
          width: cellWidth,
          display: "inline-block",
          position: "relative",
          border: "1px solid white",
        })}
      >
        {index === start && (
          <Text className={classes.firstTitleTableHead}>{index}:00</Text>
        )}
        <Text className={classes.titleTableHead}>{index + 1}:00</Text>
      </Box>
    );
  }

  return (
    <ScrollArea
      className={classes.container}
      onScrollPositionChange={onScrollPositionChange}
      offsetScrollbars
      ref={ref}
    >
      <Box className={classes.tableHead}>{time}</Box>
      {dateRange.map((item: Date, idx: number) => (
        <Box ref={eTableSize.ref} key={idx}>
          <TableRow
            isEvenRow={idx % 2 == 0}
            date={item}
            start={start}
            end={end}
            cellWidth={cellWidth}
            cellHeight={cellHeight}
          />
        </Box>
      ))}
      {isHovered && (
        <Box
          className={classes.cursorTable}
          sx={() => ({
            left: `${x}px`,
          })}
        >
          {convertPostoTime(
            x + scrollPosition.x + 3,
            eTableSize.width,
            start,
            end
          ).format("HH:mm")}
        </Box>
      )}
    </ScrollArea>
  );
}
