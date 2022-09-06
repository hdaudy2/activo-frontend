import { result } from "lodash";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { environment } from "../../environments/environment.prod";
import { ProjectAmountModel } from "../Dto/Project-Amount-model";


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
  providedIn: 'root',

})

export class ProjectAmountService {

  private baseUrl: string;

  private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
  $isDataLoaded = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  create(body: ProjectAmountModel | undefined) : Observable<any> {
    
 const content_ = JSON.stringify(body);

 let headers = new HttpHeaders({
  "Content-Type": "application/json",
  'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    Accept: "text/plain",     
});
let options = { headers: headers };
   return this.http.post<any>(`${environment.apiUrl}/api/ProjectAmount/Create`,content_,options) 
 }


  getAllCertification(): Observable<any> {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/LibraryResources/GetAllCertification`, options)
  }

  

  getAllAgency() : Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
    let options = {headers : headers};
    return this.http.get<any>(`${environment.apiUrl}/api/ProjectAmount/getAllAgency`,options) 
   }




  Delete(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    
    return this.http.post<any>(`${environment.apiUrl}/api/ProjectAmount/ProjectAmountDeleteById?id=${id}`, options)

  }

  GetProjectAmountById(id) {
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/ProjectAmount/GetProjectAmountDataById?id=${id}`, options);
  }

  Get(value): Observable<any> {
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.post<any>(`${environment.apiUrl}/api/ProjectAmount/GetPagedProjectAmount`, value, options);

  }

}