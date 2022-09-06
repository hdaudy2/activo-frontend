export interface UserStandardModel {
    id: number;
    userId: number | null;
    standardId: number | null;
    standardName: string;
    auditorTypeId: number | null;
    auditorTypeName: string;
    courseTypeId: number | null;
    courseTypeName: string;
    courseDate: string | null;
    preValidDate: string | null;
    validationDate: string | null;
    approvalStatusId: number | null;
    approvalStatus: string;
    isDeleted: boolean | null;
    approvedby: number | null;
    approvedDate: string | null;
    createdBy: number | null;
    createdDate: string | null;
    lastModifiedBy: number | null;
    lastModifiedDate: string | null;
    userName: string;
    organizationId: number | null;
    documentFilePath: string;
    documentContentType: string;
    documentFile: any;
    remarks: string;
  }
  
  export interface UserDeclarationModel {
    id: number;
    userId: number | null;
    companyName: string;
    contractTypeId: number | null;
    contractTypeName: string;
    interest: string;
    approvalStatusId: number | null;
    approvalStatus: string;
    startYear: number | null;
    endYear: number | null;
    isActive: boolean | null;
    isDeleted: boolean | null;
    approvedBy: number | null;
    approvedDate: string | null;
    createdBy: number | null;
    createdDate: string | null;
  }
  
  export interface UserAcademicModel {
    id: number;
    userId: number;
    qualification: string;
    details: string;
    institution: string;
    startYear: number;
    endYear: number;
    documentFile: any;
    documentContentType: string;
    documentFilePath: string;
    isDeleted: boolean | null;
    approvedById: number | null;
    approvedDate: string | null;
    createdById: number | null;
    createdDate: string | null;
    lastModifiedBy: number | null;
    lastModifiedDate: string | null;
  }
  
  export interface UserEmploymentModel {
    id: number;
    userId: number | null;
    jobTitle: string;
    organization: string;
    businessScope: string;
    startYear: number | null;
    endYear: number | null;
    documentContentType: string;
    documentsFilePath: string;
    approvedBy: number | null;
    approvedDate: string | null;
    createdBy: number | null;
    createdDate: string | null;
    lastModifiedBy: number | null;
    lastModifiedDate: string | null;
  }
  
  export interface UserCPDModel {
    id: number;
    userId: number | null;
    course: string;
    organization: string;
    details: string;
    standardId: number | null;
    standardName: string;
    year: number | null;
    typeId: number | null;
    hours: string;
    documentFile: any;
    documentsContentType: string;
    documentsFilePath: string;
    approvedBy: number | null;
    approvedDate: string | null;
    createdBy: number | null;
    createdDate: string | null;
    lastModifiedBy: number | null;
    lastModifiedDate: string | null;
  }
  
  export interface UserProfessionalModel {
    id: number;
    userId: number | null;
    body: string;
    qualification: string;
    details: string;
    year: number | null;
    documentFile: any;
    documentsContentType: string;
    documentsFilePath: string;
    isActive: boolean | null;
    isDeleted: boolean | null;
    approvedBy: number | null;
    approvedDate: string | null;
    createdBy: number | null;
    createdDate: string | null;
    lastModifiedBy: number | null;
    lastModifiedDate: string | null;
  }
  
  export interface UserConsultancyModel {
    id: number;
    userId: number | null;
    organization: string;
    standardId: number | null;
    standardName: string;
    durationDays: number | null;
    year: number | null;
    eacodeId: number | null;
    eacodeName: string;
    naceCodeId: number | null;
    nacecodeName: string;
    isDeleted: boolean | null;
    approvedBy: number | null;
    approvedDate: string | null;
    createdBy: number | null;
    createdDate: string | null;
    lastModifiedBy: number | null;
    lastModifiedDate: string | null;
  }
  
  export interface UserAuditModel {
    id: number;
    userId: number | null;
    standardId: number | null;
    standardName: string;
    organization: string;
    eacodeId: number | null;
    eacodeName: string;
    naceCodeId: number | null;
    nacecodeName: string;
    auditTypeId: number | null;
    auditTypeName: string;
    duration: number | null;
    year: number | null;
    certificationBodyId: number | null;
    certificationBodyName: string;
    isDeleted: boolean | null;
    approvedBy: number | null;
    approvedDate: string | null;
    createdBy: number | null;
    createdDate: string | null;
    lastModifiedBy: number | null;
    lastModifiedDate: string | null;
    auditLevel: string;
  }
  
  export interface UserAuditorNaceModel {
    id: number;
    userId: number | null;
    standardId: number | null;
    standardName: string;
    eacodeId: number | null;
    eacodeName: string;
    naceCodeId: number | null;
    nacecodeName: string;
    approvalStatusId: number | null;
    approvalStatus: string;
    isDeleted: boolean | null;
    approvedBy: number | null;
    approvedDate: string | null;
    createdBy: number | null;
    createdDate: string | null;
    lastModifiedBy: number | null;
    lastModifiedDate: string | null;
    userName: string;
    remarks: string;
  }
  
  export interface SecUserModel {
    id: number;
    userName: string;
    fullName: string;
    lastName:string;
    email: string;
    password: string;
    confirmPassword: string;
    pwdChangeDateTime: string | null;
    profileExpiryDate: string | null;
    securityKey: string;
    departmentId: number;
    isActive: boolean | null;
    lockedDateTime: string | null;
    accessFailedCount: number;
    roleId: number;
    userTypeId: number | null;
    userTypeName: string;
    retirementDate: string | null;
    designation: string;
    isSubmitted: boolean;
    remarks: string;
    roleName: string;
    departmentName: string;
    status: string;
    isAuthorized: boolean | null;
    isClosed: boolean | null;
    sbpAllowed: boolean;
    prefixId: number | null;
    prefixNmae: string;
    countryId: number | null;
    countryName: string;
    cityId: number | null;
    cityName: string;
    stateId: number | null;
    stateName: string;
    address1: string;
    address2: string;
    mobile: string;
    telephone: string;
    postalCode: string;
    dateOfBirth: string | null;
    ircanumber: string;
    code: string;
    photoPath: string;
    photoContentType: string;
    confidentialityPath: string;
    confidentialityContentType: string;
    contractPath: string;
    contractContentType: string;
    firstName: string;
    organizationId: number | null;
    organizationName: string;
    emailForgotPassword: string;
    registrationNo: string;
    isDeleted: boolean | null;
    approvelStatusId: number | null;
    approvelStatus: string;
    createdBy: number | null;
    createdDate: string | null;
    lastModifiedBy: number | null;
    lastModifiedDate: string | null;
    authorizedBy: number | null;
    authorizedDate: string | null;
    parentUserId: number | null;
    parentUserName: string;
    parentAgencyId: number | null;
    parentAgencyName: string;
    buildingName : string;
    buildingId: number | null;
    floorId: number | null;
    flatId: number | null;
    userStandardModel: UserStandardModel[];
    userDeclarationModel: UserDeclarationModel[];
    userAcademicModel: UserAcademicModel[];
    userEmploymentModel: UserEmploymentModel[];
    userCPDModel: UserCPDModel[];
    userProfessionalModel: UserProfessionalModel[];
    userConsultancyModel: UserConsultancyModel[];
    userAuditModel: UserAuditModel[];
    userAuditorNaceModel: UserAuditorNaceModel[];
  }
  