export interface ClientModel {
    address1: string;
    address2: string;
    cityId: number;
    cityName: string;
    code: string;
    contactPerson: string;
    countryId: number;
    countryName: string;
    creationTime: Date | null;
    creatorUserId: number | null;
    date: Date | null;
    deleterUserId: null;
    deletionTime: null;
    description: null;
    email: string;
    id: number;
    isActive: boolean;
    isDeleted: number;
    isProjectExist: null;
    lastModificationTime: Date | null;
    lastModifierUserId: number | null;
    mobileNumber: string;
    multisite?: boolean;
    name: string;
    organizationCode: string;
    organizationId?: number;
    organizationName: string;
    overAllEmployees: string;
    personContactNumber: string;
    phoneNumber: string;
    position: string;
    postalCode: string;
    prefixId: number;
    siteAddress: string;
    siteCity: string;
    siteCount: number | null;
    siteCountry: string;
    siteName: string;
    stateId?: number;
    stateName: string;
    website: string;
}


