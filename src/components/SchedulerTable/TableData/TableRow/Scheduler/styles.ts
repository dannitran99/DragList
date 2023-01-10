import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  scheduler: {
    position: "absolute",
    top: "0%",
    backgroundColor: theme.colors.blue[3],
    textAlign: "center",
    borderRadius: theme.radius.md,
    cursor: "move",
    opacity: "0.8",
    "&:hover": {
      backgroundColor: theme.colors.blue[4],
    },
  },
}));

export default useStyles;
