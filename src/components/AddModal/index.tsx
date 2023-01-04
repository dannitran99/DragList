import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Modal, Button, Group, TextInput, Textarea } from "@mantine/core";
import { RootState } from "../../app/store";
import { useForm } from "@mantine/form";
import { addItem } from "../../app/actions/dragList";
import { IDataList } from "../../types/listDrag";

interface IModal {
  isOpened: boolean;
  setOpened: () => void;
}
interface IDataModal {
  name: string;
  description: string;
}

function AddModal(props: IModal) {
  const { isOpened, setOpened } = props;
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.listDrag);
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },

    validate: {
      name: (value) =>
        value.trim().length ? null : "Can not leave name blank!",
    },
  });

  const postData = (val: IDataModal) => {
    const newData: IDataList = {
      ...val,
      status: "onQueue",
      create_at: new Date().toISOString(),
    };
    dispatch(addItem([...data, newData]));
    setOpened();
  };

  return (
    <>
      <Modal opened={isOpened} onClose={setOpened} title="Add to list">
        <form onSubmit={form.onSubmit((values) => postData(values))}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Enter item name..."
            {...form.getInputProps("name")}
          />
          <Textarea
            label="Description"
            placeholder="Write some description..."
            {...form.getInputProps("description")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export default AddModal;
