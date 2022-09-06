
export class AgencyModel implements IAgencyModel {
    Id: number | undefined;
    Code: string  | undefined;
    Name : string | undefined ;
    Description : string | undefined;
    ContactNumber  : string | undefined;
   
    Email : string | undefined;
    ContactPerson : string | undefined;
    // PersonContactNumber : string | undefined;
    Address  : string | undefined;
    CountryId : number | undefined;
    CityId : number | undefined;
    UserName : string | undefined;
    Password : string | undefined;
    EmailForgotPassword : string | undefined;
    RoleId : number | undefined;
    StateId : number | undefined;
    Address2 : string | undefined;
    PostalCode : string | undefined;
    JoiningDate : string | undefined;
    // IsDeleted :boolean | undefined;
    IsActive :boolean | undefined;


    // Reviewer : number | undefined;
    // DocumentTypeId : number | undefined;
    // CertificationId : number| undefined ;
    // StatusId : number| undefined ;
    // ModuleId : number | undefined;
    // IsActive : boolean | undefined;
    // IsDeleted:boolean | undefined;
    // File :File | undefined;
   


    constructor(data?: IAgencyModel) {
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

            this.Id=data["Id"];
            this.Code=data["Code"];
            this.Name =data["Name"];
            this.Description =data["Description"];
            this.ContactNumber  =data["ContactNumber"];
         
            this.Email =data["Email"];
            this.ContactPerson =data["ContactPerson"];
            // this.PersonContactNumber =data["PersonContactNumber"];
            this.Address  =data["Address"];
            this.CountryId =data["CountryId"];
            this.CityId =data["CityId"];
            // this.IsDeleted =data["IsDeleted"];
            this.UserName =data["UserName"];
            this.Password =data["Password"];
            this.EmailForgotPassword =data["EmailForgotPassword"];
            this.RoleId =data["RoleId"];
            this.StateId =data["StateId"];
            this.Address2 =data["Address2"];
            this.PostalCode =data["PostalCode"];
            this.JoiningDate=data["JoiningDate"];
            this.IsActive=data["IsActive"];

           
        }
    }

    static fromJS(data: any): AgencyModel {
        data = typeof data === 'object' ? data : {};
        let result = new AgencyModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"]= this.Id;
       data["Code"]= this.Code;
       data["Name"] =this.Name ;
       data["Description"]= this.Description ;
       data["ContactNumber"]= this.ContactNumber;
     
       data["Email"]= this.Email;
       data["ContactPerson"]=  this.ContactPerson;
    //    data["PersonContactNumber"]= this.PersonContactNumber;
       data["Address"] = this.Address;
       data["CountryId"]= this.CountryId;
       data["CityId"]=this.CityId;
    //    data["IsDeleted"]=  this.IsDeleted;
       data["UserName"]=this.UserName;
        data["Password"]=this.Password ;
        data["EmailForgotPassword"]= this.EmailForgotPassword;
        data["RoleId"]=this.RoleId ;
         data["StateId"]=this.StateId;
        data["Address2"]=this.Address2 ;
        data["PostalCode"]=this.PostalCode ;
        data["JoiningDate"]=this.JoiningDate;
        data["IsActive"]=this.IsActive;
      
        return data; 
    }

    clone(): AgencyModel {
        const json = this.toJSON();
        let result = new AgencyModel();
        result.init(json);
        return result;
    }
}

export interface IAgencyModel {
    Id: number  | undefined;
    Code: string  | undefined;
    Name : string | undefined ;
    Description : string | undefined;
    ContactNumber  : string | undefined;

    Email : string | undefined;
    ContactPerson : string | undefined;
    // PersonContactNumber : string | undefined;
    Address  : string | undefined;
    CountryId : number | undefined;
    CityId : number | undefined;
    // IsDeleted :boolean | undefined;
    UserName : string | undefined;
    Password : string | undefined;
    EmailForgotPassword : string | undefined;
    RoleId : number | undefined;
    StateId : number | undefined;
    Address2 : string | undefined;
    PostalCode : string | undefined;
    JoiningDate : string | undefined;
    IsActive: boolean | undefined;
}