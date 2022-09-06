export class UserDeclarationModel implements IUserDeclarationModel {
   
    Id: number | undefined
    UserId: number | undefined;
    CompanyName: string | undefined;
    ContractTypeId: number | undefined;
    Interest: string | undefined;
    ApprovalStatusId: number | undefined;
    StartYear: number | undefined;
    EndYear: number| undefined;
    ApprovedBy : number| undefined;
    CreatedBy: number| undefined;
    constructor(data?: UserDeclarationModel) {
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
            this.CompanyName = data["CompanyName"];
            this.ContractTypeId = data["ContractTypeId"];
            this.Interest = data["Interest"];
            this.ApprovalStatusId = data["ApprovalStatusId"];
            this.StartYear = data["StartYear"];
            this.EndYear = data["EndYear"];
            this.ApprovedBy = data["ApprovedBy"];
            this.CreatedBy = data["CreatedBy"];
            
        }
    }

    static fromJS(data: any): UserDeclarationModel {
        data = typeof data === 'object' ? data : {};
        let result = new UserDeclarationModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["UserId"] = this.UserId;
        data["CompanyName"] = this.CompanyName;
        data["ContractTypeId"] = this.ContractTypeId;
        data["Interest"] = this.Interest;
        data["ApprovalStatusId"] = this.ApprovalStatusId;
        data["StartYear"] = this.StartYear;
        data["EndYear"] = this.EndYear;
        data["ApprovedBy"] = this.ApprovedBy;
        data["CreatedBy"] = this.CreatedBy;
        return data; 
    }

    clone(): UserDeclarationModel {
        const json = this.toJSON();
        let result = new UserDeclarationModel();
        result.init(json);
        return result;
    }
}


export interface IUserDeclarationModel {
    Id: number | undefined
    UserId: number | undefined;
    CompanyName: string | undefined;
    ContractTypeId: number | undefined;
    Interest: string | undefined;
    ApprovalStatusId: number | undefined;
    StartYear: number | undefined;
    EndYear: number| undefined;
    ApprovedBy : number| undefined;
    CreatedBy: number| undefined;

    
   
}