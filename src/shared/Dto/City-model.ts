export class CityModel implements ICityModel {
   
    Id: number | undefined
    Code: string | undefined;
    Name: string | undefined;
    CountryId: number | undefined;
    StateId: number | undefined;
    IsActive: boolean | undefined;
    //IsDeleted: boolean | undefined;
    
    
    constructor(data?: CityModel) {
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
            this.Code = data["Code"];
            this.Name = data["Name"];
            this.CountryId = data["CountryId"];
            this.StateId = data["StateId"];
            this.IsActive = data["IsActive"];
            //this.IsDeleted = data["IsDeleted"];
            
        }
    }

    static fromJS(data: any): CityModel {
        data = typeof data === 'object' ? data : {};
        let result = new CityModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["Code"] = this.Code;
        data["Name"] = this.Name;
        data["CountryId"] = this.CountryId;
        data["StateId"] = this.StateId;
        data["IsActive"] = this.IsActive;
        //data["IsDeleted"] = this.IsDeleted;
       
        return data; 
    }

    clone(): CityModel {
        const json = this.toJSON();
        let result = new CityModel();
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

export interface ICityModel {
    Id: number;
    Code: string | undefined;
    Name: string | undefined;
    CountryId: number | undefined;
    StateId: number | undefined;
    IsActive: boolean | undefined;
    //IsDeleted: boolean | undefined;


    
   
}