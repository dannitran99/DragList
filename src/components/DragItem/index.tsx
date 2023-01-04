import { Box, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { IDataList } from "../../types/listDrag";

interface IProps {
  data: IDataList;
}

function DragItem(props: IProps) {
  const { data } = props;
  return (
    <Box>
      <Text
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan", deg: 45 }}
        sx={{ fontFamily: "Greycliff CF, sans-serif" }}
        ta="center"
        fz="xl"
        fw={700}
      >
        {data.name}
      </Text>
    </Box>
  );
}

export default DragItem;
