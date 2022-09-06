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

  export class SA8000Service 
  {

    private baseUrl: string;

    
    $isDataLoaded = new EventEmitter();
  
    constructor(
      private http: HttpClient
    ) { }
    private data = new BehaviorSubject<any>(Response);
  
     
    CreateSA8000WithFile(values): Observable<any> 
   
    {    let headers = new HttpHeaders({
    
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
       
    });
    let options = { headers: headers };
       return this.http.post<any>(`${environment.apiUrl}/api/ProjectSA/ProjectSA8000CreateWithFile`,values,options)
     
    }
    
    GetAllRisk() : Observable<any> {
 
      let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            });
        let options = {headers : headers};
       
      return this.http.get<any>(`${environment.apiUrl}/api/ProjectSA/GetAllRisk`,options) 
     }
    GetAllVerificationType() : Observable<any> {
 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectSA/GetAllVerificationType`,options) 
       }
       GetAllProjectType() : Observable<any> {
 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectSA/GetAllProjectType`,options) 
       }
       GetAllConsultantList(id:number) : Observable<any> {
 
        let headers = new HttpHeaders({
           
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectSA/GetAllConsultantList?id=${id}`,options) 
       }
       GetAllAccreditation() : Observable<any> {
 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectSA/GetAllAccreditation`,options) 
       }
       SurveillanceVisitFrequencyList() : Observable<any> {
 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectSA/SurveillanceVisitFrequencyList`,options) 
       }

       GetALlExpences() : Observable<any> {
 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectSA/GetALlExpences`,options) 
       }

       GetALlSurveillanceMethod() : Observable<any> {
 
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectSA/GetALlSurveillanceMethod`,options) 
       }
       GetAllClientSites(id:number) : Observable<any> {
 
        let headers = new HttpHeaders({
            
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
         
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectSA/GetAllClientSites?id=${id}`,options) 
       }
     

       GetProjectSA8000BYId(id)
       {
         
         let headers = new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
       });
       let options = { headers: headers };
        return this.http.get<any>(`${environment.apiUrl}/api/ProjectSA/GetProjectSA8000BYId?id=${id}`,options);
            }
       GetLibraryById(id)
       {
         
     
        return this.http.get<any>(`${environment.apiUrl}/api/LibraryResources/GetLibraryDataById?id=${id}`);
            }

   
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
    downloadApplicationForm(id:number)
    {
      
      return this.http.get(`${environment.apiUrl}/api/ProjectSA/DownloadApplicationForm?id=${id}`,{responseType:'blob'})
    
    }
     DeleteAgency(id) { 
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
      
      return this.http.post<any>(`${environment.apiUrl}/api/Agency/AgencyDeleteById?id=${id}`,options)
      
    }

    GetProjectRemarks(value): Observable<any> {
       
    let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    
    return this.http.post<any>(`${environment.apiUrl}/api/ProjectSA/GetPagedPrjectRemarks`,value,options);
    // return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);
       
    }
    
    GetALLProjectStatus(id)
    {
      
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
     return this.http.get<any>(`${environment.apiUrl}/api/ProjectSA/GetALLProjectStatus?id=${id}`,options);
         }

         ApprovedProject(values): Observable<any> 
   
         { 
          let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };
    
            return this.http.post<any>(`${environment.apiUrl}/api/ProjectSA/CreateApproval`,values)
          
         }


         SubmitForReview(id: number) : Observable<any>
   
         {   

          var loginUserId =localStorage.getItem('userId');
         
           let headers = new HttpHeaders({
             
             'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
         });
         let options = { headers: headers };
         
          // var Id =localStorage.getItem('organizationId');
         return this.http.post<any>(`${environment.apiUrl}/api/ProjectSA/SubmitForReview?id=${id}`,parseInt(loginUserId),options);
         }
         downloadContract(id: number) {
          
          return this.http.get(`${environment.apiUrl}/api/ProjectSA/DownloadContract?id=${id}`, { responseType: 'blob' })
      
        }

         DeleteProject(id) { 
          let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
              });
          let options = {headers : headers};
          
          return this.http.post<any>(`${environment.apiUrl}/api/ProjectSA/ProjectSA8000DeleteById?id=${id}`,options)
          
        }

        ContarctsSubmit(values): Observable<any> 
   
         {    
           let headers = new HttpHeaders({
         
           'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            
         });
         let options = { headers: headers };
            return this.http.post<any>(`${environment.apiUrl}/api/ProjectSA/ContractSubmit`,values,options)
          
         }
         ContractApproval(values): Observable<any> {
          let headers = new HttpHeaders({
      
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      
          });
          
          let options = { headers: headers };
          return this.http.post<any>(`${environment.apiUrl}/api/ProjectSLCP/ContractApproval`, values, options)
      
        }
       
  }