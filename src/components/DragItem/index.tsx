import {
  Flex,
  Box,
  HoverCard,
  Text,
  Group,
  ActionIcon,
  Divider,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import dayjs from "dayjs";
import { useDrag } from "react-dnd";
import { IDataList } from "../../types/listDrag";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import useStyles from "./styles";
import { IconEdit, IconTrash } from "@tabler/icons";
import ConfirmModal from "../ConfirmModal";
interface IProps {
  data: IDataList;
  handleDelete(id: string, handlers: () => void): void;
  openModalEdit(id: string): void;
}

dayjs.extend(duration);
dayjs.extend(relativeTime);

function DragItem(props: IProps) {
  const { data, handleDelete, openModalEdit } = props;
  const { name, description, status, id, create_at, update_at } = data;
  const { cx, classes } = useStyles();
  const { hovered, ref } = useHover();
  const [opened, handlers] = useDisclosure(false);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: status,
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging(),
      }),
    }),
    [id]
  );

  const truncate = (str: string, n: number) => {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  };

  return (
    <>
      <HoverCard
        width={200}
        position="bottom"
        withArrow
        shadow="md"
        disabled={opacity || opened}
      >
        <HoverCard.Target>
          <Box
            ref={drag}
            className={cx(classes.container, {
              [classes.blur]: opacity || hovered,
            })}
          >
            <Flex
              ref={ref}
              direction={{ base: "column", sm: "row" }}
              gap={{ base: "sm", sm: "lg" }}
              justify={{ sm: "space-between" }}
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
          </Box>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group position="right">
            <Tooltip label="Edit">
              <ActionIcon
                variant="light"
                color="blue"
                onClick={() => openModalEdit(id)}
              >
                <IconEdit size={18} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete">
              <ActionIcon
                variant="light"
                color="red"
                onClick={() => {
                  handlers.open();
                }}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Divider my="sm" />
          <Text size="sm">
            <Text span c="blue" inherit>
              Name:{" "}
            </Text>
            {name}
          </Text>
          <Text size="sm">
            <Text span c="blue" inherit>
              Description:{" "}
            </Text>
            {description}
          </Text>
          <Text size="sm" color="dimmed" align="right">
            {update_at
              ? dayjs
                  .duration(
                    dayjs(update_at).diff(dayjs(new Date()), "minutes"),
                    "minutes"
                  )
                  .humanize(true)
              : dayjs
                  .duration(
                    dayjs(create_at).diff(dayjs(new Date()), "minutes"),
                    "minutes"
                  )
                  .humanize(true)}
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
      <ConfirmModal
        isOpen={opened}
        onClose={handlers.close}
        onClickDelete={() => handleDelete(id, handlers.close)}
        title={"Are you sure you want to delete this item?"}
      />
    </>
  );
}

export default DragItem;
