
export class LibraryResourceModel implements ILibraryResourceModel {
    Code: string  | undefined;
    Title: string | undefined ;
    Description : string | undefined;
    Version : string | undefined;
    Date : string | undefined;
    Reviewer : number | undefined;
    DocumentTypeId : number | undefined;
    CertificationId : number| undefined ;
    StatusId : number| undefined ;
    ModuleId : number | undefined;
    IsActive : boolean | undefined;
    IsDeleted:boolean | undefined;
    File :File | undefined;
   


    constructor(data?: ILibraryResourceModel) {
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
            this.Code = data["Code"];
            this.Title = data["Title"];
            this.Description = data["Description"];
            this.Version = data["Version"];
            this.Date = data["Date"];
            this.Reviewer = data["Reviewer"];
            this.DocumentTypeId=data["DocumentTypeId"];
            this.CertificationId = data["CertificationId"];
            this.StatusId = data["StatusId"];
            this.ModuleId = data["ModuleId"];
            this.IsActive=data["IsActive"];
            this.IsDeleted=data["IsDeleted"];
            this.File=data["File"];
        }
    }

    static fromJS(data: any): LibraryResourceModel {
        data = typeof data === 'object' ? data : {};
        let result = new LibraryResourceModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Code"] = this.Code;
        data["Title"] = this.Title;
        data["Description"] = this.Description;
        data["Version"] = this.Version;
        data["Date"] = this.Date;
        data["Reviewer"] = this.Reviewer;
        data["DocumentTypeId"]=this.DocumentTypeId;
        data["CertificationId"] = this.CertificationId;
        data["StatusId"] = this.StatusId;
        data["ModuleId"] = this.ModuleId;
        data["IsDeleted"]=this.IsDeleted;
        data["IsActive"]=this.IsActive;
       data["File"]=this.File;
        return data; 
    }

    clone(): LibraryResourceModel {
        const json = this.toJSON();
        let result = new LibraryResourceModel();
        result.init(json);
        return result;
    }
}

export interface ILibraryResourceModel {
    Code: string | undefined;
    Title: string | undefined;
    Description : string | undefined;
    Version : string | undefined;
    Date : string | undefined;
    Reviewer : number | undefined;
    DocumentTypeId: number | undefined;
    CertificationId : number | undefined;
    StatusId :  number| undefined;
    ModuleId : number | undefined;
    IsActive: boolean| undefined;
    IsDeleted : boolean| undefined;
    File:File | undefined;
}