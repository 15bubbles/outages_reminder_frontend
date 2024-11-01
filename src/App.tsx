import { useEffect, useState } from "react";
import {
  Box,
  ChakraProvider,
  IconButton,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { Location, OutageItem, OutageType } from "./interfaces";
import { NoOutages } from "./NoOutages";
import { OutageCard } from "./OutageCard";
import { fetchOutages } from "./client";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";
import { SearchLocationModal } from "./SearchLocationModal";
import { Nav } from "./Nav";
import { FaSearch } from "react-icons/fa";
import { useWebPushNotifications } from "./hooks";
import { SubscribeButton } from "./SubscribeButton";

const LOCAL_STORAGE_KEY = "outages.location";

const saveLocationToLocalStorage = (location: Location): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(location));
};

const readLocationFromLocalStorage = (): Location | null => {
  const value = localStorage.getItem(LOCAL_STORAGE_KEY);
  return value ? JSON.parse(value) : null;
};

// NOTE: could be a hook that uses `useSearchParams` hook underneath
//  instead of passing `URLSearchParams` argument
const readLocationFromSearchParams = (
  searchParams: URLSearchParams
): Location | null => {
  const city = searchParams.get("city") || localStorage.getItem("outages.city");
  const street = searchParams.get("street");
  const houseNo = searchParams.get("houseNo");

  return city && street && houseNo ? { city, street, houseNo } : null;
};

// NOTE: could be a hook that uses `useSearchParams` hook underneath
//  instead of passing `setSearchParams` setter
const setLocationToSearchParams = (
  { city, street, houseNo }: Location,
  setSearchParams: SetURLSearchParams
) => {
  setSearchParams({ city, street, houseNo });
};

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [outages, setOutages] = useState<OutageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: use `defaultIsOpen` to display modal on starting page if nothing in localStorage
  //  nor searchParams
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const url = "http://127.0.0.1:8000/outages";

    const getOutages = async () => {
      setIsLoading(true);

      const today = new Date();
      const location =
        readLocationFromSearchParams(searchParams) ||
        readLocationFromLocalStorage();
      const from = new Date(searchParams.get("from") || today);
      const to = new Date(
        searchParams.get("to") ||
          new Date(new Date().setDate(today.getDate() + 5))
      );

      if (location) {
        try {
          const outages = await fetchOutages(url, {
            ...location,
            from,
            to,
          });
          setOutages(outages);
          saveLocationToLocalStorage(location);
          setLocationToSearchParams(location, setSearchParams);
        } catch (err: any) {
          // TODO: error handling, show some toast with error details
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }

      // TODO: else redirect to / and show search form
    };

    getOutages();
  }, [searchParams]);

  useWebPushNotifications();

  const handleOnSubmit = ({ city, street, houseNo }: Location) => {
    setSearchParams({ city, street, houseNo });
  };

  const renderOutages = () => {
    return outages.length > 0 ? (
      outages.map(({ startDate, endDate, message, type }, idx) => (
        <OutageCard
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          location={message}
          isPlanned={type == OutageType.Planned}
          key={idx}
        />
      ))
    ) : (
      <NoOutages />
    );
  };

  const renderLoading = () => {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        zIndex="9999"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  };

  return (
    <ChakraProvider>
      <Nav m="0 auto" px="2rem" w="100%">
        <IconButton
          aria-label="Search location"
          icon={<FaSearch />}
          onClick={onOpen}
        />
      </Nav>
      <Box max-width="1280px" m="0 auto" p="2rem">
        <SearchLocationModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleOnSubmit}
        />
        {isLoading ? renderLoading() : renderOutages()}
        <SubscribeButton position="fixed" bottom="6" right="6" />
      </Box>
    </ChakraProvider>
  );
}

export default App;
