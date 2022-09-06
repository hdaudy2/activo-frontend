import { result } from "lodash";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { BehaviorSubject, Observable } from "rxjs";
import {HttpResponse} from '@angular/common/http';
import { environment } from "../../environments/environment.prod";
import { CityModel } from "@shared/Dto/city-model";
import { QueryParamModel } from "@shared/interface/QueryParam.interface";
import { QueryParamObjToUrl } from "@shared/utility/queryParamFormatter.utility";


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
    providedIn: 'root',
    
  })

  export class CityService 
  {

    private baseUrl: string;

    private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
    $isDataLoaded = new EventEmitter();
  
    constructor(
      private http: HttpClient
    ) { }

    create(body: CityModel | undefined) : Observable<any> {
        
     const content_ = JSON.stringify(body);
  
     let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        Accept: "text/plain",     
    });
   let options = { headers: headers };
   // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
       return this.http.post<any>(`${environment.apiUrl}/api/City/Create`,content_,options) 
     }

     Delete(id) { 
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
      
      return this.http.post<any>(`${environment.apiUrl}/api/City/CityDeleteById?id=${id}`,options)
      
    }

     GetCityById(id)
     {
       
       let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
      return this.http.get<any>(`${environment.apiUrl}/api/City/GetCityDataById?id=${id}`,options);
          }

     Get(value): Observable<any> {
        
      let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
      let options = { headers: headers };
      return this.http.post<any>(`${environment.apiUrl}/api/City/GetPagedCity`, value, options);
          
    }

    GetAllCities(queryParams?: QueryParamModel[]): Promise<CityModel[]> {
      let params: string = QueryParamObjToUrl(queryParams);
  
      const URL: string = `${environment.apiUrl}/api/City/Get${params}`;
      return this.http.get<CityModel[]>(URL).toPromise();
    }

    }
