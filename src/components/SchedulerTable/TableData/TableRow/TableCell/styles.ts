import { createStyles } from "@mantine/core";
import { relative } from "path";

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    display: "inline-block",
    border: "1px dashed #ccc",
    "&:hover": {
      backgroundColor: theme.colors.gray[2],
    },
  },
  highlightCell: {
    borderTop: "1px solid black",
    boxShadow: "0px -1px 0px 2px black inset",
  },
  timeLine: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: 0,
  },
  line: {
    position: "relative",
    height: "100%",
    borderLeft: "2px solid red",
  },
  dotTop: {
    position: "absolute",
    top: 0,
    left: 0,
    transform: "translate(-70%,-50%)",
    height: "6px",
    width: "6px",
    backgroundColor: "red",
    borderRadius: "50%",
  },
  dotBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    transform: "translate(-70%,0%)",
    height: "6px",
    width: "6px",
    backgroundColor: "red",
    borderRadius: "50%",
  },
}));

export default useStyles;
