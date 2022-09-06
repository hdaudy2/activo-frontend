
export class IndentingRequestDto implements IIndentingRequestDto {
    requestDate: string | undefined;
    indentNo: string | undefined;
    IndentRequestDetail : any[]
    id: number | undefined

    constructor(data?: IIndentingRequestDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.requestDate = data["requestDate"];
            this.indentNo = data["indentNo"];
            this.IndentRequestDetail = data["IndentRequestDetail"]
            this.id = data["id"];
        }
    }

    static fromJS(data: any): IndentingRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new IndentingRequestDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["requestDate"] = this.requestDate;
        data["indentNo"] = this.indentNo;
        data["IndentRequestDetail"] = this.IndentRequestDetail
        data["id"] = this.id;
        return data; 
    }

    clone(): IndentingRequestDto {
        const json = this.toJSON();
        let result = new IndentingRequestDto();
        result.init(json);
        return result;
    }
}

export interface IIndentingRequestDto {
    requestDate: string | undefined;
    indentNo: string | undefined;
    IndentRequestDetail : any[]
    id: number;
}