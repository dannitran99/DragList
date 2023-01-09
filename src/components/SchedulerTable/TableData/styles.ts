import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    whiteSpace: "nowrap",
    overflowX: "auto",
    marginLeft: "100px",
    padding: theme.spacing.xs,
  },
  tableHead: {
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
}));

export default useStyles;
