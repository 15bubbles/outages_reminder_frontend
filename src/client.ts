import axios from "axios";
import {
  OutageItem,
  OutagesResponse,
  CitiesItem,
  StreetsItem,
} from "./interfaces";

const OUTAGES_API_URL = "https://www.tauron-dystrybucja.pl/waapi/outages";
const GEO_API_URL = "https://www.tauron-dystrybucja.pl/waapi/enum/geo";

const outagesApiClient = axios.create({
  baseURL: OUTAGES_API_URL,
});

const geoApiClient = axios.create({
  baseURL: GEO_API_URL,
});

interface GetOutagesParams {
  cityId: number;
  streetId: number;
  houseNo: string;
  fromDate: Date;
  toDate: Date;
}

export const getOutages = async ({
  cityId,
  streetId,
  houseNo,
  fromDate,
  toDate,
}: GetOutagesParams): Promise<OutageItem[]> => {
  const { data } = await outagesApiClient.get<OutagesResponse>("address", {
    params: {
      cityGAID: cityId,
      streetGAID: streetId,
      houseNo: houseNo,
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
      getLightingSupport: true,
      getServicedSwitchingoff: true,
      _: fromDate.getTime(), // timestamp of a request, we're sending it to impersonate web client
    },
  });

  return data["OutageItems"];
};

export const findCity = async (name: string): Promise<CitiesItem[]> => {
  const { data } = await geoApiClient.get<CitiesItem[]>("cities", {
    params: {
      partName: name,
      _: new Date().getTime(), // timestamp of a request, we're sending it to impersonate web client
    },
  });

  return data;
};

export const findStreet = async (
  name: string,
  cityId: number
): Promise<StreetsItem[]> => {
  const { data } = await geoApiClient.get<StreetsItem[]>("streets", {
    params: {
      partName: name,
      ownerGAID: cityId,
      _: new Date().getTime(), // timestamp of a request, we're sending it to impersonate web client
    },
  });

  return data;
};
