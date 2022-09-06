// import { EventEmitter, Injectable, InjectionToken } from '@angular/core';
// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { BehaviorSubject, Observable } from 'rxjs';
// import { LibraryResourceModel } from '../Dto/Library-Resource_model';
// // import { SecUserPasswordModel } from '../Dto/sec-user-password-model';
//import { AppConsts } from "@shared/AppConsts";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { LibraryResourceModel } from "../Dto/Library-Resource_model";
import { BehaviorSubject, Observable } from "rxjs";
import {HttpResponse} from '@angular/common/http';
import { environment } from "environments/environment";
import { result } from "lodash";
//import {Http} from '@angular/http';


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
    providedIn: 'root',
    
  })

  export class LibraryResourceService 
  {

    private baseUrl: string;

    private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
    $isDataLoaded = new EventEmitter();
  
    constructor(
      private http: HttpClient
    ) { }
    private data = new BehaviorSubject<any>(Response);
    getMOdule() : Observable<any> 
    
    {
 
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
   
 return this.http.get<any>(`${environment.apiUrl}/api/LibraryResources/GetModule`,options) 
}
getStandard() : Observable<any> 
    
{

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
  let options = {headers : headers};

return this.http.get<any>(`${environment.apiUrl}/api/LibraryResources/GetStandard`,options) 
}
getdata(values,model) : Observable<any> 
    
{
  debugger

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
  let options = {headers : headers};

return this.http.post<any>(`${environment.apiUrl}/api/LibraryResources/getdata?model=`+model,values,options) 
}

EditGrn(id : number) : Observable<any>
{
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
  let options = {headers : headers};
   return this.http.get<any>(this.REST_API_SERVER+'/api/services/app/LibraryResources/GetGrnById?Id='+id, options);
}

getDoucmentType() : Observable<any> {
 
   
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
  let options = {headers : headers};
  return this.http.get<any>(`${environment.apiUrl}/api/LibraryResources/GetDocumentsType`,options) 
 }
 getStatus() : Observable<any> {
 
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
  let options = {headers : headers};
     
  return this.http.get<any>(`${environment.apiUrl}/api/LibraryResources/GetAllStatus`,options) 
 }
 getAllReviewer(id) : Observable<any> {
 
   
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
  let options = {headers : headers};
  return this.http.get<any>(`${environment.apiUrl}/api/LibraryResources/GetAllReviewer?id=${id}`,options) 
 }

 getAllCertification() : Observable<any> {
 
   
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
  let options = {headers : headers};
  return this.http.get<any>(`${environment.apiUrl}/api/LibraryResources/GetAllCertification`,options) 
 }
  //   Get(value): Observable<any>
  //   {
  //      
  //    let headers = new HttpHeaders({
  //      'Content-Type': 'application/json',
  //      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
  //    });
  //    let options = { headers: headers };
  //    return this.http.post<any>(${environment.apiUrl}/api/Product/GetPagedProductDenomination', value, options);
 
  //  }
 
 
     
   PostItemReturnListPagination(values): Observable<any> 
   
   { 
    let headers = new HttpHeaders({
     // 'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
    let options = {headers : headers};
      return this.http.post<any>(`${environment.apiUrl}/api/LibraryResources/CreateLibrary`,values,options)
    
   }

      update(body: LibraryResourceModel | undefined): Observable<any> 
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
  
    
      create(body: LibraryResourceModel | undefined) : Observable<any> {
          
       const content_ = JSON.stringify(body);
    
       let headers = new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          Accept: "text/plain",     
      });
     let options = { headers: headers };
     // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
         return this.http.post<any>(`${environment.apiUrl}/api/LibraryResources/CreateLibraryData`,content_,options) 
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
        return this.http.post<any>(`${environment.apiUrl}/api/LibraryResources/GetPagedLibrary`, value, options);
            
      }
      GetDocumentsByStandardId(id:number,value): Observable<any> {
          
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
        let options = { headers: headers };
        return this.http.post<any>(`${environment.apiUrl}/api/LibraryResources/GetDocumentsByStandardId?id=${id}`, value, options);
            
      }
      public download(id:number) {
        return this.http.get(`${environment.apiUrl}/api/LibraryResources/GetAllCertification?id=${id}`, {
            reportProgress: true,
            responseType: 'blob',
        });
    }
    downloadFile(id:number)
    {
      let headers = new HttpHeaders({
       
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
      return this.http.get(`${environment.apiUrl}/api/LibraryResources/download?id=${id}`,{responseType:'blob'})
   
    }

    Delete(id) { 
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
      
      return this.http.post<any>(`${environment.apiUrl}/api/LibraryResources/LibraryDeleteById?id=${id}`,options)
      
    }
  
  }