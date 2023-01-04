import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useDisclosure } from "@mantine/hooks";
import { RootState } from "../../app/store";
import { addItem, listGetAll } from "../../app/actions/dragList";
import AddModal from "../../components/AddModal";
import { Button, Container, Flex, Paper, Space, Text } from "@mantine/core";
import { IDataList } from "../../types/listDrag";
import DragItem from "../../components/DragItem";
import DropArea from "../../components/DropArea";
import { ItemTypes } from "../../constants/dragItem";
import _ from "lodash";
import useStyles from "./styles";

function DragList() {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const { data } = useAppSelector((state: RootState) => state.listDrag);
  const [opened, handlers] = useDisclosure(false);

  useEffect(() => {
    dispatch(listGetAll());
  }, [dispatch]);

  const handleDrop = useCallback(
    (item: { name: string }) => {
      const { name } = item;
      let newData = _.cloneDeep(data);
      let index = newData.map((item: IDataList) => item.name).indexOf(name);
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

      dispatch(addItem(newData));
    },
    [data, dispatch]
  );

  return (
    <Paper className={classes.wrapper}>
      <Button onClick={() => handlers.open()}> Add Item </Button>
      <Space h="md" />
      <Flex
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
          >
            In queue
          </Text>
          {data
            .filter((item: IDataList) => item.status === ItemTypes.QUEUE)
            .map((item: IDataList, idx: number) => (
              <DragItem key={idx} data={item} />
            ))}
        </Flex>
        <Flex className={classes.container} gap="lg" direction="column">
          <Text
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
            ta="center"
            fz="xl"
            fw={700}
          >
            In Progress
          </Text>
          {data
            .filter((item: IDataList) => item.status === ItemTypes.PROGRESS)
            .map((item: IDataList, idx: number) => (
              <DragItem key={idx} data={item} />
            ))}
          <DropArea
            accept={ItemTypes.QUEUE}
            onDrop={(item: { name: string }) => handleDrop(item)}
          />
        </Flex>
        <Flex className={classes.container} gap="lg" direction="column">
          <Text
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
            ta="center"
            fz="xl"
            fw={700}
          >
            Done
          </Text>
          {data
            .filter((item: IDataList) => item.status === ItemTypes.DONE)
            .map((item: IDataList, idx: number) => (
              <DragItem key={idx} data={item} />
            ))}
          <DropArea
            accept={ItemTypes.PROGRESS}
            onDrop={(item: { name: string }) => handleDrop(item)}
          />
        </Flex>
      </Flex>
      <AddModal isOpened={opened} setOpened={() => handlers.close()} />
    </Paper>
  );
}

export default DragList;
