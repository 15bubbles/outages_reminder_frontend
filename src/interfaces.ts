export enum OutageType {
  Planned = 1,
  Incident = 2,
}

export interface OutageItem {
  OutageId: string;
  Modified: string;
  StartDate: string;
  EndDate: string;
  IdsWWW: number[];
  AddressPointIds: any[];
  Message: string;
  TypeId: number;
  IsActive: boolean;
}

export interface OutagesResponse {
  OutageListType: number;
  AddressPoint: any;
  IdsWWW: number[];
  AddressLightingSupport: any;
  ServicedSwitchingoff: boolean | null;
  OutageItems: OutageItem[];
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
