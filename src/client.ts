import axios from "axios";
import { OutageItem, CitiesItem, StreetsItem } from "./interfaces";

const GEO_API_URL = "https://www.tauron-dystrybucja.pl/waapi/enum/geo";

const geoApiClient = axios.create({
  baseURL: GEO_API_URL,
});

interface FetchOutagesParams {
  city: string;
  street: string;
  houseNo: string;
  from: Date;
  to: Date;
}

export const fetchOutages = async (
  url: string,
  { city, street, houseNo, from, to }: FetchOutagesParams
): Promise<OutageItem[]> => {
  const { data } = await axios.get<OutageItem[]>(url, {
    params: {
      city,
      street,
      houseNo,
      from,
      to,
    },
  });

  return data;
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

export const subscribeWebPushNotifications = async (
  url: string,
  subscriptionBody: any
): Promise<void> => {
  await axios.post(url, subscriptionBody);
};
