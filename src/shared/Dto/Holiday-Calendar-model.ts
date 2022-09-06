export class HolidayCalendarModel implements IHolidayCalendarModel {
   
    Date: string | undefined;
    Description: string | undefined;
    Id: number | undefined
    CreatedBy: number | undefined;
    HolidayTypeId: number | undefined
    HolidayName: string | undefined;
    LastModifiedBy: number | undefined;
    OrganizationId: number | undefined;
        
    constructor(data?: HolidayCalendarModel) {
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
            this.Date = data["Date"];
            this.Description=data["Description"];
            this.CreatedBy = data["CreatedBy"];
            this.HolidayTypeId = data["HolidayTypeId"];
            this.LastModifiedBy = data["LastModifiedBy"];
            this.OrganizationId = data["OrganizationId"];

           
           // this.IsDeleted = data["IsDeleted"];
            
        }
    }

    static fromJS(data: any): HolidayCalendarModel {
        data = typeof data === 'object' ? data : {};
        let result = new HolidayCalendarModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["Date"] = this.Date;
        data["Description"]=this.Description;
        data["CreatedBy"] = this.CreatedBy;
        data["HolidayTypeId"] = this.HolidayTypeId;
        data["LastModifiedBy"] = this.LastModifiedBy;
        data["OrganizationId"] = this.OrganizationId;

       // data["IsDeleted"] = this.IsDeleted;
       
        return data; 
    }

    clone(): HolidayCalendarModel {
        const json = this.toJSON();
        let result = new HolidayCalendarModel();
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

export interface IHolidayCalendarModel {
    Id: number;
    Date: string | undefined;
    Description: string | undefined;
    CreatedBy: number | undefined;
    HolidayTypeId: number | undefined;
    LastModifiedBy: number | undefined;
    OrganizationId: number | undefined;

  //  IsDeleted: boolean | undefined;


    
   
}