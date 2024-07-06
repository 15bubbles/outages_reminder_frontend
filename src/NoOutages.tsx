import { Box, Text } from "@chakra-ui/react";

export const NoOutages = () => {
  return (
    <Box
      textAlign="center"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="blue.100"
      mb={4}
    >
      <Text fontWeight="bold">
        Nie znaleziono obecnie trwających wyłączeń prądu dla danej lokalizacji
      </Text>
    </Box>
  );
};
