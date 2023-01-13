import {
  ActionIcon,
  Badge,
  Box,
  Divider,
  Flex,
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
  IconInfoCircle,
  IconTrash,
} from "@tabler/icons";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { setIdDrag } from "../../../../../app/slices/listDrag";
import { RootState } from "../../../../../app/store";
import { TableConstants } from "../../../../../constants/dragItem";
import { IDataList } from "../../../../../types/listDrag";
import {
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
  mousePos: number;
}
export default function Scheduler({
  data,
  parentWidth,
  start,
  end,
  date,
  handleDelete,
  openModalEdit,
  mousePos,
}: IProps) {
  const dispatch = useAppDispatch();
  const { idDrag } = useAppSelector((state: RootState) => state.listDrag);
  const { cx, classes } = useStyles();
  const { update_at, end_at, name, description, id } = data;
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
  const isDisable = compareExact(update_at, new Date());
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

  useEffect(() => {
    if (isDragging) {
      dispatch(setIdDrag(id));
    } else dispatch(setIdDrag(""));
  }, [dispatch, id, isDragging]);

  if (isDragging) {
    return <Box ref={drag} />;
  }
  return (
    <>
      {idDrag === id ? (
        <Box ref={drag} />
      ) : (
        <>
          <HoverCard width={300} position="bottom" withArrow shadow="md">
            <HoverCard.Target>
              <Box
                ref={isDisable >= 0 ? dragPreview : null}
                sx={() => ({
                  left,
                  width,
                })}
                className={cx(classes.scheduler, {
                  [classes.disableDrag]: isDisable < 0,
                })}
              >
                <Divider size={10} color={isDisable >= 0 ? "indigo" : "dark"} />
                <Flex align="center" className={classes.infoItem}>
                  <Box className={classes.resizeBox}></Box>
                  <Flex
                    justify="center"
                    align="center"
                    className={classes.dragTarget}
                    ref={isDisable >= 0 ? drag : null}
                  >
                    {width > 50 ? (
                      <Text truncate fw={500}>
                        {name}
                      </Text>
                    ) : (
                      <IconInfoCircle color="black" size="20" />
                    )}
                  </Flex>
                  <Box className={classes.resizeBox}></Box>
                </Flex>
              </Box>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Box sx={{ userSelect: "none" }}>
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
                {isDisable >= 0 ? (
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
              </Box>
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
      )}
    </>
  );
}
