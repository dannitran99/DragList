import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    opacity: "0.7",
    borderRadius: theme.radius.md,
    top: 0,
    left: 0,
    position: "absolute",
    border: "1px dashed black",
    backgroundColor: theme.colors.teal[1],
  },
  hide: {
    display: "none",
  },
}));

export default useStyles;
