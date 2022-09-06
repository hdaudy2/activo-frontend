import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { AppConsts } from "@shared/AppConsts";
import { Observable } from "rxjs";
import { LocationModel } from "../Dto/location-model";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl: string;

  private REST_API_SERVER = AppConsts.remoteServiceBaseUrl; 
  $isDataLoaded = new EventEmitter();

  constructor(
    private http: HttpClient ,
    @Optional() @Inject(API_BASE_URL) baseUrl?:string
    ) { 
      this.baseUrl = baseUrl ? baseUrl : "";
    }

  create(body: LocationModel| undefined) : Observable<any> {
      
   const content_ = JSON.stringify(body);

       let options_: any = {
           headers: new HttpHeaders({
               "Content-Type": "application/json",
               Accept: "text/plain",
           }),
       };
     return this.http.post<any>(this.REST_API_SERVER + '/api/Location',content_, options_) 
   }
   
   getlocations() : Observable<any> {
       
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
          
     return this.http.get<any>(this.REST_API_SERVER + '/api​/Location​', options) ;
   }

}