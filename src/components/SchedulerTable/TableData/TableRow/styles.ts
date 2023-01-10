import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    width: "fit-content",
    position: "relative",
  },
  evenRow: {
    backgroundColor: theme.colors.gray[0],
  },
  dropArea: {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    position: "absolute",
  },
}));

export default useStyles;
