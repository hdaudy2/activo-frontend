import { result } from "lodash";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpResponse } from '@angular/common/http';
import { environment } from "../../environments/environment.prod";
import { ClientAuditVisitModel } from "../Dto/Client-Audit-Visit-model";
import { QCCommentsModel } from "@shared/Dto/QC-Comments-model";


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
    providedIn: 'root',

})

export class ClientAuditVisitService {

    private baseUrl: string;

    private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
    $isDataLoaded = new EventEmitter();

    constructor(
        private http: HttpClient
    ) { }
    DownloadAuditPlan(id: number) {

        return this.http.get(`${environment.apiUrl}/api/ClientAuditVisit/DownloadAuditPlan?id=${id}`, { responseType: 'blob' })

    }
    create(body: ClientAuditVisitModel | undefined): Observable<any> {

        const content_ = JSON.stringify(body);

        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            Accept: "text/plain",
        });
        let options = { headers: headers };
        // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
        return this.http.post<any>(`${environment.apiUrl}/api/ClientAuditVisit/Create`, content_, options)
    }
    CreateWithFile(values): Observable<any> {

        let headers = new HttpHeaders({
            //'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),

        });
        let options = { headers: headers };
        return this.http.post<any>(`${environment.apiUrl}/api/ClientAuditVisit/Create`, values, options)

    }
    Delete(id) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.post<any>(`${environment.apiUrl}/api/ClientAuditVisit/ClientAuditVisitDeleteById?id=${id}`, options)

    }

    GetClientAuditVisitBYId(id) {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.get<any>(`${environment.apiUrl}/api/ClientAuditVisit/GetClientAuditVisitBYId?id=${id}`, options);
    }

    GetPagedClientAuditVisitResponse(id, value): Observable<any> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };
        return this.http.post<any>(`${environment.apiUrl}/api/ClientAuditVisit/GetPagedClientAuditVisitResponse?id=${id}`, value, options);

    }
    GetALLVisitType(): Observable<any> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.get<any>(`${environment.apiUrl}/api/ClientAuditVisit/GetALLVisitType`, options)
    }
    GetALLVisitStatus(): Observable<any> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.get<any>(`${environment.apiUrl}/api/ClientAuditVisit/GetALLVisitStatus`, options)
    }

    
   
    GetAllProjectCode(): Observable<any> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.get<any>(`${environment.apiUrl}/api/ClientAuditVisit/GetAllProjectCode`, options)
    }
    GetProjectCodeById(id): Observable<any> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.get<any>(`${environment.apiUrl}/api/ClientAuditVisit/GetProjectCodeById?id=${id}`, options)
    }

    AuditPlan(id: number, value): Observable<any> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };
        return this.http.post<any>(`${environment.apiUrl}/api/ClientAuditVisit/AuditPlan?id=${id}`, value, options);

    }

    QCDocumentsList(id:number, value): Observable<any> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.post<any>(`${environment.apiUrl}/api/ClientAuditVisit/QCDocumentsList?id=${id}`, value , options );
    }
    QCHistory(id) {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.get<any>(`${environment.apiUrl}/api/ClientAuditVisit/QCHostory?id=${id}`, options);
    }
    AddComment(values: QCCommentsModel | undefined): Observable<any> {
        debugger

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.post<any>(`${environment.apiUrl}/api/ClientAuditVisit/AddComment`, values,options)

    }
    AddCommentList(values): Observable<any> {
        debugger

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.post<any>(`${environment.apiUrl}/api/ClientAuditVisit/AddCommentList`, values,options)

    }
    DeleteComment (id) { 
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            });
        let options = {headers : headers};
        
        return this.http.post<any>(`${environment.apiUrl}/api/ClientAuditVisit/QCCommentsDeleteById?id=${id}`,options)
        
      }
      AllQcStatus(): Observable<any> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.get<any>(`${environment.apiUrl}/api/ClientAuditVisit/GetAllQcStatus`, options)
    }

    GetAllAdminList(): Observable<any> {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };

        return this.http.get<any>(`${environment.apiUrl}/api/ClientAuditVisit/GetAllAdminList`, options)
    }

    GetAllTechnicalExpert(id: number): Observable<any> {
        debugger
                let headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
                });
                let options = { headers: headers };
        
                return this.http.get<any>(`${environment.apiUrl}/api/ClientAuditVisit/GetAllTechnicalExpert?id=${id}`, options)
        
            }


            GetALLVisitLevel(): Observable<any> {

                let headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
                });
                let options = { headers: headers };
        
                return this.http.get<any>(`${environment.apiUrl}/api/ClientAuditVisit/GetALLVisitLevel`, options)
            }
}
