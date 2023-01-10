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
  stripes: {
    backgroundImage:
      "linear-gradient(0deg, #ffffff 25%, #f5f5f5 25%, #f5f5f5 50%, #ffffff 50%, #ffffff 75%, #f5f5f5 75%, #f5f5f5 100%)",
  },
}));

export default useStyles;
