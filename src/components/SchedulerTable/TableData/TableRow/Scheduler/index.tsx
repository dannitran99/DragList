import {
  ActionIcon,
  Badge,
  Box,
  Divider,
  Group,
  HoverCard,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconClockPlay,
  IconClockStop,
  IconEdit,
  IconTrash,
} from "@tabler/icons";
import dayjs from "dayjs";
import { useDrag } from "react-dnd";
import { TableConstants } from "../../../../../constants/dragItem";
import { IDataList } from "../../../../../types/listDrag";
import {
  checkToDisplaySchedule,
  convertDurationToPixel,
  convertTimeToPos,
} from "../../../../../utils/convertDate";
import { compareExact } from "../../../../../utils/selectDay";
import ConfirmModal from "../../../../ConfirmModal";
import useStyles from "./styles";

interface IProps {
  data: IDataList;
  parentWidth: number;
  start: number;
  end: number;
  date: Date;
  handleDelete?(id: string, handlers: () => void): void;
  openModalEdit?(id: string): void;
}
export default function Scheduler({
  data,
  parentWidth,
  start,
  end,
  date,
  handleDelete,
  openModalEdit,
}: IProps) {
  const { cx, classes } = useStyles();
  const { id } = data;
  const { update_at, end_at, name, description } = data;
  const [opened, handlers] = useDisclosure(false);
  const left = convertTimeToPos(data.update_at, parentWidth, start, end, date);
  const width = convertDurationToPixel(
    update_at,
    end_at,
    parentWidth,
    start,
    end,
    date
  );
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: TableConstants.keydrag,
      item: { id, left, width, update_at, end_at },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left]
  );

  if (!checkToDisplaySchedule(data.update_at, data.end_at, start, end, date))
    return <></>;
  if (isDragging) {
    return <Box ref={drag} />;
  }
  return (
    <>
      <HoverCard width={300} position="bottom" withArrow shadow="md">
        <HoverCard.Target>
          <Box
            ref={compareExact(update_at, new Date()) >= 0 ? drag : null}
            sx={() => ({
              left,
              width,
              height: "90%",
            })}
            className={cx(classes.scheduler, {
              [classes.disableDrag]: compareExact(update_at, new Date()) < 0,
            })}
          >
            {name}
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
          {compareExact(update_at, new Date()) >= 0 ? (
            <Text fw="500">Time (Expected) </Text>
          ) : (
            <Text fw="500">Time</Text>
          )}
          <Group
            sx={(theme) => ({
              marginTop: theme.spacing.xs,
            })}
            position="apart"
          >
            <Badge
              size="lg"
              radius="xl"
              color="blue"
              variant="outline"
              leftSection={<IconClockPlay size={16} />}
            >
              {dayjs(update_at).format("HH:mm DD/MM")}
            </Badge>
            <Badge
              size="lg"
              radius="xl"
              color="blue"
              variant="outline"
              leftSection={<IconClockStop size={16} />}
            >
              {dayjs(end_at).format("HH:mm DD/MM")}
            </Badge>
          </Group>
          <Divider my="md" />
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
