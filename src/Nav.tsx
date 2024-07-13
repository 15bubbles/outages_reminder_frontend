import { Box, BoxProps, Flex, Stack } from "@chakra-ui/react";

// TODO: better background
// TODO: hide when scrolling
export const Nav = ({ children, ...props }: BoxProps) => {
  return (
    <Box bg="gray.100" {...props}>
      <Flex h={16} alignItems="center" justifyContent="right">
        <Stack direction="row" spacing={7}>
          {children}
        </Stack>
      </Flex>
    </Box>
  );
};
