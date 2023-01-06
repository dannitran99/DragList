import { Button, Divider, Drawer, Flex, Select, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrashX } from "@tabler/icons";
import { addItem } from "../../app/actions/dragList";
import { useAppDispatch } from "../../app/hooks";
import ConfirmModal from "../ConfirmModal";
interface IProps {
  isOpened: boolean;
  setClosed(): void;
}
export default function DrawerCustom(props: IProps) {
  const { isOpened, setClosed } = props;
  const dispatch = useAppDispatch();
  const [openedModal, handlersModal] = useDisclosure(false);
  return (
    <Drawer
      opened={isOpened}
      onClose={setClosed}
      overlayOpacity={0.55}
      overlayBlur={3}
      padding="md"
    >
      <Flex direction="column" gap="lg">
        <Text>Filter</Text>
        <Select
          label="Sort item by..."
          placeholder="Pick one"
          data={[
            { value: "nameAsc", label: "Name ↑" },
            { value: "nameDesc", label: "Name ↓" },
            { value: "dateAsc", label: "Date ↑" },
            { value: "dateDesc", label: "Date ↓" },
          ]}
        />
        <Divider my="xl" />
        <Button
          leftIcon={<IconTrashX />}
          variant="default"
          onClick={handlersModal.open}
        >
          Clear Data
        </Button>
      </Flex>
      <ConfirmModal
        onClickDelete={() => {
          dispatch(addItem([]));
          handlersModal.close();
        }}
        onClose={handlersModal.close}
        isOpen={openedModal}
        title={"Are you sure you want to delete all item?"}
      />
    </Drawer>
  );
}
