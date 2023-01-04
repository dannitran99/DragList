import { Box, Text } from "@mantine/core";
import { useDrop } from "react-dnd";
import useStyles from "./styles";

interface IProps {
  accept: string;
  onDrop: (item: { name: string }) => void;
}

function DropArea({ accept, onDrop }: IProps) {
  const { cx, classes } = useStyles();
  const [{ canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <Box
      ref={drop}
      className={cx(classes.container, { [classes.hide]: !canDrop })}
    >
      {canDrop && `you can drop here`}
    </Box>
  );
}

export default DropArea;
