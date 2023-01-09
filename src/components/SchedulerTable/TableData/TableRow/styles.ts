import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    height: "100px",
    width: "fit-content",
    position: "relative",
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
