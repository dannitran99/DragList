import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    margin: theme.spacing.sm,
    padding: theme.spacing.lg,
  },
  container: {
    padding: theme.spacing.lg,
    width: "100%",
    border: "1px solid black",
    backgroundColor: "white",
  },
}));

export default useStyles;
