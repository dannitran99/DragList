import { createStyles, Flex } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.xs,
    borderRadius: theme.spacing.lg,
    backgroundColor: theme.colors.blue[9],
    cursor: "move",
  },
  blur: { opacity: "0.5" },
}));

export default useStyles;
