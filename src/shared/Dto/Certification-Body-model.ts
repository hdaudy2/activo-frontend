export class CertificationBodyModel implements ICertificationBodyModel {
   
    Id: number | undefined
    body: string | undefined;
    Code: string | undefined;
    Description: string | undefined;
    Address: string | undefined;
    IsActive: boolean | undefined;
    CreatedBy: number | undefined;
    
    //IsDeleted: boolean | undefined;
    
    
    constructor(data?: CertificationBodyModel) {
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
            this.body = data["body"];
            this.Code=data["Code"];
            this.Description=data["Description"];
            this.Address=data["Address"];
            this.IsActive = data["IsActive"];
            this.CreatedBy = data["CreatedBy"];
           
           // this.IsDeleted = data["IsDeleted"];
            
        }
    }

    static fromJS(data: any): CertificationBodyModel {
        data = typeof data === 'object' ? data : {};
        let result = new CertificationBodyModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["body"] = this.body;
        data["Code"]=this.Code;
        data["Description"]=this.Description;
        data["Address"]=this.Address;

        data["IsActive"] = this.IsActive;
        data["CreatedBy"] = this.CreatedBy;

       // data["IsDeleted"] = this.IsDeleted;
       
        return data; 
    }

    clone(): CertificationBodyModel {
        const json = this.toJSON();
        let result = new CertificationBodyModel();
        result.init(json);
        return result;
    }
}

// export interface ILocationModel {
   
//     Id: number;
//     Code: string | undefined;
//     Name: string | undefined;
//     Description: string | undefined;
//     StartDate: string | undefined;
//     IsActive: boolean | undefined;
//     IsDeleted: boolean | undefined;
  
// } {
//         if (data) {
//             for (var property in data) {
//                 if (data.hasOwnProperty(property))
//                     (<any>this)[property] = (<any>data)[property];
//             }
//         }
//     }

//     init(data?: any) {
//         if (data) {
//             this.code = data["code"];
//             this.name = data["name"];
//             this.id = data["id"];
//         }
//     }

//     static fromJS(data: any): StandardModel {
//         data = typeof data === 'object' ? data : {};
//         let result = new StandardModel();
//         result.init(data);
//         return result;
//     }

//     toJSON(data?: any) {
//         data = typeof data === 'object' ? data : {};
//         data["Id"] = this.Id;
//         data["Code"] = this.Code;
//         data["Name"] = this.Name;
//         data["Description"] = this.Description;
//         data["StartDate"] = this.StartDate;
//         data["IsActive"] = this.IsActive;
//         data["IsDeleted"] = this.IsDeleted;
        
//         return data; 
//     }

//     clone(): StandardModel {
//         const json = this.toJSON();
//         let result = new StandardModel();
//         result.init(json);
//         return result;
//     }
// }

export interface ICertificationBodyModel {
    Id: number;
    body: string | undefined;
    Code: string | undefined;
    Description: string | undefined;
    Address: string | undefined;
    IsActive: boolean | undefined;
    CreatedBy: number | undefined;

  //  IsDeleted: boolean | undefined;


    
   
}