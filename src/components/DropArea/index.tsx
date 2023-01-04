import { Box, Text } from "@mantine/core";
import { useDrop } from "react-dnd";

interface IProps {
  accept: string;
  onDrop: (item: { name: string }) => void;
}

function DropArea({ accept, onDrop }: IProps) {
  const [{ canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });
  return <Box ref={drop}>{canDrop && `you can drop here`}</Box>;
}

export default DropArea;
