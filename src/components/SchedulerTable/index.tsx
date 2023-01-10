import { Flex } from "@mantine/core";
import TableLeftLabel from "./TableLeftLebel";
import TableData from "./TableData";
import useStyles from "./styles";

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

  return (
    <>
      <Flex className={classes.wrapper}>
        <TableLeftLabel dateRange={dateRange} cellHeight={cellHeight} />
        <TableData
          dateRange={dateRange}
          start={start}
          end={end}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
        />
      </Flex>
    </>
  );
}
