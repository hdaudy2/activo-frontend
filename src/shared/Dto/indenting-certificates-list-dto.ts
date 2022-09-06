
export class IndentingCertificateListDto implements IIndentingCertificateListDto {
    dencode: string | undefined;
    productDenominationId: string | undefined;
    certificate: string | undefined;
    quantity: number | undefined;
    productId: number | undefined
    id: number;

    constructor(data?: IIndentingCertificateListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        
    }

    init(data?: any) {
        if (data) {
            this.dencode = data["dencode"];
            this.productDenominationId = data["productDenominationId"];
            this.certificate= data["certificate"];
            this.quantity = data["quantity"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): IndentingCertificateListDto {
        data = typeof data === 'object' ? data : {};
        let result = new IndentingCertificateListDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["dencode"] = this.dencode;
        data["productDenominationId"] = this.productDenominationId;
        data["certificate"] = this.certificate;
        data["quantity"] = this.quantity;
        data["productId"] = this.productId;
        data["id"] = this.id;
        return data; 
    }

    clone(): IndentingCertificateListDto {
        const json = this.toJSON();
        let result = new IndentingCertificateListDto();
        result.init(json);
        return result;
    }
}

export interface IIndentingCertificateListDto {
    dencode: string | undefined;
    productDenominationId: string | undefined;
    certificate: string | undefined;
    quantity: number | undefined;
    productId: number | undefined
    id: number;
}