import "./App.css";
import { useEffect, useState } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { OutageItem, OutageType } from "./interfaces";
import { NoOutages } from "./NoOutages";
import { OutageCard } from "./OutageCard";
import { getOutages } from "./client";

const testOutages = [
  {
    OutageId: "ce697e88-e8bf-41d9-8135-416b45301d82",
    Modified: "2024-07-06T03:40:17.136Z",
    StartDate: "2024-07-06T03:40:00.337Z",
    EndDate: "2024-07-06T10:00:00Z",
    IdsWWW: [6],
    AddressPointIds: [4832277],
    Message:
      "Dobrzykowice, ulice: Stawowa, Leśna, Malinowa, Widawska, Szkolna i przyległe.",
    TypeId: 2,
    IsActive: true,
  },
  {
    OutageId: "019a6098-eff6-46cb-acdf-9e736e67d1e1",
    Modified: "2024-06-28T07:04:39.14Z",
    StartDate: "2024-07-08T06:00:00Z",
    EndDate: "2024-07-08T12:00:00Z",
    IdsWWW: [6],
    AddressPointIds: [],
    Message: "Wojnowice ul. Jelczańska 30 (Ferma Drobiu). Gm. Czernica.",
    TypeId: 1,
    IsActive: true,
  },
  {
    OutageId: "43bc3dec-fd05-413f-8001-d85dd45ee0d2",
    Modified: "2024-06-28T07:51:20.529Z",
    StartDate: "2024-07-08T06:00:00Z",
    EndDate: "2024-07-08T12:00:00Z",
    IdsWWW: [6],
    AddressPointIds: [],
    Message: "Nadolice Wielkie ul. Poziomkowa 32, 33. Gm. Czernica.",
    TypeId: 1,
    IsActive: true,
  },
  {
    OutageId: "09afa30e-ebab-447e-87f5-e8307b0aa16f",
    Modified: "2024-07-01T06:42:30.194Z",
    StartDate: "2024-07-09T06:00:00Z",
    EndDate: "2024-07-09T12:00:00Z",
    IdsWWW: [6],
    AddressPointIds: [],
    Message:
      "Wojnowice ul. Czereśniowa 5, 11, 13, 14, 18B, 22, 24, 24B, 25. Gm. Czernica.",
    TypeId: 1,
    IsActive: true,
  },
];

function App() {
  const [outages, setOutages] = useState<OutageItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fromDate = new Date();
    const toDate = new Date(fromDate.setDate(fromDate.getDate() + 5));

    const fetchOutages = async () => {
      setIsLoading(true);

      try {
        const outages = await getOutages({
          cityId: 118969,
          streetId: 118969,
          houseNo: "2b",
          fromDate,
          toDate,
        });
        setOutages(outages);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOutages();
  }, []);

  return (
    <ChakraProvider>
      <Box>
        {outages.length > 0 ? (
          outages.map(({ StartDate, EndDate, Message, TypeId }) => (
            <OutageCard
              startDate={new Date(StartDate)}
              endDate={new Date(EndDate)}
              location={Message}
              isPlanned={TypeId == OutageType.Planned}
            />
          ))
        ) : (
          <NoOutages />
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
