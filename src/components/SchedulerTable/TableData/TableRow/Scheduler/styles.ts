import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  scheduler: {
    position: "absolute",
    top: "0%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    textAlign: "center",
    borderRadius: theme.radius.md,
    cursor: "pointer",
    opacity: "0.8",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },
}));

export default useStyles;
