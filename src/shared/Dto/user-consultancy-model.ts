export class UserConsultancyModel implements IUserConsultancyModel {
   
    Id: number | undefined
    UserId: number | undefined;
    Organization: string | undefined;
    StandardId: number | undefined;
    DurationDays: number | undefined;
    Year: number | undefined;
    EacodeId: number | undefined;
    NaceCodeId: number| undefined;
    ApprovedBy : number| undefined;
    CreatedBy: number| undefined;
    constructor(data?: UserConsultancyModel) {
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
            this.DurationDays = data["DurationDays"];
            this.Year = data["Year"];
            this.EacodeId = data["EacodeId"];
            this.NaceCodeId = data["NaceCodeId"];
            this.ApprovedBy = data["ApprovedBy"];
            this.CreatedBy = data["CreatedBy"];
            
        }
    }

    static fromJS(data: any): UserConsultancyModel {
        data = typeof data === 'object' ? data : {};
        let result = new UserConsultancyModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["UserId"] = this.UserId;
        data["Organization"] = this.Organization;
        data["StandardId"] = this.StandardId;
        data["DurationDays"] = this.DurationDays;
        data["Year"] = this.Year;
        data["EacodeId"] = this.EacodeId;
        data["NaceCodeId"] = this.NaceCodeId;
        data["ApprovedBy"] = this.ApprovedBy;
        data["CreatedBy"] = this.CreatedBy;
        return data; 
    }

    clone(): UserConsultancyModel {
        const json = this.toJSON();
        let result = new UserConsultancyModel();
        result.init(json);
        return result;
    }
}


export interface IUserConsultancyModel {
    Id: number | undefined
    UserId: number | undefined;
    Organization: string | undefined;
    StandardId: number | undefined;
    DurationDays: number | undefined;
    Year: number | undefined;
    EacodeId: number | undefined;
    NaceCodeId: number| undefined;
    ApprovedBy : number| undefined;
    CreatedBy: number| undefined;

    
   
}