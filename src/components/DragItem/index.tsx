import { Flex, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useDrag } from "react-dnd";
import { IDataList } from "../../types/listDrag";
import useStyles from "./styles";
interface IProps {
  data: IDataList;
}

function DragItem(props: IProps) {
  const { data } = props;
  const { name, status, id, create_at, update_at } = data;
  const { cx, classes } = useStyles();

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: status,
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging(),
      }),
    }),
    [name, status]
  );

  function truncate(str: string, n: number) {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  }

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "sm", sm: "lg" }}
      justify={{ sm: "space-between" }}
      ref={drag}
      className={cx(classes.container, { [classes.blur]: opacity })}
    >
      <Text weight={500} color="white">
        {truncate(name, 20)}
      </Text>
      <Text size="sm" color="dimmed">
        {update_at
          ? dayjs(update_at).format("DD-MM-YYYY HH:mm:ss")
          : dayjs(create_at).format("DD-MM-YYYY HH:mm:ss")}
      </Text>
    </Flex>
  );
}

export default DragItem;
