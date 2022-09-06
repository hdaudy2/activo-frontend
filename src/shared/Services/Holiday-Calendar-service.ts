import { result } from "lodash";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { BehaviorSubject, Observable } from "rxjs";
import {HttpResponse} from '@angular/common/http';
import { environment } from "../../environments/environment.prod";
import { HolidayCalendarModel } from "../Dto/Holiday-Calendar-model";


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
    providedIn: 'root',
    
  })

  export class HolidayCalendarService 
  {

    private baseUrl: string;

    private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
    $isDataLoaded = new EventEmitter();
  
    constructor(
      private http: HttpClient
    ) { }

    create(body: HolidayCalendarModel | undefined) : Observable<any> {
        
     const content_ = JSON.stringify(body);
  
     let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        Accept: "text/plain",     
    });
   let options = { headers: headers };
   // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
       return this.http.post<any>(`${environment.apiUrl}/api/HolidayCalendar/Create`,content_,options) 
     }

     Delete(id) { 
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
      
      return this.http.post<any>(`${environment.apiUrl}/api/HolidayCalendar/HolidayCalendarDeleteById?id=${id}`,options)
      
    }

     GetHolidayCalendarById(id)
     {
       
       let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
      
      return this.http.get<any>(`${environment.apiUrl}/api/HolidayCalendar/GetHolidayCalendarDataById?id=${id}`,options);
          }

     Get(value): Observable<any> {
        
      let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
      let options = { headers: headers };
      return this.http.post<any>(`${environment.apiUrl}/api/HolidayCalendar/GetPagedHolidayCalendar`, value, options);
          
    }

    GetAllHolidayTypeList() : Observable<any> {
 
      let headers = new HttpHeaders({
         
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            });
        let options = {headers : headers};
       
      return this.http.get<any>(`${environment.apiUrl}/api/HolidayCalendar/GetAllHolidayTypeList`,options) 
     }

    }
