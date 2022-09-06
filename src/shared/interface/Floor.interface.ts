import { FloorType } from "./FloorType.interface";

export interface FloorModel {
  id: number;
  code: string;
  name: string;
  floorTypeId?: FloorType;
  buildingId: number;
  isActive: string;
  isDeleted: string;
}