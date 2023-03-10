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
  containerRow: {
    position: "relative",
  },
  itemCreatePreview: {
    position: "absolute",
    height: "85%",
    top: "5%",
    backgroundColor: theme.colors.blue[7],
    borderRadius: theme.radius.md,
    opacity: "0.8",
    boxShadow:
      "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
  },
  invalidItem:{
    backgroundColor: theme.colors.gray[7],
  }
}));

export default useStyles;
