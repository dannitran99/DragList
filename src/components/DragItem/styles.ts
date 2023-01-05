import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    padding: theme.spacing.xs,
    borderRadius: theme.spacing.lg,
    backgroundColor: theme.colors.blue[9],
    cursor: "move",
    transition: "opacity 0.5s",
  },
  blur: { opacity: "0.5" },
}));

export default useStyles;
