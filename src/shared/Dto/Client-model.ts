
export class ClientModel implements IClientModel {
    Id: number | undefined;
    Code: string  | undefined;
    Name : string | undefined ;
    Description : string | undefined;
    PhoneNumber  : string | undefined;
    MobileNumber  : string | undefined;
    Website: string | undefined;

    Email : string | undefined;
    OrganizationId: number | undefined;
    ContactPerson : string | undefined;
    // PersonContactNumber : string | undefined;
    Address1  : string | undefined ;
    Address2  : string | undefined;
    CountryId : number | undefined ;
    CityId : number | undefined ;
    StateId : number | undefined;
    PostalCode : string | undefined;
    PrefixId: number | undefined;
    Position : string | undefined;
    Date : string | undefined;
    IsDeleted :boolean | undefined;
    IsActive :boolean | undefined;
    Multisite:boolean | undefined;
    LastModifierUserId: number | undefined;
    CreatorUserId: number | undefined;
    // Reviewer : number | undefined;
    // DocumentTypeId : number | undefined;
    // CertificationId : number| undefined ;
    // StatusId : number| undefined ;
    // ModuleId : number | undefined;
    // IsActive : boolean | undefined;
    // IsDeleted:boolean | undefined;
    // File :File | undefined;
   


    constructor(data?: IClientModel) {
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
            this.Name =  data["Name"] ;
            this.Description =  data["Description"];
            this.PhoneNumber  =  data["PhoneNumber"];
            this.MobileNumber =  data["MobileNumber"];
            this.Website =  data["Website"];
            this.Email =  data["Email"];
            this.OrganizationId	=  data["OrganizationId"];
            this.ContactPerson =  data["ContactPerson"];
            this.Address1 =  data["Address1"]; 
            this.Address2 =  data["Address2"];
            this.CountryId=  data["CountryId"];
            this.CityId =  data["CityId"];
            this.StateId =  data["StateId"];
            this.PostalCode=  data["PostalCode"];
            this.PrefixId=  data["PrefixId"];
            this.Position =  data["Position"];
            this.Date  =  data["Date"];
            this.IsDeleted =  data["IsDeleted"];
            this.IsActive =  data["IsActive"];
            this.Multisite =  data["Multisite"];
            this.LastModifierUserId =  data["LastModifierUserId"];
            this.CreatorUserId=data["CreatorUserId"];

           
        }
    }

    static fromJS(data: any): ClientModel {
        data = typeof data === 'object' ? data : {};
        let result = new ClientModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"]=this.Id;
        data["Code"]=this.Code;
        data["Name"]= this.Name;
        data["Description"] =this.Description;
        data["PhoneNumber"]=this.PhoneNumber ;
        data["MobileNumber"] = this.MobileNumber;
        data["Website"] = this.Website;  
        data["Email"]= this.Email;  
        data["OrganizationId"]= this.OrganizationId;
        data["ContactPerson"] = this.ContactPerson;
        data["Address1"]=this.Address1;  
        data["Address2"]= this.Address2;  
        data["CountryId"] = this.CountryId;  
        data["CityId"] = this.CityId;  
        data["StateId"]=this.StateId;
        data["PostalCode"]=this.PostalCode;  
        data["PrefixId"]=this.PrefixId;
        data["Position"]= this.Position ;
        data["Date"] = this.Date;
        data["IsDeleted"] = this.IsDeleted;  
        data["IsActive"] = this.IsActive ;
        data["Multisite"] = this.Multisite;
        data["LastModifierUserId"]=this.LastModifierUserId;
        data["CreatorUserId"]=this.CreatorUserId;
        return data; 
    }

    clone(): ClientModel {
        const json = this.toJSON();
        let result = new ClientModel();
        result.init(json);
        return result;
    }
}

export interface IClientModel {
  
        Id: number | undefined;
        Code: string  | undefined;
        Name : string | undefined ;
        Description : string | undefined;
        PhoneNumber  : string | undefined;
        MobileNumber  : string | undefined;
        Website: string | undefined;
    
        Email : string | undefined;
        OrganizationId: number | undefined;
        ContactPerson : string | undefined;
        // PersonContactNumber : string | undefined;
        Address1  : string | undefined;
        Address2  : string | undefined;
        CountryId : number | undefined;
        CityId : number | undefined;
        StateId : number | undefined;
        PostalCode : string | undefined;
        PrefixId: number | undefined;
        Position : string | undefined;
        Date : string | undefined;
        IsDeleted :boolean | undefined;
        IsActive :boolean | undefined;
        Multisite:boolean | undefined;
        LastModifierUserId: number | undefined;
        CreatorUserId: number | undefined;
}