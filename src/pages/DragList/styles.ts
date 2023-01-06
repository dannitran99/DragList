import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    backgroundColor: theme.colors.gray[2],
    height: "100%",
    padding: theme.spacing.lg,
  },
  container: {
    height: "100%",
    borderRadius: theme.radius.md,
    width: "100%",
    backgroundColor: "white",
    boxShadow: "2px 2px 4px #000000",
  },
  headText: {
    marginTop: theme.spacing.xl,
  },
  addButton: {
    margin: theme.spacing.xs,
    padding: theme.spacing.xs,
    height: "50px",
    border: "1px dashed black",
    borderRadius: theme.radius.xl,
  },
  stack: {
    margin: theme.spacing.xs,
    minHeight: "200px",
    height: "100%",
    overflow: "auto",
  },
  fullHeight: {
    height: "100%",
  },
  parentRelative: {
    height: "80%",
    position: "relative",
    margin: "0 10px",
  },
  drawerButton: {
    position: "absolute",
    top: "50%",
    left: "0%",
    height: "100px",
    width: "100px",
    transform: "translate(0,-50%)",
    backgroundColor: theme.colors.blue,
    clipPath: "ellipse(20% 50% at 0% 50%)",
    transition: "all 0.3s",
  },
  drawerButtonHover: {
    height: "50px",
    width: "50px",
    transform: "translate(10%,-50%)",
    clipPath: "circle(50% at 50% 50%)",
  },
}));

export default useStyles;
