export class CourseTypeModel implements ICourseTypeModel {
   
    Id: number | undefined
    name: string | undefined;
    Code: string | undefined;
    Description: string | undefined;
    IsActive: boolean | undefined;
    CreatedBy: number | undefined;
    
    //IsDeleted: boolean | undefined;
    
    
    constructor(data?: CourseTypeModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    code: string;
    Name: string;
    id: number;

    init(data?: any) {
        if (data) {
            this.Id = data["Id"];
            this.name = data["name"];
            this.Code=data["Code"];
            this.Description=data["Description"];
            this.IsActive = data["IsActive"];
            this.CreatedBy = data["CreatedBy"];
           
           // this.IsDeleted = data["IsDeleted"];
            
        }
    }

    static fromJS(data: any): CourseTypeModel {
        data = typeof data === 'object' ? data : {};
        let result = new CourseTypeModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["name"] = this.name;
        data["Code"]=this.Code;
        data["Description"]=this.Description;
        data["IsActive"] = this.IsActive;
        data["CreatedBy"] = this.CreatedBy;

       // data["IsDeleted"] = this.IsDeleted;
       
        return data; 
    }

    clone(): CourseTypeModel {
        const json = this.toJSON();
        let result = new CourseTypeModel();
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

export interface ICourseTypeModel {
    Id: number;
    name: string | undefined;
    Code: string | undefined;
    Description: string | undefined;
    IsActive: boolean | undefined;
    CreatedBy: number | undefined;

  //  IsDeleted: boolean | undefined;


    
   
}