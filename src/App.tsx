import "./App.css";
import { useEffect, useState } from "react";
import { Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import { OutageItem, OutageType } from "./interfaces";
import { NoOutages } from "./NoOutages";
import { OutageCard } from "./OutageCard";
import { fetchOutages } from "./client";

function App() {
  const [outages, setOutages] = useState<OutageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "http://127.0.0.1:8000/outages";
    const from = new Date();
    const to = new Date(new Date().setDate(from.getDate() + 5));

    const getOutages = async () => {
      setIsLoading(true);

      try {
        const outages = await fetchOutages(url, {
          city: "warszawa",
          street: "wysokomazowiecka",
          houseNo: "-1",
          from,
          to,
        });
        setOutages(outages);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getOutages();
  }, []);

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

  return (
    <ChakraProvider>
      <Box>
        {isLoading ? (
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
        ) : (
          renderOutages()
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
