import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useDisclosure } from "@mantine/hooks";
import { RootState } from "../../app/store";
import { addItem, listGetAll } from "../../app/actions/dragList";
import AddModal from "../../components/AddModal";
import { Button } from "@mantine/core";
import { IDataList } from "../../types/listDrag";
import DragItem from "../../components/DragItem";
import DropArea from "../../components/DropArea";
import { ItemTypes } from "../../constants/dragItem";
import _ from "lodash";

function DragList() {
  const dispatch = useAppDispatch();
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
      newData[index].status = "onProgress";
      dispatch(addItem(newData));
    },
    [data, dispatch]
  );

  return (
    <>
      <Button onClick={() => handlers.open()}> Add Item </Button>
      {data.map((item: IDataList, idx: number) => (
        <DragItem key={idx} data={item} />
      ))}
      <AddModal isOpened={opened} setOpened={() => handlers.close()} />
      <DropArea
        accept={ItemTypes.QUEUE}
        onDrop={(item: { name: string }) => handleDrop(item)}
      />
    </>
  );
}

export default DragList;
