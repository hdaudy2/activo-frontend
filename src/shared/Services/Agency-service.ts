import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { LibraryResourceModel } from "../Dto/Library-Resource_model";
import { BehaviorSubject, Observable } from "rxjs";
import {HttpResponse} from '@angular/common/http';
import { environment } from "environments/environment";
import { result } from "lodash";
import { AgencyModel } from "../Dto/Agency-model";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
    providedIn: 'root',
    
  })

  export class AgencyService 
  {

    private baseUrl: string;

    private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
    $isDataLoaded = new EventEmitter();
  
    constructor(
      private http: HttpClient
    ) { }
    private data = new BehaviorSubject<any>(Response);
  
      update(body: AgencyModel | undefined): Observable<any> 
      {
        const content_ = JSON.stringify(body);
        let options_: any = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            Accept: "text/plain",
          }),
        };
        return this.http.put<any>(`${environment.apiUrl}/api/LibraryResources/UpdateLibrary`, content_, options_)
      }
  
    
      create(body: AgencyModel | undefined) : Observable<any> {
          
       const content_ = JSON.stringify(body);
    
       let headers = new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          Accept: "text/plain",     
      });
     let options = { headers: headers };
     return this.http.post<any>(`${environment.apiUrl}/api/Agency/CreateAgency`,content_,options)
     // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
        //  return this.http.post<any>(`${environment.apiUrl}​/api/Agency/CreateAgency`,content_,options) 
       }
       GetLibraryById(id)
       {
         
         let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            });
        let options = {headers : headers};
        
     
        return this.http.get<any>(`${environment.apiUrl}/api/LibraryResources/GetLibraryDataById?id=${id}`,options);
            }

      //  createData(value): Observable<any>{
      //     
      // // const content_ = JSON.stringify(body);
    
      // //  let headers = new HttpHeaders({
      // //   "Content-Type": "application/json",
      // //   'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      // //    Accept: "text/plain",     
      // // });
      // // let options = { headers: headers };
      //    return this.http.post<any>(${environment.apiUrl}/api/LibraryResources/CreateLibrary',values) 
      //  }
      Get(value): Observable<any> {
    
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };
  
         // var Id =localStorage.getItem('organizationId');
        return this.http.post<any>(`${environment.apiUrl}/api/Agency/GetPagedAgency`, value, options);
            
      }
      //  Get(value): Observable<any> {
          
      //   let headers = new HttpHeaders({
      //       'Content-Type': 'application/json',
      //       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      //   });
      //   let options = { headers: headers };
      //   return this.http.post<any>(`${environment.apiUrl}/api/LibraryResources/GetPagedLibrary`, value, options);
            
      // }
      public download(id:number) {
        return this.http.get(`${environment.apiUrl}/api/LibraryResources/GetAllCertification?id=${id}`, {
            reportProgress: true,
            responseType: 'blob',
        });
    }
    downloadFile(id:number)
    {
      return this.http.get(`${environment.apiUrl}/api/LibraryResources/download?id=${id}`,{responseType:'blob'})
   
    }
    GeAgencyDatabyId(id)
{
  
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
  let options = {headers : headers};
  
 return this.http.get<any>(`${environment.apiUrl}/api/Agency/GetAgencyDataById?id=${id}`,options);
     }
     DeleteAgency(id) { 
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
      
      return this.http.post<any>(`${environment.apiUrl}/api/Agency/AgencyDeleteById?id=${id}`,options)
      
    }
  
  }