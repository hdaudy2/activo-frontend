
export class LocationModel implements ILocationModel {
    code: string | undefined;
    name: string | undefined;
    id: number | undefined

    constructor(data?: ILocationModel) {
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
            this.name = data["name"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): LocationModel {
        data = typeof data === 'object' ? data : {};
        let result = new LocationModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["code"] = this.code;
        data["name"] = this.name;
        data["id"] = this.id;
        return data; 
    }

    clone(): LocationModel {
        const json = this.toJSON();
        let result = new LocationModel();
        result.init(json);
        return result;
    }
}

export interface ILocationModel {
    code: string | undefined;
    name: string | undefined;
    id: number;
}