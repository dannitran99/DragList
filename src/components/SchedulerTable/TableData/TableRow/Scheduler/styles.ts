import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  scheduler: {
    height: "90%",
    position: "absolute",
    top: "5%",
    backgroundColor: theme.colors.blue[3],
    textAlign: "center",
    borderRadius: theme.radius.md,
    cursor: "move",
    opacity: "0.8",
    boxShadow:
      "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
    "&:hover": {
      backgroundColor: theme.colors.blue[4],
    },
  },
  disableDrag: {
    backgroundColor: theme.colors.gray[5],
    cursor: "default",
    "&:hover": {
      backgroundColor: theme.colors.gray[6],
    },
  },
  infoItem: {
    height: "80%",
    userSelect: "none",
  },
  dragTarget: {
    height: "100%",
    width: "100%",
  },
  resizeBox: {
    width: "2px",
    height: "100%",
    cursor: "e-resize",
  },
}));

export default useStyles;
