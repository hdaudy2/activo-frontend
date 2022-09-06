import { result } from "lodash";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { environment } from "../../environments/environment.prod";
//import { AccreditationModel } from "../Dto/Accreditation-model";


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
  providedIn: 'root',

})

export class DashboardService {

  private baseUrl: string;

  private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
  $isDataLoaded = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  GetDashboardData(id, value): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.post<any>(`${environment.apiUrl}/api/Dashboard/GetDashboardData?id=${id}`, value, options);
  }

  GetAllProjects(id: number, value): Observable<any> {

debugger
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    //  var id =localStorage.getItem('organizationId');
    return this.http.post<any>(`${environment.apiUrl}/api/Client/GetPagedAllProject?id=${id}`, value, options);

  }
  GetAllAudits(id, value): Observable<any> {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    //  var id =localStorage.getItem('organizationId');
    return this.http.post<any>(`${environment.apiUrl}/api/Client/GetPagedAllAudits?id=${id}`, value, options);

  }

}
