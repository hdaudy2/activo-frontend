export class ProjectLedgerDetailModel implements IProjectLedgerDetailModel {
   
    Id: number | undefined;
    Date: string | undefined;
    ProjectCode: string | undefined;
    ReceiveAmount: number | undefined;
    CreatedBy: number | undefined;
    ProjectLedgerMasterId : number | undefined;
   
    //CreatedDate: string | undefined;
    //LastupdatedDate: string | undefined;
    //LastUpdatedId: number | undefined;


    constructor(data?: ProjectLedgerDetailModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    
    name: string;
    id: number;
    data: any = {};

    init(data?: any) {
        if (data) {
            this.Id = data["Id"];
            this.ReceiveAmount = data["ReceiveAmount"];
            this.Date = data["Date"];
            this.CreatedBy=data["CreatedBy"]
            this.ProjectCode=data["ProjectCode"]
            this.ProjectLedgerMasterId=data["ProjectLedgerMasterId"]

        }
    }

    static fromJS(data: any): ProjectLedgerDetailModel {
        data = typeof data === 'object' ? data : {};
        let result = new ProjectLedgerDetailModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["Id"] = this.Id;
        data["ReceiveAmount"] = this.ReceiveAmount;
        data["Date"] = this.Date;
       data["CreatedBy"]=this.CreatedBy
       data["ProjectCode"]=this.ProjectCode
       data["ProjectLedgerMasterId"]=this.ProjectLedgerMasterId

        return data; 
    }

    clone(): ProjectLedgerDetailModel {
        const json = this.toJSON();
        let result = new ProjectLedgerDetailModel();
        result.init(json);
        return result;
    }
}



export interface IProjectLedgerDetailModel {
    Id: number | undefined;
    ReceiveAmount: number | undefined;
    CreatedBy: number | undefined;
    ProjectCode: string | undefined;
    Date: string | undefined;
    ProjectLedgerMasterId: number | undefined;

    //CreatedDate: string | undefined;
    //LastUpdatedId: number | undefined;

    
   
}