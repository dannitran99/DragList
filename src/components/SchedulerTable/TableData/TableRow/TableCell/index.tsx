import { Box } from "@mantine/core";
import dayjs from "dayjs";
import { convertTimeToPos } from "../../../../../utils/convertDate";
import useStyles from "./styles";
interface IProps {
  cellWidth: number;
  cellHeight: number;
  isNow: boolean;
}
export default function TableCell({ cellWidth, isNow, cellHeight }: IProps) {
  const { cx, classes } = useStyles();

  return (
    <Box
      className={cx(classes.container, { [classes.highlightCell]: isNow })}
      sx={() => ({
        width: cellWidth,
        height: cellHeight,
      })}
    >
      {isNow && (
        <Box
          className={classes.timeLine}
          sx={() => ({
            left: convertTimeToPos(dayjs().hour(0).toDate(), cellWidth, 0, 1),
          })}
        >
          <Box className={classes.line}>
            <Box className={classes.dotTop}></Box>
            <Box className={classes.dotBottom}></Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
