import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    borderBottom: "1px dashed #ccc",
    marginTop: "-1px",
  },
  firstCell: {
    height: "50px",
    borderBottom: "1px dashed #ccc",
  },
  borderHighlight: {
    border: "2px solid red",
    margin: "-2px 0",
  },
}));

export default useStyles;
