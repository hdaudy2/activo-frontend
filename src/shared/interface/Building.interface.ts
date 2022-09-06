export interface BuildingModel {
  id: number;
  code: number | null;
  name: string | null;
  cityId: number | null;
  cityName: string | null;
  stateId: number | null;
  stateName: string | null;
  countryId: number | null;
  clientId:number | null;
  clientName: string | null;
  countryName: string | null;
  createdById: number | null;
  createdDate: Date | null;
  isActive: boolean | null;
  isDeleted: boolean | null;
}
