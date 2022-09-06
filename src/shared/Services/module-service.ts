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
import { ModuleModel } from "../Dto/Module-model";


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
    providedIn: 'root',
    
  })

  export class ModuleService 
  {

    private baseUrl: string;

    private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
    $isDataLoaded = new EventEmitter();
  
    constructor(
      private http: HttpClient
    ) { }

    create(body: ModuleModel | undefined) : Observable<any> {
        
     const content_ = JSON.stringify(body);
  
     let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        Accept: "text/plain",     
    });
   let options = { headers: headers };
   // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
       return this.http.post<any>(`${environment.apiUrl}/api/Module/Create`,content_,options) 
     }

     GetModuleById(id)
       {
         
     
        return this.http.get<any>(`${environment.apiUrl}/api/Module/GetModuleDataById?id=${id}`);
            }

     Get(value): Observable<any> {
          
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };
        return this.http.post<any>(`${environment.apiUrl}/api/Module/GetPagedModule`, value, options);
            
      }
      Delete(id) { 
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            });
        let options = {headers : headers};
        
        return this.http.post<any>(`${environment.apiUrl}/api/Module/ModuleDeleteById?id=${id}`,options)
        
      }
  }
