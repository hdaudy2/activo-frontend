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

  export class IsoService 
  {

    private baseUrl: string;

    
    $isDataLoaded = new EventEmitter();
  
    constructor(
      private http: HttpClient
    ) { }
    private data = new BehaviorSubject<any>(Response);
  
     
    ProjectIsoCreateWithFile(values): Observable<any> 
   
    {   
      
      let headers = new HttpHeaders({
        //'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
       
    });
    let options = { headers: headers };
       return this.http.post<any>(`${environment.apiUrl}/api/ProjectISO/ProjectIsoCreateWithFile`,values,options)
     
    }
//     GeClientDatabyId(id)
        
        
//     { 
//        
//      let headers = new HttpHeaders({
//        'Content-Type': 'application/json',
//        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
//    });
//    let options = { headers: headers };
//    return this.http.get<any>(`${environment.apiUrl}/api/Client/GetClientDataById?id=${id}`,options);
// }
   
    GetAllVerificationType() : Observable<any> {
 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectISO/GetAllVerificationType`,options) 
       }
       GetAllProjectType() : Observable<any> {
 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectISO/GetAllProjectType`,options) 
       }
     
       GetALLServicesType() : Observable<any> {
 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectISO/GetALLServicesType`,options) 
       }
      
       
       GetALLAccreditation() : Observable<any> {
 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectISO/GetALLAccreditation`,options) 
       }

       GetALLStageCertification() : Observable<any> {
 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectISO/GetALLStageCertification`,options) 
       }
     
       GetAllClientSites(id:number) : Observable<any> {
 
        let headers = new HttpHeaders({
            
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectISO/GetAllClientSites?id=${id}`,options) 
       }
     

       GetProjectISOBYId(id)
       {
         
         let headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
       });
       let options = { headers: headers };
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectISO/GetProjectIsoBYId?id=${id}`,options);
            }
    

   
     
     
    
  
    downloadApplicationForm(id:number)
    {
      
      return this.http.get(`${environment.apiUrl}/api/ProjectISO/DownloadApplicationForm?id=${id}`,{responseType:'blob'})
    
    }
    

    GetProjectRemarks(value): Observable<any> {
       
    let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    
    return this.http.post<any>(`${environment.apiUrl}/api/ProjectISO/GetPagedPrjectRemarks`,value,options);
    // return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);
       
    }
    
    GetALLProjectStatus(id)
    {
      
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
     return this.http.get<any>(`${environment.apiUrl}/api/ProjectISO/GetALLProjectStatus?id=${id}`,options);
         }

         ApprovedProject(values): Observable<any> 
   
         { 
          let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };
    
            return this.http.post<any>(`${environment.apiUrl}/api/ProjectISO/CreateApproval`,values)
          
         }


         SubmitForReview(id: number) : Observable<any>
   
         {   

          var loginUserId =localStorage.getItem('userId');
         
           let headers = new HttpHeaders({
             
             'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
         });
         let options = { headers: headers };
         
          // var Id =localStorage.getItem('organizationId');
         return this.http.post<any>(`${environment.apiUrl}/api/ProjectISO/SubmitForReview?id=${id}`,parseInt(loginUserId),options);
         }

         DeleteProject(id) { 
          let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
          
          return this.http.post<any>(`${environment.apiUrl}/api/ProjectISO/ProjectISODeleteById?id=${id}`,options)
          
        }

        // GetALLModuleVersion(id) : Observable<any> {
 
        //     let headers = new HttpHeaders({
        //         'Content-Type': 'application/json',
        //         'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        //           });
        //       let options = {headers : headers};
             
        //     return this.http.get<any>(`${environment.apiUrl}/api/ProjectISO/GetALLModuleVersion?id=${id}`,options) 
        //    }
        //    GetALLModuleShare() : Observable<any> {
 
        //     let headers = new HttpHeaders({
        //         'Content-Type': 'application/json',
        //         'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        //           });
        //       let options = {headers : headers};
             
        //     return this.http.get<any>(`${environment.apiUrl}/api/ProjectSLCP/GetALLModuleShare`,options) 
        //    }


           GetAllLeadAuditor(values) : Observable<any> {
            
                   let headers = new HttpHeaders({
                       
                       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
                         });
                     let options = {headers : headers};
                    
                   return this.http.post<any>(`${environment.apiUrl}/api/Client/GetAuditorByStandardId`,values,options) 
                  }

                  ContarctsSubmit(values): Observable<any> 
   
                  {    let headers = new HttpHeaders({
                  
                    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
                     
                  });
                  let options = { headers: headers };
                     return this.http.post<any>(`${environment.apiUrl}/api/ProjectISO/ContractSubmit`,values,options)
                   
                  }
                  
                  ContractApproval(values): Observable<any> 
   
                  {    let headers = new HttpHeaders({
                  
                    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
                     
                  });
                  
                  let options = { headers: headers };
                     return this.http.post<any>(`${environment.apiUrl}/api/ProjectISO/ContractApproval`,values,options)
                   
                  }

                  downloadContract(id:number)
    {
      
      return this.http.get(`${environment.apiUrl}/api/ProjectISO/DownloadContract?id=${id}`,{responseType:'blob'})
    
    }
  }