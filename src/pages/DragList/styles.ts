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
  addButton: {
    margin: theme.spacing.xs,
    height: "50px",
    border: "1px dashed black",
    borderRadius: theme.radius.xl,
  },
  stack: {
    height: "100%",
    overflow: "auto",
    padding: theme.spacing.xs,
  },
  fullHeight: {
    height: "100%",
  },
  parentRelative: {
    height: "80%",
    position: "relative",
  },
}));

export default useStyles;
