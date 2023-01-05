import { Button, Flex, Group, Modal } from "@mantine/core";
interface IProps {
  isOpen: boolean;
  onClose(): void;
  onClickDelete(): void;
}
export default function ConfirmModal(props: IProps) {
  const { isOpen, onClose, onClickDelete } = props;
  return (
    <Modal
      withCloseButton={false}
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={isOpen}
      onClose={onClose}
      title="Delete meeting room reservation"
      lockScroll
    >
      <Flex gap="xl" direction="column">
        Are you sure you want to delete this schedule?
        <Group position="right">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={onClickDelete} color="red">
            Yes
          </Button>
        </Group>
      </Flex>
    </Modal>
  );
}
