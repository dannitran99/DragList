import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.gray[2],
    height: "100%",
    margin: theme.spacing.sm,
    padding: theme.spacing.lg,
  },
  container: {
    height: "80%",
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    width: "100%",
    backgroundColor: "white",
    boxShadow: "2px 2px 4px #000000",
  },
  stack: {
    height: "100%",
    position: "relative",
    padding: theme.spacing.xs,
    overflow: "auto",
  },
  fullHeight: {
    height: "100%",
  },
}));

export default useStyles;
