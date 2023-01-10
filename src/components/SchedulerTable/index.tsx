import { Flex } from "@mantine/core";
import TableLeftLabel from "./TableLeftLebel";
import TableData from "./TableData";
import useStyles from "./styles";
import { useHover } from "@mantine/hooks";

interface IProps {
  dateRange: Date[];
  start: number;
  end: number;
  cellWidth: number;
  cellHeight: number;
}

export default function TableScheduler({
  dateRange,
  start,
  end,
  cellWidth,
  cellHeight,
}: IProps) {
  const { cx, classes } = useStyles();
  const { hovered, ref } = useHover();
  return (
    <>
      <Flex className={classes.wrapper} ref={ref}>
        <TableLeftLabel dateRange={dateRange} cellHeight={cellHeight} />
        <TableData
          dateRange={dateRange}
          start={start}
          end={end}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          isHovered={hovered}
        />
      </Flex>
    </>
  );
}
