export interface ServiceTypeModel {
  id: number;
  code: string;
  name: string;
  description: string;
  isActive: string;
  isDeleted: string;
  lastModifiedById: number | null;
  lastModifiedDate: string | null;
  createdById: number | null;
  createdDate: string | null;
}