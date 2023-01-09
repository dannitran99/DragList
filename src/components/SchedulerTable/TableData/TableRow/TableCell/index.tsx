import { Box } from "@mantine/core";
import useStyles from "./styles";
interface IProps {
  cellWidth: number;
}
export default function TableCell({ cellWidth }: IProps) {
  const { cx, classes } = useStyles();

  return (
    <Box
      className={classes.container}
      sx={() => ({
        width: cellWidth,
      })}
    ></Box>
  );
}
