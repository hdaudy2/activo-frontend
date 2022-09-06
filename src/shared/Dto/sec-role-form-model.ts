export class SecRoleFormModel implements SecRoleFormModel {
    id: number | undefined;
    code: string | undefined;
    name: string | undefined;
    Remarks: string | undefined;
    IsSubmitted: boolean | undefined;
    SecRoleForm: any [];

    constructor(data?: SecRoleFormModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.code = data["code"];
            this.IsSubmitted = data["IsSubmitted"];
            this.name = data["name"];
            this.Remarks = data["Remarks"];
            this.id = data["id"];
            this.SecRoleForm = data["SecRoleForm"];
            
        }
    }

    static fromJS(data: any): SecRoleFormModel {
        data = typeof data === 'object' ? data : {};
        let result = new SecRoleFormModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["IsSubmitted"] = this.IsSubmitted;
        data["code"] = this.code;
        data["name"] = this.name;
        data["Remarks"] = this.Remarks;
        data["id"] = this.id;
        data["SecRoleForm"] = this.SecRoleForm;
        return data; 
    }

    clone(): SecRoleFormModel {
        const json = this.toJSON();
        let result = new SecRoleFormModel();
        result.init(json);
        return result;
    }
}

export interface ISecRoleFormModel {
    id: number | undefined;
    code: string | undefined;
    name: string | undefined;
    Remarks: string | undefined;
    IsSubmitted: boolean | undefined;
    SecRoleForm: any [];
}