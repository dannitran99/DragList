import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { randomId } from "@mantine/hooks";

import { Modal, Button, Group, TextInput, Textarea } from "@mantine/core";
import { RootState } from "../../app/store";
import { useForm } from "@mantine/form";
import { addItem } from "../../app/actions/dragList";
import { IDataList } from "../../types/listDrag";
import { useEffect } from "react";
import { config } from "process";
import { setId } from "../../app/slices/listDrag";
import _ from "lodash";

interface IModal {
  isOpened: boolean;
  setOpened(): void;
}
interface IDataModal {
  name: string;
  description: string;
}

function AddModal(props: IModal) {
  const { isOpened, setOpened } = props;
  const dispatch = useAppDispatch();
  const { data, idSelect } = useAppSelector(
    (state: RootState) => state.listDrag
  );
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
  useEffect(() => {
    if (isOpened) {
      if (idSelect) {
        let index = data.map((item: IDataList) => item.id).indexOf(idSelect);
        form.setValues({
          name: data[index].name,
          description: data[index].description,
        });
      }
    } else {
      dispatch(setId(""));
      form.reset();
    }
  }, [isOpened]);

  const postData = (val: IDataModal) => {
    if (idSelect) {
      let newData = _.cloneDeep(data);
      let index = newData.map((item: IDataList) => item.id).indexOf(idSelect);
      newData[index].name = val.name;
      newData[index].description = val.description;
      dispatch(addItem(newData));
    } else {
      const newData: IDataList = {
        id: randomId(),
        ...val,
        status: "onQueue",
        create_at: new Date().toISOString(),
      };
      dispatch(addItem([newData, ...data]));
    }
    form.reset();
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
