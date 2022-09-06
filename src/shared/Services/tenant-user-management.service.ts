import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { QueryParamModel } from "@shared/interface/QueryParam.interface";
import { QueryParamObjToUrl } from "@shared/utility/queryParamFormatter.utility";
import { SecUserModel } from '@shared/interface/UserManagement.interface';


@Injectable({
  providedIn: 'root'
})
export class TenantUserManagementService {
  private URLTenantUserManagement = `${environment.apiUrl}/api/TenantUserManagement`;

  private userManagement = `${this.URLTenantUserManagement}/userMaintenance`;
  constructor(private http: HttpClient) { }
  GetAllUsers(queryParams?: QueryParamModel[]): Promise<SecUserModel[]> {
    let params: string = QueryParamObjToUrl(queryParams);

    const URL: string = `${this.userManagement}${params}`;

    return this.http.get<SecUserModel[]>(URL).toPromise();
  }

  GetUserId(id: number): Promise<SecUserModel> {
    return this.http.get<SecUserModel>(`${this.userManagement}/${id}`).toPromise();
  }
  UpdateUserManagement(id: number, body: any): Promise<any> {
    return this.http.patch<any>(`${this.userManagement}/${id}`, body).toPromise();
  }

  CreateUser(body: SecUserModel): Promise<any> {
    console.log(`${this.userManagement}`, body);

    return this.http.post<any>(`${this.userManagement}`, body).toPromise();
  }

}
