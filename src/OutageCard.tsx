import { Badge, Box, Icon, Stack, Text } from "@chakra-ui/react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

interface OutageCardParams {
  startDate: Date;
  endDate: Date;
  isPlanned: boolean;
  location: string;
}

// TODO: better date formatting

export const OutageCard = ({
  startDate,
  endDate,
  isPlanned,
  location,
}: OutageCardParams) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg={isPlanned ? "yellow.100" : "red.100"}
      mb={4}
    >
      <Stack spacing={3}>
        <Badge colorScheme={isPlanned ? "yellow" : "red"}>
          {isPlanned ? "Planowane" : "Awaria"}
        </Badge>
        <Text>
          <Icon as={FaCalendarAlt} mr={2} />
          <strong>Od:</strong> {new Date(startDate).toLocaleString()}
        </Text>
        <Text>
          <Icon as={FaCalendarAlt} mr={2} />
          <strong>Do:</strong> {new Date(endDate).toLocaleString()}
          {!isPlanned && <strong> (przewidywane zakończenie)</strong>}
        </Text>
        <Text>
          <Icon as={FaMapMarkerAlt} mr={2} />
          <strong>Lokalizacja:</strong> {location}
        </Text>
      </Stack>
    </Box>
  );
};
