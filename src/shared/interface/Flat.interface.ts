export interface FlatModel {
  id: number;
  code: string;
  name: string;
  parkingSlotId?: number;
  buildingId: number;
  floorId: number;
  isActive: string;
  isDeleted: string;
}