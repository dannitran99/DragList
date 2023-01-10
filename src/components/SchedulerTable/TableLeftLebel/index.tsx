import { Box, Text } from "@mantine/core";
import dayjs from "dayjs";
import { compareDay } from "../../../utils/selectDay";
import useStyles from "./styles";
interface IProps {
  dateRange: Date[];
  cellHeight: number;
}
export default function TableLeftLabel({ dateRange, cellHeight }: IProps) {
  const { cx, classes } = useStyles();
  const weekday = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <Box>
      <Box className={classes.firstCell}></Box>
      {dateRange.map((item: Date, idx: number) => (
        <Box
          key={idx}
          className={cx(classes.container, {
            [classes.borderHighlight]: compareDay(item, new Date()),
          })}
          sx={() => ({
            height: cellHeight,
          })}
        >
          <Text size={24} fw={700}>
            {dayjs(item).date()}
          </Text>
          <Text c="dimmed">{weekday[dayjs(item).isoWeekday() - 1]}</Text>
        </Box>
      ))}
    </Box>
  );
}
