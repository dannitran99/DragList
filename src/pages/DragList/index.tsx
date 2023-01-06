import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useDisclosure, useHover } from "@mantine/hooks";
import { RootState } from "../../app/store";
import { addItem, listGetAll } from "../../app/actions/dragList";
import AddModal from "../../components/AddModal";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IDataList } from "../../types/listDrag";
import DragItem from "../../components/DragItem";
import DropArea from "../../components/DropArea";
import { ItemTypes } from "../../constants/dragItem";
import _ from "lodash";
import useStyles from "./styles";
import { IconMenu2, IconPlus } from "@tabler/icons";
import { setFilter, setId } from "../../app/slices/listDrag";
import DrawerCustom from "../../components/Drawer";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

function DragList() {
  const dispatch = useAppDispatch();
  const { cx, classes } = useStyles();
  const { data, loading } = useAppSelector(
    (state: RootState) => state.listDrag
  );
  const [openedModal, handlersModal] = useDisclosure(false);
  const [openedDrawer, handlersDrawer] = useDisclosure(false);
  const { hovered, ref } = useHover();
  const [searchParams] = useSearchParams();
  const paramDate = searchParams.get("date");
  const paramSort = searchParams.get("sort");

  useEffect(() => {
    dispatch(listGetAll());
    if (paramDate) {
      const filter = data.filter((item: IDataList) => {
        if (item.update_at)
          return dayjs(item.update_at).diff(dayjs(paramDate), "day") === 0;
        else return dayjs(item.create_at).diff(dayjs(paramDate), "day") === 0;
      });
      dispatch(setFilter(filter));
    } else {
      setFilter(null);
    }
  }, [dispatch, paramDate, paramSort]);

  const handleDrop = useCallback(
    (item: { id: string }) => {
      const { id } = item;
      let newData: IDataList[] = _.cloneDeep(data);

      let index = newData.map((item: IDataList) => item.id).indexOf(id);

      switch (newData[index].status) {
        case ItemTypes.QUEUE:
          newData[index].status = ItemTypes.PROGRESS;
          break;
        case ItemTypes.PROGRESS:
          newData[index].status = ItemTypes.DONE;
          break;
        default:
          break;
      }
      newData[index].update_at
        ? (newData[index].update_at = new Date().toISOString())
        : (newData[index] = {
            ...newData[index],
            update_at: new Date().toISOString(),
          });
      dispatch(addItem(newData));
    },
    [data, dispatch]
  );

  const handleDeleteItem = (id: string, handler: () => void) => {
    let newData: IDataList[] = _.cloneDeep(data);
    let index = newData.map((item: IDataList) => item.id).indexOf(id);
    if (index > -1) newData.splice(index, 1);
    handler();
    dispatch(addItem(newData));
  };

  const handleEdit = (id: string) => {
    dispatch(setId(id));
    handlersModal.open();
  };

  return (
    <>
      <Paper className={classes.wrapper} shadow="lg" radius="md">
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <Flex
          className={cx(classes.drawerButton, {
            [classes.drawerButtonHover]: hovered,
          })}
          ref={ref}
          justify="center"
          align="center"
        >
          {hovered && (
            <ActionIcon
              size="xl"
              radius="xl"
              variant="transparent"
              color="lime"
              onClick={handlersDrawer.open}
            >
              <IconMenu2 size={34} />
            </ActionIcon>
          )}
        </Flex>
        <Flex
          className={classes.fullHeight}
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          justify={{ sm: "center" }}
        >
          <Flex className={classes.container} gap="lg" direction="column">
            <Text
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              sx={{ fontFamily: "Greycliff CF, sans-serif" }}
              ta="center"
              fz="xl"
              fw={700}
              className={classes.headText}
            >
              In Queue
            </Text>
            <Divider my="sm" variant="dotted" />
            <Button
              className={classes.addButton}
              onClick={() => handlersModal.open()}
              variant="subtle"
            >
              <IconPlus />
              Add Item
            </Button>
            <Stack className={classes.stack}>
              {data
                .filter((item: IDataList) => item.status === ItemTypes.QUEUE)
                .map((item: IDataList, idx: number) => (
                  <DragItem
                    key={idx}
                    data={item}
                    openModalEdit={handleEdit}
                    handleDelete={handleDeleteItem}
                  />
                ))}
            </Stack>
          </Flex>
          <Flex className={classes.container} gap="lg" direction="column">
            <Text
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              sx={{ fontFamily: "Greycliff CF, sans-serif" }}
              ta="center"
              fz="xl"
              fw={700}
              className={classes.headText}
            >
              In Progress
            </Text>
            <Divider my="sm" variant="dotted" />
            <Box className={classes.parentRelative}>
              <Stack className={classes.stack}>
                {data
                  .filter(
                    (item: IDataList) => item.status === ItemTypes.PROGRESS
                  )
                  .map((item: IDataList, idx: number) => (
                    <DragItem
                      key={idx}
                      data={item}
                      openModalEdit={handleEdit}
                      handleDelete={handleDeleteItem}
                    />
                  ))}
              </Stack>
              <DropArea
                accept={ItemTypes.QUEUE}
                onDrop={(item: { id: string }) => handleDrop(item)}
              />
            </Box>
          </Flex>
          <Flex className={classes.container} gap="lg" direction="column">
            <Text
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              sx={{ fontFamily: "Greycliff CF, sans-serif" }}
              ta="center"
              fz="xl"
              fw={700}
              className={classes.headText}
            >
              Done
            </Text>
            <Divider my="sm" variant="dotted" />
            <Box className={classes.parentRelative}>
              <Stack className={classes.stack}>
                {data
                  .filter((item: IDataList) => item.status === ItemTypes.DONE)
                  .map((item: IDataList, idx: number) => (
                    <DragItem
                      key={idx}
                      data={item}
                      openModalEdit={handleEdit}
                      handleDelete={handleDeleteItem}
                    />
                  ))}
              </Stack>
              <DropArea
                accept={ItemTypes.PROGRESS}
                onDrop={(item: { id: string }) => handleDrop(item)}
              />
            </Box>
          </Flex>
        </Flex>
        <AddModal isOpened={openedModal} setOpened={handlersModal.close} />
      </Paper>
      <DrawerCustom isOpened={openedDrawer} setClosed={handlersDrawer.close} />
    </>
  );
}

export default DragList;
