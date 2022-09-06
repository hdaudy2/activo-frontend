export class QCCommentsModel implements IQCCommentsModel {
   
    Id: number | undefined;
    Remarks: string | undefined;
    ProjectId: number | undefined;
    QcdocumentsListId: number | undefined;
    RemarksById: number | undefined;
    QcStatusId: number | undefined;
   
    constructor(data?: QCCommentsModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
  
    init(data?: any) {
        if (data) {
            this.Id = data["Id"];
            this.Remarks = data["Remarks"];
            this.ProjectId = data["ProjectId"];
            this.QcdocumentsListId = data["QcdocumentsListId"];
            this.RemarksById = data["RemarksById"];
            this.QcStatusId = data["QcStatusId"];
            
        }
    }

    static fromJS(data: any): QCCommentsModel {
        data = typeof data === 'object' ? data : {};
        let result = new QCCommentsModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["Remarks"] = this.Remarks;
        data["ProjectId"] = this.ProjectId;
        data["QcdocumentsListId"] = this.QcdocumentsListId;
        data["RemarksById"] = this.RemarksById;
        data["QcStatusId"] = this.QcStatusId;
        
        return data; 
    }

    clone(): QCCommentsModel {
        const json = this.toJSON();
        let result = new QCCommentsModel();
        result.init(json);
        return result;
    }
}
export interface IQCCommentsModel {
    Id: number| undefined
    Remarks: string | undefined;
    ProjectId: number | undefined;
    QcdocumentsListId: number | undefined;
    RemarksById: number | undefined;
    QcStatusId: number | undefined;
   // IsActive: boolean | undefined;
    //IsDeleted: boolean | undefined;


    
   
}