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
import useStyles from "./styles";
import { IconEdit, IconTrash } from "@tabler/icons";
import ConfirmModal from "../ConfirmModal";
interface IProps {
  data: IDataList;
  handleDelete?(id: string, handlers: () => void): void;
  openModalEdit?(id: string): void;
  dragType: string;
  date: Date | string | undefined;
}

function DragItem(props: IProps) {
  const { data, handleDelete, openModalEdit, date, dragType } = props;
  const { name, description, id } = data;
  const { cx, classes } = useStyles();
  const { hovered, ref } = useHover();
  const [opened, handlers] = useDisclosure(false);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: dragType,
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
                {dayjs(date).format("DD-MM-YYYY HH:mm:ss")}
              </Text>
            </Flex>
          </Box>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          {openModalEdit && (
            <>
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
            </>
          )}

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
            {dayjs
              .duration(
                dayjs(date).diff(dayjs(new Date()), "minutes"),
                "minutes"
              )
              .humanize(true)}
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
      {handleDelete && (
        <ConfirmModal
          isOpen={opened}
          onClose={handlers.close}
          onClickDelete={() => handleDelete(id, handlers.close)}
          title={"Are you sure you want to delete this item?"}
        />
      )}
    </>
  );
}

export default DragItem;
