// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
// import { AppConsts } from "../AppConsts";
// import { LibraryResourceModel } from "../Dto/Library-Resource_model";
// import { BehaviorSubject, Observable } from "rxjs";
// import {HttpResponse} from '@angular/common/http';
//  import { environment } from "environments/environment";
import { result } from "lodash";
//import {Http} from '@angular/http';


import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { LibraryResourceModel } from "../Dto/Library-Resource_model";
import { BehaviorSubject, Observable } from "rxjs";
import {HttpResponse} from '@angular/common/http';
import { environment } from "../../environments/environment.prod";
import { StandardModel } from "../Dto/standard-model";


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
    providedIn: 'root',
    
  })

  export class StandardService 
  {

    private baseUrl: string;

    private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
    $isDataLoaded = new EventEmitter();
  
    constructor(
      private http: HttpClient
    ) { }

    create(body: StandardModel | undefined) : Observable<any> {
        
     const content_ = JSON.stringify(body);
  
     let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        Accept: "text/plain",     
    });
   let options = { headers: headers };
   // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
       return this.http.post<any>(`${environment.apiUrl}/api/Standard/Create`,content_,options) 
     }

     GetStandardById(id)
       {
         
     
        return this.http.get<any>(`${environment.apiUrl}/api/Standard/GetStandardDataById?id=${id}`);
            }

     Get(value): Observable<any> {
          
      let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
      let options = { headers: headers };
      
      return this.http.post<any>(`${environment.apiUrl}/api/Standard/GetPagedStandard`,value,options);
     // return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);
          
    }

  //   private data = new BehaviorSubject<any>(Response);
  //   getSecRoleForm() {
  //     
  //   this.data.next(JSON.parse(localStorage.getItem('secRoleForm')))
  //   return this.data.asObservable()
  // }


    SampleGet(value): Observable<any> {
       
   let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   });
   let options = { headers: headers };
   
   return this.http.post<any>(`${environment.apiUrl}/api/Standard/GetPagedStandard`,value,options);
   //return this.http.post<any>(`${environment.apiUrl}/api/Standard/GetPagedStandard`,value,options);
  // return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);
       
 }
 Delete(id) { 
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
  let options = {headers : headers};
  
  return this.http.post<any>(`${environment.apiUrl}/api/Standard/StandardDeleteById?id=${id}`,options)
  
}
  }
