export class UserAuditModel implements IUserAuditModel {
   
    Id: number | undefined
    UserId: number | undefined;
    Organization: string | undefined;
    StandardId: number | undefined;
    Duration: number | undefined;
    Year: number | undefined;
    EacodeId: number | undefined;
    NaceCodeId: number| undefined;
    AuditTypeId: number| undefined;
    ApprovedBy : number| undefined;
    CreatedBy: number| undefined;
    CertificationBodyId: number| undefined;
    LastModifiedBy: number| undefined;
    AuditLevel: string | undefined;

    constructor(data?: UserAuditModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    code: string;
    name: string;
    id: number;

    init(data?: any) {
        if (data) {
            this.Id = data["Id"];
            this.UserId = data["UserId"];
            this.Organization = data["Organization"];
            this.StandardId = data["StandardId"];
            this.Duration = data["Duration"];
            this.Year = data["Year"];
            this.EacodeId = data["EacodeId"];
            this.NaceCodeId = data["NaceCodeId"];
            this.ApprovedBy = data["ApprovedBy"];
            this.CreatedBy = data["CreatedBy"];
            this.AuditTypeId = data["AuditTypeId"];
            this.CertificationBodyId = data["CertificationBodyId"];
            this.LastModifiedBy = data["LastModifiedBy"];
            this.AuditLevel = data["AuditLevel"];
            
        }
    }

    static fromJS(data: any): UserAuditModel {
        data = typeof data === 'object' ? data : {};
        let result = new UserAuditModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["UserId"] = this.UserId;
        data["Organization"] = this.Organization;
        data["StandardId"] = this.StandardId;
        data["Duration"] = this.Duration;
        data["Year"] = this.Year;
        data["EacodeId"] = this.EacodeId;
        data["NaceCodeId"] = this.NaceCodeId;
        data["ApprovedBy"] = this.ApprovedBy;
        data["CreatedBy"] = this.CreatedBy;
        data["AuditTypeId"] = this.AuditTypeId;
        data["CertificationBodyId"] = this.CertificationBodyId;
        data["LastModifiedBy"] = this.LastModifiedBy;
        data["AuditLevel"] = this.AuditLevel;
        
        return data; 
    }

    clone(): UserAuditModel {
        const json = this.toJSON();
        let result = new UserAuditModel();
        result.init(json);
        return result;
    }
}


export interface IUserAuditModel {
    Id: number | undefined
    UserId: number | undefined;
    Organization: string | undefined;
    StandardId: number | undefined;
    Duration: number | undefined;
    Year: number | undefined;
    EacodeId: number | undefined;
    NaceCodeId: number| undefined;
    ApprovedBy : number| undefined;
    CreatedBy: number| undefined;
    AuditTypeId: number| undefined;
    CertificationBodyId: number| undefined;
    LastModifiedBy: number| undefined;
    AuditLevel: string | undefined;
   
}