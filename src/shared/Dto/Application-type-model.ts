export class ApplicationTypeModel implements IApplicationTypeModel {
   
    Id: number | undefined
    Code: string | undefined;
    Name: string | undefined;
    Description: string | undefined;
    IsActive: boolean | undefined;
    IsDeleted: boolean | undefined;
    
    
    constructor(data?: ApplicationTypeModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }y
    
    code: string;
    name: string;
    id: number;

    init(data?: any) {
        if (data) {
            this.Id = data["Id"];
            this.Code = data["Code"];
            this.Name = data["Name"];
            this.Description=data["Description"];
            this.IsActive = data["IsActive"];
            this.IsDeleted = data["IsDeleted"];
            
        }
    }

    static fromJS(data: any): ApplicationTypeModel {
        data = typeof data === 'object' ? data : {};
        let result = new ApplicationTypeModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["Code"] = this.Code;
        data["Name"] = this.Name;
        data["Description"]=this.Description;
        data["IsActive"] = this.IsActive;
        data["IsDeleted"] = this.IsDeleted;
       
        return data; 
    }

    clone(): ApplicationTypeModel {
        const json = this.toJSON();
        let result = new ApplicationTypeModel();
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

export interface IApplicationTypeModel {
    Id: number;
    Code: string | undefined;
    Name: string | undefined;
    Description: string | undefined;
    IsActive: boolean | undefined;
    IsDeleted: boolean | undefined;


    
   
}