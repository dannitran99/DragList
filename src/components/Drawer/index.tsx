import { Button, Divider, Drawer, Flex, Select, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrashX } from "@tabler/icons";
import { Calendar } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../app/actions/dragList";
import { useAppDispatch } from "../../app/hooks";
import { SelectTypes } from "../../constants/selectValue";
import ConfirmModal from "../ConfirmModal";
import { useState } from "react";
import { RouteType } from "../../constants/route";
interface IProps {
  isOpened: boolean;
  setClosed(): void;
}
export default function DrawerCustom(props: IProps) {
  const { isOpened, setClosed } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openedModal, handlersModal] = useDisclosure(false);
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [sortValue, setSortValue] = useState<string | null>(null);

  const handleSetDate = (val: Date) => {
    setDateValue(val);
    setSortValue(null);
    navigate({
      pathname: RouteType.dragList,
      search: `?date=${val.toISOString()}`,
    });
  };

  const handleSelectSort = (val: string) => {
    setSortValue(val);
    setDateValue(null);
    navigate({
      pathname: RouteType.dragList,
      search: `?sort=${val}`,
    });
  };

  return (
    <Drawer
      opened={isOpened}
      onClose={setClosed}
      overlayOpacity={0.55}
      overlayBlur={3}
      padding="md"
    >
      <Flex direction="column" gap="lg">
        <Text>Filter menu</Text>
        <Calendar value={dateValue} onChange={handleSetDate} fullWidth />
        <Select
          label="Sort item by..."
          placeholder="Pick one"
          data={[
            { value: SelectTypes.NAME_ASC, label: "Name ↑" },
            { value: SelectTypes.NAME_DESC, label: "Name ↓" },
            { value: SelectTypes.DATE_ASC, label: "Date ↑" },
            { value: SelectTypes.DATE_DESC, label: "Date ↓" },
          ]}
          value={sortValue}
          onChange={handleSelectSort}
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
        title={"Are you sure you want to delete all items?"}
      />
    </Drawer>
  );
}
