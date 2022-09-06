import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { AppConsts } from "@shared/AppConsts";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { LocationModel } from "../Dto/location-model";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl: string;

  private REST_API_SERVER = AppConsts.remoteServiceBaseUrl; 
  $isDataLoaded = new EventEmitter();

  constructor(
    private http: HttpClient) {  }

//   create(body: LocationModel| undefined) : Observable<any> {
//       
//    const content_ = JSON.stringify(body);

//        let options_: any = {
//            headers: new HttpHeaders({
//                "Content-Type": "application/json",
//                Accept: "text/plain",
//            }),
//        };
//      return this.http.post<any>(this.REST_API_SERVER + '/api/Location',content_, options_) 
//    }
   getlocations() : Observable<any> {
     return this.http.get<any>(`${environment.apiUrl}/api/Department`) 
   }
   getdepartments() : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/Department/GetDepartments`) 
  }

}