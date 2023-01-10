import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    display: "inline-block",
    border: "1px dashed #ccc",
    "&:hover": {
      backgroundColor: theme.colors.gray[2],
    },
  },
  highlightCell: {
    borderTop: "1px solid black",
    boxShadow: "0px -1px 0px 2px black inset",
  },
}));

export default useStyles;
