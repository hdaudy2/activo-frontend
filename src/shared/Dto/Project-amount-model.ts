export class ProjectAmountModel implements IProjectAmountModel {
   
    Id: number | undefined;
    Date: String | undefined;
    Code: string | undefined;
    OrganizationId: string | undefined;
    Amount: number | undefined;
    StandardId: string | undefined;
    IsActive: boolean | undefined;
    IsDeleted: boolean | undefined;
    Description: string | undefined;
    CreatedBy: number | undefined;
    //CreatedDate: string | undefined;
    //LastupdatedDate: string | undefined;
    LastUpdatedId: number | undefined;


    constructor(data?: ProjectAmountModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    
    name: string;
    id: number;
    data: any = {};

    init(data?: any) {
        if (data) {
            this.Id = data["Id"];
            this.StandardId = data["StandardId"];
            this.OrganizationId = data["OrganizationId"];
            this.Amount = data["Amount"];
            this.Date = data["Date"];
            this.IsActive = data["IsActive"];
            this.IsDeleted = data["IsDeleted"];
            this.Description=data["Description"];
            this.CreatedBy=data["CreatedBy"]
        }
    }

    static fromJS(data: any): ProjectAmountModel {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectAmountModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["OrganizationId"] = this.OrganizationId;
        data["StandardId"] = this.StandardId;
        data["Amount"] = this.Amount;
        data["Date"] = this.Date;
        data["IsActive"] = this.IsActive;
        data["IsDeleted"] = this.IsDeleted;
       data["Description"]=this.Description;
       data["CreatedBy"]=this.CreatedBy
        return data; 
    }

    clone(): ProjectAmountModel {
        const json = this.toJSON();
        let result = new ProjectAmountModel();
        result.init(json);
        return result;
    }
}



export interface IProjectAmountModel {
    Id: number | undefined;
    Date: String | undefined;
    Code: string | undefined;
    OrganizationId: string | undefined;
    Amount: number | undefined;
    StandardId: string | undefined;
    IsActive: boolean | undefined;
    IsDeleted: boolean | undefined;
    Description: string | undefined;
    CreatedBy: number | undefined;
    //CreatedDate: string | undefined;
    LastUpdatedId: number | undefined;

    
   
}