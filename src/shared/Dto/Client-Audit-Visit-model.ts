export class ClientAuditVisitModel implements IClientAuditVisitModel {

    Id: number | undefined
    ProjectId: number | undefined;
    //VisitTypeId: number | undefined;
   VisitStatusId: number | undefined;
    JustifiedPersonId: number | undefined;
    TechnicalExpertId: number | undefined;

    Duration: string | undefined;
    VisitDate: string | undefined;
    StartDate: string | undefined;
    EndDate: string | undefined;
    LeadAuditorId: number | undefined;

    Auditor1Id: number | undefined;
    Auditor2Id: number | undefined;
    Auditor3Id: number | undefined;
    Auditor4Id: number | undefined;
    Auditor5Id: number | undefined;
    ReviewerId: number | undefined;
    ReviewDate: string | undefined;
    SubmissionDate: string | undefined;
    VerificationLevel: string | undefined;
    
    CreatedById: number | undefined;
    LastModifiedById: number | undefined;
    File: string | undefined;
    OrganizationId: number | undefined;
    StandardId: number | undefined;
    //IsDeleted: boolean | undefined;
    VisitLevelId

    constructor(data?: ClientAuditVisitModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    // VisitTypeId: string;
    // ProjectId: string;
    // id: number;

    init(data?: any) {
        if (data) {
            this.Id = data["Id"];
            this.ProjectId = data["ProjectId"];
           // this.VisitTypeId = data["VisitTypeId"];
            this.VisitStatusId = data["VisitStatusId"];
            
            this.VisitLevelId = data["VisitLevelId"];
            this.JustifiedPersonId = data["JustifiedPersonId"];
            this.TechnicalExpertId = data["TechnicalExpertId"];
            this.Duration = data["Duration"];

            this.VisitDate = data["VisitDate"];
            this.StartDate = data["StartDate"];
            this.EndDate = data["EndDate"];
            this.LeadAuditorId = data["LeadAuditorId"];
            this.Auditor1Id = data["Auditor1Id"];
            this.Auditor2Id = data["Auditor2Id"];
            this.Auditor3Id = data["Auditor3Id"];

            this.Auditor3Id = data["Auditor3Id"];
            this.Auditor4Id = data["Auditor4Id"];
            this.Auditor5Id = data["Auditor5Id"];
            this.ReviewerId=data["ReviewerId"];
            this.ReviewDate=data["ReviewDate"];
            this.SubmissionDate=data["SubmissionDate"];
            this.VerificationLevel = data["VerificationLevel"];
            this.CreatedById = data["CreatedById"];
            this.LastModifiedById = data["LastModifiedById"];
            this.File= data["File"];
            this.OrganizationId=data["OrganizationId"];
            this.StandardId=data["StandardId"];
            
            // this.IsDeleted = data["IsDeleted"];

        }
    }

    static fromJS(data: any): ClientAuditVisitModel {
        data = typeof data === 'object' ? data : {};
        let result = new ClientAuditVisitModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["ProjectId"] = this.ProjectId;
        //data["VisitTypeId"] = this.VisitTypeId;
       data["VisitStatusId"] = this.VisitStatusId;
        data["VisitLevelId"] = this.VisitLevelId;
        
        data["JustifiedPersonId"] = this.JustifiedPersonId;
        data["TechnicalExpertId"] = this.TechnicalExpertId;

        data["Duration"] = this.Duration;

        data["VisitDate"] = this.VisitDate;
        data["StartDate"] = this.StartDate;
        data["EndDate"] = this.EndDate;
        data["LeadAuditorId"] = this.LeadAuditorId;
        data["Auditor1Id"] = this.Auditor1Id;
        data["Auditor2Id"] = this.Auditor2Id;
        data["Auditor3Id"] = this.Auditor3Id;

        data["Auditor3Id"] = this.Auditor3Id;
        data["Auditor4Id"] = this.Auditor4Id;
        data["Auditor5Id"] = this.Auditor5Id;
        data["ReviewerId"] = this.ReviewerId;
        data["ReviewDate"] = this.ReviewDate;
        data["SubmissionDate"] = this.SubmissionDate;
        data["VerificationLevel"] = this.VerificationLevel;
        data["CreatedById"] = this.CreatedById;
        data["LastModifiedById"] = this.LastModifiedById;
        data["File"] = this.File;
        data["OrganizationId"] = this.OrganizationId;
        data["StandardId"] = this.StandardId;
        
        // data["IsDeleted"] = this.IsDeleted;

        return data;
    }

    clone(): ClientAuditVisitModel {
        const json = this.toJSON();
        let result = new ClientAuditVisitModel();
        result.init(json);
        return result;
    }
}


export interface IClientAuditVisitModel {
    Id: number;
    ProjectId: number | undefined;
    //VisitTypeId: number | undefined;
    VisitStatusId: number | undefined;
    JustifiedPersonId: number | undefined;
    TechnicalExpertId: number | undefined;
    Duration: string | undefined;
    VisitDate: string | undefined;
    StartDate: string | undefined;
    EndDate: string | undefined;
    LeadAuditorId: number | undefined;

    Auditor1Id: number | undefined;
    Auditor2Id: number | undefined;
    Auditor3Id: number | undefined;
    Auditor4Id: number | undefined;
    Auditor5Id: number | undefined;
    ReviewerId: number | undefined;
    ReviewDate: string | undefined;
    SubmissionDate: string | undefined;
    VerificationLevel: string | undefined;
    CreatedById: number | undefined;
    LastModifiedById: number | undefined;
    File: string | undefined;
    OrganizationId: number | undefined;
    StandardId: number | undefined;
    VisitLevelId: number | undefined;

}