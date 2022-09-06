export interface ParkingSlotModel {
  id: number;
  code: string;
  name: string;
  buildingId: number;
  floorId: number;
  isAllotted: boolean;
  isActive: boolean;
  isDeleted: boolean;
}