import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { QueryParamModel } from "@shared/interface/QueryParam.interface";
import { QueryParamObjToUrl } from "@shared/utility/queryParamFormatter.utility";
import { ClientModel } from '../interface/Client.interface';
@Injectable({
  providedIn: 'root'
})
export class TenantClientService {
  private URLTenantClient = `${environment.apiUrl}/api/TenantClient`;

  private Client = `${this.URLTenantClient}/client`;

  constructor(private http: HttpClient) { }

  //--------------------------------------------------
  //Client: Start
  GetAllClient(queryParams?: QueryParamModel[]): Promise<ClientModel[]> {
    let params: string = QueryParamObjToUrl(queryParams);

    const URL: string = `${this.Client}${params}`;

    return this.http.get<ClientModel[]>(URL).toPromise();
  }

  CreateClient(body: ClientModel): Promise<any> {
    console.log(`${this.Client}`, body);

    return this.http.post<any>(`${this.Client}`, body).toPromise();
  }

  GetClientId(id: number): Promise<ClientModel> {
    return this.http.get<ClientModel>(`${this.Client}/${id}`).toPromise();
  }

  UpdateClient(id: number, body: any): Promise<any> {
    return this.http.patch<any>(`${this.Client}/${id}`, body).toPromise();
  }
  //Client: End
}
