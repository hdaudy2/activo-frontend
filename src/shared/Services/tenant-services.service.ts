import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

import { environment } from "../../environments/environment";

import { StatusModel } from "@shared/interface/Status.interface";
import { ServiceTypeModel } from "@shared/interface/ServiceType.interface";
import { PriorityModel } from "@shared/interface/Priority.interface";
import { ServiceRequestModel } from "@shared/interface/ServiceRequest.interface";
import { QueryParamModel } from "@shared/interface/QueryParam.interface";

import { QueryParamObjToUrl } from '@shared/utility/queryParamFormatter.utility';

@Injectable({
  providedIn: "root",
})
export class TenantServicesService {
  private URLTenantBuilding = `${environment.apiUrl}/api/TenantBuilding`;
  private URLTenantRequest = `${environment.apiUrl}/api/TenantsRequest`;

  private Priority = `${this.URLTenantRequest}/priority`;
  private ServiceType = `${this.URLTenantRequest}/serviceType`;
  private Status = `${this.URLTenantRequest}/status`;
  private ServiceRequest = `${this.URLTenantRequest}/serviceRequest`;

  constructor(private http: HttpClient) {}

  // ---------------------------------------------------------
  // SecUser: Start
  GetUserByIdUsingPromise(id): Promise<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/api/SecUser/GetUserDataById?id=${id}`)
      .toPromise();
  }
  GetUserByIdUsingObservable(id): Promise<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/api/SecUser/GetUserDataById?id=${id}`)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => throwError(error))
      )
      .toPromise();
  }
  // SecUser: End
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // Priority: Start
  GetAllPriorities(): Promise<PriorityModel[]> {
    return this.http.get<PriorityModel[]>(`${this.Priority}`).toPromise();
  }
  GetPriorityById(id: number): Promise<PriorityModel> {
    return this.http.get<PriorityModel>(`${this.Priority}/${id}`).toPromise();
  }
  // Priority: End
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ServiceType: Start
  GetAllServiceTypes(): Promise<ServiceTypeModel[]> {
    return this.http.get<ServiceTypeModel[]>(`${this.ServiceType}`).toPromise();
  }
  CreateServiceType(body: ServiceTypeModel): Promise<any> {
    return this.http.post<any>(`${this.ServiceType}`, body).toPromise();
  }
  GetServiceTypeById(id: number): Promise<ServiceTypeModel> {
    return this.http
      .get<ServiceTypeModel>(`${this.ServiceType}/${id}`)
      .toPromise();
  }
  UpdateServiceType(id: number, body: any): Promise<any> {
    return this.http
      .patch<any>(`${this.ServiceType}/${id}`, body)
      .toPromise();
  }
  // ServiceType: End
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // Status: Start
  GetAllStatus(): Promise<StatusModel[]> {
    return this.http.get<StatusModel[]>(`${this.Status}`).toPromise();
  }
  GetStatusById(id: number): Observable<StatusModel> {
    return this.http.get<StatusModel>(`${this.Status}/${id}`);
  }
  // Status: End
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // Building: Start
  GetAllServiceRequest(
    queryParams?: QueryParamModel[]
  ): Promise<ServiceRequestModel[]> {
    let params: string = QueryParamObjToUrl(queryParams);
    const URL: string = `${this.ServiceRequest}${params}`;
    console.log(URL);
    return this.http.get<ServiceRequestModel[]>(URL).toPromise();
  }
  GetServiceRequestById(id: number): Promise<ServiceRequestModel> {
    return this.http
      .get<ServiceRequestModel>(`${this.ServiceRequest}/${id}`)
      .toPromise();
  }
  CreateServiceRequest(body: ServiceRequestModel): Promise<any> {
    return this.http.post<any>(`${this.ServiceRequest}`, body).toPromise();
  }
  UpdateServiceRequest(id: number, body: any): Promise<any> {
    return this.http
      .patch<any>(`${this.ServiceRequest}/${id}`, body)
      .toPromise();
  }
  // Building: End
  // ---------------------------------------------------------
}
