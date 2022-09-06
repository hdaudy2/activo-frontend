export interface ServiceRequestModel {
  id?: number | null;
  code: string;
  title: string;
  description: string;
  serviceTypeId: number;
  clientId: number | null;
  buildingId: number;
  flatId: number;
  asset: string;
  priorityId: number;
  maintainerComments: string | null;
  statusId: number;
  isActive: boolean;
  isDeleted: boolean;
  createdById: number;
  createdDate: string;
  lastModifiedById: number | null;
  lastModifiedDate: string | null;
  completedById: number | null;
  completedDate: string | null;
}