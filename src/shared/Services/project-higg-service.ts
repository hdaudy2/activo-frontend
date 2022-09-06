import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { LibraryResourceModel } from "../Dto/Library-Resource_model";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { environment } from "environments/environment";
import { result } from "lodash";
import { AgencyModel } from "../Dto/Agency-model";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
  providedIn: 'root',

})

export class HiggService {

  private baseUrl: string;


  $isDataLoaded = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }
  private data = new BehaviorSubject<any>(Response);


  ProjectHiggCreateWithFile(values): Observable<any> {
    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),

    });
    let options = { headers: headers };
    return this.http.post<any>(`${environment.apiUrl}/api/ProjectHigg/ProjectHiggCreateWithFile`, values, options)

  }

  GetAllRisk(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetAllRisk`, options)
  }
  GetAllVerificationType(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetAllVerificationType`, options)
  }
  GetAllProjectType(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetAllProjectType`, options)
  }
  GetAllConsultantList(id: number): Observable<any> {
    
    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetAllConsultantList?id=${id}`, options)
  }
  GetALLServicesType(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetALLServicesType`, options)
  }
  GetALLMethodology(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetALLMethodology`, options)
  }
  GetALLRequestOfSite(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetALLRequestOfSite`, options)
  }

  GetALLAssessmentCompleted(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetALLAssessmentCompleted`, options)
  }

  GetALLCompletedModule(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetALLCompletedModule`, options)
  }
  GetALLEffluentTreatmentPlant(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetALLEffluentTreatmentPlant`, options)
  }
  GetAllClientSites(id: number): Observable<any> {
    
    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetAllClientSites?id=${id}`, options)
  }


  GetProjectHiggBYId(id) {
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetProjectHiggBYId?id=${id}`, options);
  }







  downloadApplicationForm(id: number) {
    
    return this.http.get(`${environment.apiUrl}/api/ProjectHigg/DownloadApplicationForm?id=${id}`, { responseType: 'blob' })

  }


  GetProjectRemarks(value): Observable<any> {
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    
    return this.http.post<any>(`${environment.apiUrl}/api/ProjectHigg/GetPagedPrjectRemarks`, value, options);
    // return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);

  }

  GetALLProjectStatus(id) {
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetALLProjectStatus?id=${id}`, options);
  }

  ApprovedProject(values): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.post<any>(`${environment.apiUrl}/api/ProjectHigg/CreateApproval`, values)

  }


  SubmitForReview(id: number): Observable<any> {

    var loginUserId = localStorage.getItem('userId');
    
    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    // var Id =localStorage.getItem('organizationId');
    return this.http.post<any>(`${environment.apiUrl}/api/ProjectHigg/SubmitForReview?id=${id}`, parseInt(loginUserId), options);
  }

  DeleteProject(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    
    return this.http.post<any>(`${environment.apiUrl}/api/ProjectHigg/ProjectHiggDeleteById?id=${id}`, options)

  }

  GetALLModuleVersion(id:number): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetALLModuleVersion?id=${id}`, options)
  }
  GetALLModuleShare(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/ProjectHigg/GetALLModuleShare`, options)
  }
  ContractApproval(values): Observable<any> {
    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),

    });
    
    let options = { headers: headers };
    return this.http.post<any>(`${environment.apiUrl}/api/ProjectSLCP/ContractApproval`, values, options)

  }

  downloadContract(id: number) {
    
    return this.http.get(`${environment.apiUrl}/api/ProjectSLCP/DownloadContract?id=${id}`, { responseType: 'blob' })

  }

  ContarctsSubmit(values): Observable<any> 
   
  {    let headers = new HttpHeaders({
  
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
     
  });
  let options = { headers: headers };
     return this.http.post<any>(`${environment.apiUrl}/api/ProjectHigg/ContractSubmit`,values,options)
   
  }
}