
export class PagedRequestModel implements IPagedRequestModel {
    PidRequestApproval: boolean | undefined
    authAllowed: boolean | undefined
    isPidForm: boolean | undefined
    keyword: string | undefined
    page: number | undefined
    pageSize: number | undefined
    locationId: number | undefined
    locationTypeId: number | undefined
    inventoryInOut: number | undefined
    id: number | undefined
    ViewAllRecord: boolean | undefined
    organizationId: number | undefined
    standardId: number | undefined
    projectId: number | undefined
    userId:number| undefined
    roleId:number| undefined
    constructor(data?: IPagedRequestModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.PidRequestApproval = data["PidRequestApproval"];
            this.authAllowed = data["authAllowed"];
            this.isPidForm = data["isPidForm"];
            this.keyword = data["keyword"]
            this.pageSize = data["pageSize"]
            this.page = data["page"]
            this.locationId = data["locationId"]
            this.locationTypeId = data["locationTypeId"]
            this.inventoryInOut = data["inventoryInOut"]
            this.id = data["id"];   
            this.ViewAllRecord = data["ViewAllRecord"];   
            this.organizationId = data["organizationId"]
            this.standardId = data["standardId"]
            this.projectId =data["projectId"]
            this.userId =data["userId"]
            this.roleId=data["roleId"]
        }
    }

    static fromJS(data: any): PagedRequestModel {
        data = typeof data === 'object' ? data : {};
        let result = new PagedRequestModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["PidRequestApproval"] = this.PidRequestApproval
        data["authAllowed"] = this.authAllowed
        data["isPidForm"] = this.isPidForm
        data["keyword"] = this.keyword
        data["pageSize"] = this.pageSize = 10
        data["page"] = this.page
        data["locationId"] = this.locationId
        data["locationTypeId"] = this.locationTypeId
        data["inventoryInOut"] = this.inventoryInOut
        data["id"] = this.id;
        data["ViewAllRecord"] = this.ViewAllRecord;
        data["organizationId"] = this.organizationId
        data["standardId"] = this.standardId
        data["projectId"] = this.projectId
        data["userId"] = this.userId
        data["roleId"]=this.roleId
        return data; 
    }

    clone(): PagedRequestModel {
        const json = this.toJSON();
        let result = new PagedRequestModel();
        result.init(json);
        return result;
    }
}

export interface IPagedRequestModel {
    PidRequestApproval: boolean | undefined
    authAllowed: boolean | undefined
    isPidForm: boolean | undefined
    keyword: string | undefined
    pageSize: number | undefined
    page: number | undefined
    locationId: number | undefined
    locationTypeId: number | undefined
    inventoryInOut: number | undefined
    id: number;
    ViewAllRecord: boolean | undefined
    organizationId: number | undefined
    standardId: number | undefined
    projectId: number | undefined
    userId: number | undefined
    roleId: number | undefined
}