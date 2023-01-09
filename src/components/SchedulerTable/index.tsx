import { Box, RangeSlider, Slider } from "@mantine/core";
import { useState } from "react";
import { TableDuration, TableSizing } from "../../constants/selectValue";

import TableData from "./TableData";

export default function TableScheduler() {
  const [cellWidth, setCellWidth] = useState<number>(TableSizing.tableCell);
  const [timeRange, setTimeRange] = useState<[number, number]>([
    TableDuration.START,
    TableDuration.END,
  ]);

  return (
    <>
      <Box>
        <TableData
          start={timeRange[0]}
          end={timeRange[1]}
          cellWidth={cellWidth}
        />
      </Box>
      <Slider
        value={cellWidth}
        onChange={setCellWidth}
        min={TableSizing.minWidthCell}
        max={TableSizing.maxWidthCell}
      />
      <RangeSlider
        minRange={1}
        value={timeRange}
        onChange={setTimeRange}
        min={TableDuration.START}
        max={TableDuration.END}
      />
    </>
  );
}
