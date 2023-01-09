import { Box, Text } from "@mantine/core";
import TableRow from "./TableRow";
import useStyles from "./styles";

interface IProps {
  start: number;
  end: number;
  cellWidth: number;
}

export default function TableData({ start, end, cellWidth }: IProps) {
  const { cx, classes } = useStyles();

  const time = [];
  for (let index = start; index < end; index++) {
    time.push(
      <Box
        key={index}
        sx={() => ({
          height: "10px",
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
    <Box className={classes.container}>
      <Box className={classes.tableHead}>{time}</Box>
      <TableRow start={start} end={end} cellWidth={cellWidth} />
      <TableRow start={start} end={end} cellWidth={cellWidth} />
    </Box>
  );
}
