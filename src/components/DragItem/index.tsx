import { Box, Text } from "@mantine/core";
import { useDrag } from "react-dnd";
import { IDataList } from "../../types/listDrag";
import useStyles from "./styles";
interface IProps {
  data: IDataList;
}

function DragItem(props: IProps) {
  const { data } = props;
  const { name, status } = data;
  const { cx, classes } = useStyles();

  const [collected, drag] = useDrag(
    () => ({
      type: status,
      item: { name },
    }),
    [name, status]
  );
  return (
    <Box ref={drag} className={classes.container}>
      <Text
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan", deg: 45 }}
        sx={{ fontFamily: "Greycliff CF, sans-serif" }}
        ta="center"
        fz="xl"
        fw={700}
      >
        {name}
      </Text>
    </Box>
  );
}

export default DragItem;
