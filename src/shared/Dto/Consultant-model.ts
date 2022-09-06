
export class ConsultantModel implements IConsultantModel {
    
    Id: number | undefined
    Code: string | undefined;
    Name: string | undefined;
    TellNumber: string | undefined;
    Email: string | undefined;
    PhoneNumber: string | undefined;
    Address: string | undefined;
    CountryId: number | undefined;
    CityId: number | undefined;
    StateId: number | undefined;
    PrefixId: number | undefined;
    OrganizationId: number | undefined;
    IsActive: boolean | undefined;




    constructor(data?: ConsultantModel) {
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
    requestDate: string;

    init(data?: any) {
        if (data) {
            debugger
            this.Id = data["Id"];
            this.Code = data["Code"];
            this.Name = data["Name"];
            this.PrefixId = data["PrefixId"];
            this.TellNumber = data["TellNumber"];
            this.Email = data["Email"];
            this.PhoneNumber = data["PhoneNumber"];
            this.Address = data["Address"];
            this.CountryId = data["CountryId"];
            this.OrganizationId = data["OrganizationId"];
            this.CityId = data["CityId"];
            this.StateId = data["StateId"];
            this.IsActive = data["IsActive"];

        }
    }


    static fromJS(data: any): ConsultantModel {
        data = typeof data === 'object' ? data : {};
        let result = new ConsultantModel();
        result.init(data);
        return result;
    }


    toJSON(data?: any) {
        debugger
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["Code"] = this.Code;
        data["Name"] = this.Name;
        data["TellNumber"] = this.TellNumber;
        data["Email"] = this.Email;
        data["PhoneNumber"] = this.PhoneNumber;
        data["Address"] = this.Address;
        data["CountryId"] = this.CountryId;
        data["OrganizationId"] = this.OrganizationId;
        data["CityId"] = this.CityId;
        data["StateId"] = this.StateId;
        data["PrefixId"] = this.PrefixId;
        data["IsActive"] = this.IsActive;

        return data;
    }


    clone(): ConsultantModel {
        const json = this.toJSON();
        let result = new ConsultantModel();
        result.init(json);
        return result;
    }
}

export interface IConsultantModel {

    Id: number | undefined
    Code: string | undefined;
    Name: string | undefined;
    TellNumber: string | undefined;
    Email: string | undefined;
    PhoneNumber: string | undefined;
    Address: string | undefined;
    CountryId: number | undefined;
    CityId: number | undefined;
    StateId: number | undefined;
    PrefixId: number | undefined;
    OrganizationId: number | undefined;
    IsActive: boolean | undefined;
}
