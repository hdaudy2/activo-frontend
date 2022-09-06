import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { LibraryResourceModel } from "../Dto/Library-Resource_model";
import { BehaviorSubject, Observable } from "rxjs";
import {HttpResponse} from '@angular/common/http';
import { environment } from "environments/environment";
import { result } from "lodash";
import { ClientModel } from "../Dto/Client-model";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
    providedIn: 'root',
    
  })

  export class ClientService 
  {

    private baseUrl: string;

    private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
    $isDataLoaded = new EventEmitter();
  
    constructor(
      private http: HttpClient
    ) { }
    private data = new BehaviorSubject<any>(Response);
  
     
    
      create(body: ClientModel | undefined) : Observable<any> {
          
       const content_ = JSON.stringify(body);
    
       let headers = new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          Accept: "text/plain",     
      });
     let options = { headers: headers };
     return this.http.post<any>(`${environment.apiUrl}/api/Client/CreateClient`,content_,options)
    
       }
     
       Deleteuser(id) { 
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            });
        let options = {headers : headers};
        
        return this.http.post<any>(`${environment.apiUrl}/api/Client/ClientDeleteById?id=${id}`,options)
        
      }
  
      //  }
      Get(value): Observable<any> {
    
        
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };
  
          var id =parseInt(localStorage.getItem('organizationId'));
        return this.http.post<any>(`${environment.apiUrl}/api/Client/GetPagedClient?id=${id}`, value, options);
            
      }
      //  Get(value): Observable<any> {
          
      //   let headers = new HttpHeaders({
      //       'Content-Type': 'application/json',
      //       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      //   });
      //   let options = { headers: headers };
      //   return this.http.post<any>(`${environment.apiUrl}/api/LibraryResources/GetPagedLibrary`, value, options);
            
      // }
  
      GeClientDatabyId(id)
        
        
         { 
            
          let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };
        return this.http.get<any>(`${environment.apiUrl}/api/Client/GetClientDataById?id=${id}`,options);
      }
      GeClientDatabyPromiseId(id)
      {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };
        return this.http.get(`${environment.apiUrl}/api/Client/GetClientDataById?id=${id}`, options).toPromise();
      }
     GeClientfullDatabyId(id)
        
        
     { 
        
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/Client/GeClientfullDatabyId?id=${id}`,options);
 }

     ClienSitesCreate(values): Observable<any> 
   
     { 
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

        return this.http.post<any>(`${environment.apiUrl}/api/Client/CreateClientSites`,values)
      
     }

     GetClientSitesData(value): Observable<any> {
    
      let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
      let options = { headers: headers };

       // var Id =localStorage.getItem('organizationId');
      return this.http.post<any>(`${environment.apiUrl}/api/Client/GetPagedClientSites`, value, options);
          
    }
    GetSiteById(id): Observable<any> {
    
      let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
      let options = { headers: headers };

       // var Id =localStorage.getItem('organizationId');
      return this.http.get<any>(`${environment.apiUrl}/api/Client/GetSiteById?id=${id}`, options);
          
    }
    
    DeleteSite(id) { 
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
      
      return this.http.post<any>(`${environment.apiUrl}/api/Client/ClientSitesDeleteById?id=${id}`,options)
      
    }



      //  }
      GetAllProjects(id:number,value): Observable<any> {
    
        
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };
  
         // var Id =localStorage.getItem('organizationId');
        return this.http.post<any>(`${environment.apiUrl}/api/Client/GetPagedClientAllProject?id=${id}`, value, options);
            
      }

      

      GetProjectFormUrlById(id:number) { 
        let headers = new HttpHeaders({
         
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            });
        let options = {headers : headers};
        
        return this.http.get<any>(`${environment.apiUrl}/api/Client/GetProjectFormUrlById?id=${id}`,options)
        
      }

      getClients() : Observable<any> {
 
   
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
            });
        let options = {headers : headers};
        return this.http.get<any>(`${environment.apiUrl}/api/Client/GetALLClients`,options) 
       }
  }