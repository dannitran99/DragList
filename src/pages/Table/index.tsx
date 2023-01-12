import {
  Grid,
  Paper,
  Box,
  Collapse,
  Flex,
  ActionIcon,
  Text,
  Slider,
  RangeSlider,
  Stack,
  Divider,
  Button,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp, IconPlus } from "@tabler/icons";
import _ from "lodash";
import { useEffect, useState } from "react";
import { addItem, listGetAll } from "../../app/actions/dragList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setIdSelect } from "../../app/slices/listDrag";
import { RootState } from "../../app/store";
import AddModal from "../../components/AddModal";
import DragItem from "../../components/DragItem";
import Table from "../../components/SchedulerTable";
import { ItemTypes, TableConstants } from "../../constants/dragItem";
import { TableDuration, TableSizing } from "../../constants/selectValue";
import { IDataList } from "../../types/listDrag";
import { selectWeek } from "../../utils/selectDay";
import useStyles from "./styles";
export default function TableScheduler() {
  const { classes } = useStyles();
  const { data } = useAppSelector((state: RootState) => state.listDrag);
  const dispatch = useAppDispatch();
  const [openedModal, handlersModal] = useDisclosure(false);
  const [openedSetting, toggleSetting] = useToggle([false, true]);
  const [openedTodo, toggleTodo] = useToggle([true, false]);
  const [dateRange, setDateRange] = useState<Date[]>(selectWeek(new Date()));
  const [cellWidth, setCellWidth] = useState<number>(
    TableSizing.tableCellWidth
  );
  const [cellHeight, setCellHeight] = useState<number>(
    TableSizing.tableCellHeight
  );
  const [timeRange, setTimeRange] = useState<[number, number]>([
    TableDuration.START,
    TableDuration.END,
  ]);

  const changeDay = (val: Date[]) => {
    const tmp: Date | undefined = val.pop();
    if (tmp) setDateRange(selectWeek(tmp));
  };

  useEffect(() => {
    dispatch(listGetAll());
  }, [dispatch]);

  const handleDeleteItem = (id: string, handler: () => void) => {
    let newData: IDataList[] = _.cloneDeep(data);
    let index = newData.map((item: IDataList) => item.id).indexOf(id);
    if (index > -1) newData.splice(index, 1);
    handler();
    dispatch(addItem(newData));
  };

  const handleEdit = (id: string) => {
    dispatch(setIdSelect(id));
    handlersModal.open();
  };

  return (
    <Box className={classes.container}>
      <Grid gutter="xl">
        <Grid.Col span={2}>
          <Flex direction="column" gap="lg">
            <Paper shadow="xl" radius="lg" p="lg">
              <Flex justify="space-between">
                <Text fw={500}>Table Setting</Text>
                <ActionIcon radius="xl" onClick={() => toggleSetting()}>
                  {openedSetting ? (
                    <IconChevronUp size={18} />
                  ) : (
                    <IconChevronDown size={18} />
                  )}
                </ActionIcon>
              </Flex>
              <Collapse in={openedSetting} className={classes.container}>
                <Divider my="xl" />
                <Flex direction="column" gap="sm">
                  <Calendar
                    multiple
                    value={dateRange}
                    onChange={changeDay}
                    fullWidth
                  />
                  <Text>Table width</Text>
                  <Slider
                    value={cellWidth}
                    onChange={setCellWidth}
                    min={TableSizing.minWidthCell}
                    max={TableSizing.maxWidthCell}
                  />
                  <Text>Table height</Text>
                  <Slider
                    value={cellHeight}
                    onChange={setCellHeight}
                    min={TableSizing.minHeightCell}
                    max={TableSizing.maxHeightCell}
                  />
                  <Text>Time range</Text>
                  <RangeSlider
                    minRange={1}
                    value={timeRange}
                    onChange={setTimeRange}
                    min={TableDuration.START}
                    max={TableDuration.END}
                  />
                </Flex>
              </Collapse>
            </Paper>
            <Paper shadow="xl" radius="lg" p="lg">
              <Flex justify="space-between">
                <Text fw={500}>To do list</Text>
                <ActionIcon radius="xl" onClick={() => toggleTodo()}>
                  {openedTodo ? (
                    <IconChevronUp size={18} />
                  ) : (
                    <IconChevronDown size={18} />
                  )}
                </ActionIcon>
              </Flex>
              <Collapse in={openedTodo} className={classes.container}>
                <Divider my="xl" />
                <Button
                  className={classes.addButton}
                  onClick={() => handlersModal.open()}
                  variant="subtle"
                >
                  <IconPlus />
                  Add Item
                </Button>
                <Stack className={classes.stackItem}>
                  {data
                    .filter(
                      (item: IDataList) => item.status === ItemTypes.QUEUE
                    )
                    .map((item: IDataList, idx: number) => (
                      <DragItem
                        key={idx}
                        data={item}
                        date={item.create_at}
                        openModalEdit={handleEdit}
                        handleDelete={handleDeleteItem}
                        dragType={TableConstants.keydrag}
                      />
                    ))}
                </Stack>
              </Collapse>
            </Paper>
          </Flex>
        </Grid.Col>
        <Grid.Col span={10}>
          <Paper shadow="xl" radius="lg" p="lg">
            <Table
              dateRange={dateRange}
              start={timeRange[0]}
              end={timeRange[1]}
              cellWidth={cellWidth}
              cellHeight={cellHeight}
              openModalEdit={handleEdit}
              handleDelete={handleDeleteItem}
            />
          </Paper>
        </Grid.Col>
      </Grid>
      <AddModal isOpened={openedModal} setOpened={handlersModal.close} />
    </Box>
  );
}
