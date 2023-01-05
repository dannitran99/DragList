import { Box, Text } from "@mantine/core";
import { IconStackPush } from "@tabler/icons";
import { useDrop } from "react-dnd";
import useStyles from "./styles";

interface IProps {
  accept: string;
  onDrop(item: { id: string }): void;
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
      <IconStackPush />
      <Text c="teal.9" fw={700}>
        You can drop here
      </Text>
    </Box>
  );
}

export default DropArea;
