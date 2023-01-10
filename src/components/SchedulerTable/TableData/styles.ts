import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    whiteSpace: "nowrap",
    overflowX: "hidden",
  },
  tableHead: {
    height: "50px",
    width: "fit-content",
  },
  titleTableHead: {
    position: "absolute",
    right: "0%",
    bottom: "20%",
    transform: "translate(50%,50%)",
    zIndex: 99,
  },
  firstTitleTableHead: {
    position: "absolute",
    left: "0%",
    bottom: "20%",
    transform: "translate(0%,50%)",
    zIndex: 99,
  },
  cursorTable: {
    width: 0,
    height: "100%",
    position: "absolute",
    top: 0,
    borderLeft: "1px dashed red",
    transform: "translate(3px,0%)",
  },
}));

export default useStyles;
