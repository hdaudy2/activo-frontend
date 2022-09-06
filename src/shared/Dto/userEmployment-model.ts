export class UserEmploymentModel implements IUserEmploymentModel {
   
    Id: number | undefined
    UserId: number | undefined;
    JobTitle: string | undefined;
    Organization: string | undefined;
    BusinessScope: string | undefined;
    
    StartYear: number | undefined;
    EndYear: number| undefined;
    ApprovedBy : number| undefined;
    CreatedBy: number| undefined;
    constructor(data?: UserEmploymentModel) {
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
            this.JobTitle = data["JobTitle"];
            this.Organization = data["Organization"];
            this.BusinessScope = data["BusinessScope"];
           
            this.StartYear = data["StartYear"];
            this.EndYear = data["EndYear"];
            this.ApprovedBy = data["ApprovedBy"];
            this.CreatedBy = data["CreatedBy"];
            
        }
    }

    static fromJS(data: any): UserEmploymentModel {
        data = typeof data === 'object' ? data : {};
        let result = new UserEmploymentModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["UserId"] = this.UserId;
        data["JobTitle"] = this.JobTitle;
        data["Organization"] = this.Organization;
        data["BusinessScope"] = this.BusinessScope;
      
        data["StartYear"] = this.StartYear;
        data["EndYear"] = this.EndYear;
        data["ApprovedBy"] = this.ApprovedBy;
        data["CreatedBy"] = this.CreatedBy;
        return data; 
    }

    clone(): UserEmploymentModel {
        const json = this.toJSON();
        let result = new UserEmploymentModel();
        result.init(json);
        return result;
    }
}


export interface IUserEmploymentModel {
    Id: number | undefined
    UserId: number | undefined;
    JobTitle: string | undefined;
    Organization: string | undefined;
    BusinessScope: string | undefined;

    StartYear: number | undefined;
    EndYear: number| undefined;
    ApprovedBy : number| undefined;
    CreatedBy: number| undefined;

    
   
}