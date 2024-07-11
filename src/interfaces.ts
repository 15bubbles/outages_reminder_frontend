export enum OutageType {
  Planned = 1,
  Incident = 2,
}

export interface OutageItem {
  startDate: string;
  endDate: string;
  message: string;
  type: OutageType;
}

export interface CitiesItem {
  GUS: string;
  DistrictGAID: number;
  ProvinceGAID: number;
  CountryGAID: number;
  CommuneName: string;
  DistrictName: string;
  ProvinceName: string;
  GAID: number;
  OwnerGAID: number;
  Name: string;
}

export interface StreetsItem {
  StreetGUS: string;
  Prefix: string;
  PostFix: string | null;
  FullName: string;
  ShortName: string;
  GAID: number;
  OwnerGAID: number;
  Name: string;
}
