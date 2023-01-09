import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.lime[7],
    display: "inline-block",
    height: "100px",
    border: "1px solid #ccc",
    "&:hover": {
      backgroundColor: theme.colors.lime[5],
    },
  },
}));

export default useStyles;
