export class UserAuditorNaceModel implements IUserAuditorNaceModel {
   
    Id: number | undefined
    UserId: number | undefined;
  
    StandardId: number | undefined;
  
    EacodeId: number | undefined;
    NaceCodeId: number| undefined;
   
    ApprovedBy : number| undefined;
    CreatedBy: number| undefined;
    ApprovelStatusId : number | undefined;
  
    LastModifiedBy: number| undefined;
    constructor(data?: UserAuditorNaceModel) {
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
            this.UserId = data["UserId"];
          
            this.StandardId = data["StandardId"];
        
            this.EacodeId = data["EacodeId"];
            this.NaceCodeId = data["NaceCodeId"];
            this.ApprovedBy = data["ApprovedBy"];
            this.CreatedBy = data["CreatedBy"];

            this.ApprovelStatusId = data["ApprovalStatusId"];
         
            this.LastModifiedBy = data["LastModifiedBy"];
        }
    }

    static fromJS(data: any): UserAuditorNaceModel {
        data = typeof data === 'object' ? data : {};
        let result = new UserAuditorNaceModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["UserId"] = this.UserId;
      
        data["StandardId"] = this.StandardId;
        
        data["EacodeId"] = this.EacodeId;
        data["NaceCodeId"] = this.NaceCodeId;
        data["ApprovedBy"] = this.ApprovedBy;
        data["CreatedBy"] = this.CreatedBy;
       
        data["ApprovelStatusId"] = this.ApprovelStatusId;

        data["LastModifiedBy"] = this.LastModifiedBy;
        return data; 
    }

    clone(): UserAuditorNaceModel {
        const json = this.toJSON();
        let result = new UserAuditorNaceModel();
        result.init(json);
        return result;
    }
}


export interface IUserAuditorNaceModel {
    Id: number | undefined
    UserId: number | undefined;
   
    StandardId: number | undefined;
   
   
    EacodeId: number | undefined;
    NaceCodeId: number| undefined;
    ApprovedBy : number| undefined;
    CreatedBy: number| undefined;
    ApprovelStatusId : number | undefined;
  
    LastModifiedBy: number| undefined;
   
}