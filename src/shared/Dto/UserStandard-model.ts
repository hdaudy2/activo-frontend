
export class UserStandardModel implements IUserStandardModel {
    Id: number | undefined;
    UserId:number | undefined;
    StandardId:number | undefined;
    AuditorTypeId:number | undefined;
    CourseTypeId:number | undefined;
    CourseDate :string | undefined;
    PreValidDate: string  | undefined;
    ValidationDate : string | undefined ;
    ApprovelStatusId : number | undefined;
    //Approvedby  : number | undefined;
   
    CreatedBy : number | undefined;
    LastModifiedBy: number | undefined ;

   


    constructor(data?: IUserStandardModel) {
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
            this.UserId=data["UserId"];
            this.StandardId =data["StandardId"];
            this.AuditorTypeId =data["AuditorTypeId"];
            this.CourseTypeId  =data["CourseTypeId"];
         
            this.CourseDate =data["CourseDate"];
            this.PreValidDate =data["PreValidDate"];
            // this.PersonContactNumber =data["PersonContactNumber"];
            this.ValidationDate  =data["ValidationDate"];
            this.ApprovelStatusId =data["ApprovalStatusId"];
           // this.Approvedby =data["Approvedby"];
            // this.IsDeleted =data["IsDeleted"];
            this.CreatedBy =data["CreatedBy"];
            this.LastModifiedBy =data["LastModifiedBy"];
          

           
        }
    }

    static fromJS(data: any): UserStandardModel {
        data = typeof data === 'object' ? data : {};
        let result = new UserStandardModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"]= this.Id;
       data["UserId"]= this.UserId;
       data["StandardId"] =this.StandardId ;
       data["AuditorTypeId"]= this.AuditorTypeId ;
       data["CourseTypeId"]= this.CourseTypeId;
     
       data["CourseDate"]= this.CourseDate;
       data["PreValidDate"]=  this.PreValidDate;
    //    data["PersonContactNumber"]= this.PersonContactNumber;
       data["ValidationDate"] = this.ValidationDate;
       data["ApprovelStatusId"]= this.ApprovelStatusId;
      // data["Approvedby"]=this.Approvedby;
    //    data["IsDeleted"]=  this.IsDeleted;
        data["CreatedBy"]=this.CreatedBy;
        data["LastModifiedBy"]=this.LastModifiedBy ;
     
      
        return data; 
    }

    clone(): UserStandardModel {
        const json = this.toJSON();
        let result = new UserStandardModel();
        result.init(json);
        return result;
    }
}

export interface IUserStandardModel {
    Id: number | undefined;
    UserId:number | undefined;
    StandardId:number | undefined;
    AuditorTypeId:number | undefined;
    CourseTypeId:number | undefined;
    CourseDate :string | undefined;
    PreValidDate: string  | undefined;
    ValidationDate : string | undefined ;
    ApprovelStatusId : number | undefined;
    //Approvedby  : number | undefined;
    CreatedBy : number | undefined;
    LastModifiedBy: number | undefined ;
}