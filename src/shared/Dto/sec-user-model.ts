
export class SecUserModel implements ISecUserModel {
    Id: number | undefined;
    UserName: string | undefined;
    FullName: string | undefined;
    Email : string | undefined;
    Password : string | undefined;
    ConfirmPassword : string | undefined;
    UserTypeId : number | undefined;
    Designation : string | undefined;
    RoleId : number;
    SecurityKey : string | undefined;
    DepartmentId : number | undefined;
    IsActive : boolean | undefined;
    ApprovelStatusId: number | undefined;
    Remarks: string | undefined;
    AuthorizedBy : number | undefined;
    // PrefixId: number | undefined;
    // CountryId: number | undefined;
    // CityId: number | undefined;
    // StateId: number | undefined;
    // Address1: string | undefined;
    // Address2: string | undefined;
    // Mobile: string | undefined;
    // Telephone: string | undefined;
    // PostalCode: string | undefined;
    // DateOfBirth: string | undefined;
    // Ircanumber: string | undefined;


    constructor(data?: ISecUserModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    requestDate: string;

    init(data?: any) {
        if (data) {
            this.Id= data["Id"];
            this.UserName = data["UserName"];
            this.FullName = data["FullName"];
            this.Email = data["Email"];
            this.Password = data["Password"];
            this.ConfirmPassword = data["ConfirmPassword"];
            this.UserTypeId=data["UserTypeId"];
            this.Designation = data["Designation"];
            this.RoleId = data["RoleId"];
            this.SecurityKey = data["SecurityKey"];
            this.DepartmentId = data["DepartmentId"];
            this.ApprovelStatusId= data["ApprovalStatusId"];
            this.Remarks= data["Remarks"];
            this.AuthorizedBy= data["AuthorizedBy"];
            
        }
    }

    static fromJS(data: any): SecUserModel {
        data = typeof data === 'object' ? data : {};
        let result = new SecUserModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["UserName"] = this.UserName;
        data["FullName"] = this.FullName;
        data["Email"] = this.Email;
        data["Password"] = this.Password;
        data["ConfirmPassword"] = this.ConfirmPassword;
        data["UserTypeId"]=this.UserTypeId;
        data["Designation"] = this.Designation;
        data["RoleId"] = this.RoleId;
        data["SecurityKey"] = this.SecurityKey;
        data["DepartmentId"] = this.DepartmentId;
        data["ApprovelStatusId"] = this.ApprovelStatusId;
        data["Remarks"] = this.Remarks;
        data["AuthorizedBy"] = this.AuthorizedBy;
        
        return data; 
    }

    clone(): SecUserModel {
        const json = this.toJSON();
        let result = new SecUserModel();
        result.init(json);
        return result;
    }
}

export interface ISecUserModel {
    Id: number | undefined;
    UserName: string | undefined;
    FullName: string | undefined;
    Email : string | undefined;
    Password : string | undefined;
    ConfirmPassword : string | undefined;
    UserTypeId: number| undefined;
    Designation : string | undefined;
    RoleId : number;
    SecurityKey : string | undefined;
    DepartmentId : number | undefined;
    ApprovelStatusId : number | undefined;
    Remarks: string | undefined;
    AuthorizedBy: number | undefined;
}