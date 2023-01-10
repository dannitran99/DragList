import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.md,
  },
  addButton: {
    height: "50px",
    width: "100%",
    border: "1px dashed black",
    borderRadius: theme.radius.xl,
  },
  stackItem: {
    marginTop: theme.spacing.md,
  },
}));

export default useStyles;
