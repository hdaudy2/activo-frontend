
import { result } from "lodash";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { environment } from "../../environments/environment.prod";
import { ProjectLedgerModel } from "../Dto/Project-Ledger-model";
import { ProjectLedgerDetailModel } from "@shared/Dto/Project-Ledger-Detail-model";


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
  providedIn: 'root',

})

export class ProjectAmountReportsService {

  private baseUrl: string;

  private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
  $isDataLoaded = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }



  Get(value): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.post<any>(`${environment.apiUrl}/api/ProjectAmountReports/GetPagedProjectLedger`, value, options);

  }

  GetAllPayments(id:number,value): Observable<any> {
    
        
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

     // var Id =localStorage.getItem('organizationId');
    return this.http.post<any>(`${environment.apiUrl}/api/ProjectAmountReports/GetPagedProjectLedgerDetail?id=${id}`, value, options);
        
  }
  create(body: ProjectLedgerDetailModel | undefined) : Observable<any> {
        
    const content_ = JSON.stringify(body);
 
    let headers = new HttpHeaders({
     "Content-Type": "application/json",
     'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
       Accept: "text/plain",     
   });
  let options = { headers: headers };
  // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
      return this.http.post<any>(`${environment.apiUrl}/api/ProjectAmountReports/Create`,content_,options) 
    }
  // GetDetail(value): Observable<any> {

  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
  //   });
  //   let options = { headers: headers };
  //   return this.http.post<any>(`${environment.apiUrl}/api/ProjectAmountReports/GetPagedProjectLedger`, value, options);

  // }

  UCreate(values): Observable<any> {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.post<any>(`${environment.apiUrl}/api/ProjectAmountReports/UCreate`, values)

  }

  Delete(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.post<any>(`${environment.apiUrl}/api/ProjectAmountReports/ProjectAmountReportsDeleteById?id=${id}`, options)

  }
  getAllAgency(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/ProjectAmountReports/getAllAgency`, options)
  }

  getAllCertification(): Observable<any> {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/LibraryResources/GetAllCertification`, options)
  }


}