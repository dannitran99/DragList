import { Box } from "@mantine/core";
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
    ></Box>
  );
}
