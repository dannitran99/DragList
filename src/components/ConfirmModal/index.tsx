import { Button, Flex, Group, Modal } from "@mantine/core";
interface IProps {
  isOpen: boolean;
  onClose(): void;
  onClickDelete(): void;
  title: string;
}
export default function ConfirmModal(props: IProps) {
  const { isOpen, onClose, onClickDelete, title } = props;
  return (
    <Modal
      withCloseButton={false}
      centered
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={isOpen}
      onClose={onClose}
      title="Delete confirmation"
      lockScroll
    >
      <Flex gap="xl" direction="column">
        {title}
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
