import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { AppConsts } from "@shared/AppConsts";
import { BehaviorSubject, Observable } from "rxjs";
import { RoleFormModel } from "../Dto/role-form-model";
import { SecRoleFormModel } from "../Dto/sec-role-form-model";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class RoleFormService {
  private baseUrl: string;

  private REST_API_SERVER = AppConsts.remoteServiceBaseUrl; 
  $isDataLoaded = new EventEmitter();

  constructor(
    private http: HttpClient ,
    @Optional() @Inject(API_BASE_URL) baseUrl?:string
    ) { 
      this.baseUrl = baseUrl ? baseUrl : "";
    }
    private data = new BehaviorSubject<any>(Response);

     setRolesWithPermission(data: any) {
      //  
       this.data.next(data);
      
      //  setTimeout(() => {
      //    this.data.next(null);
      //  }, 200);
     }
 
     getRolesWithPermission() {
    
       return this.data.asObservable();
     }

  create(body: SecRoleFormModel| undefined) : Observable<any> {
    
   const content_ = JSON.stringify(body);

       let options_: any = {
           headers: new HttpHeaders({
               "Content-Type": "application/json",
               Accept: "text/plain",
           }),
       };
     return this.http.post<any>(this.REST_API_SERVER + '/api/SecRole/CreatePermissions',content_, options_) 
   }
  update(body: SecRoleFormModel | undefined) : Observable<any> {
    const content_ = JSON.stringify(body);
  
        let options_: any = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                Accept: "text/plain",
            }),
        };
      return this.http.put<any>(this.REST_API_SERVER + '/api/SecRole/UpdateSecRoleForm',content_, options_) 
    }
  GetPagedRoles(value): Observable<any> {
      
  let headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });
  let options = { headers: headers };
  return this.http.post<any>(this.REST_API_SERVER + '/api/SecRole/GetPagedRoles', value, options);
      
}
   getroles(id:number) : Observable<any> {
 
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });
  let options = { headers: headers };
       
     return this.http.get<any>(this.REST_API_SERVER + '/api/SecRole/GetSecRole?id='+ id,options) 
   }
   getUserType(id:number) : Observable<any> {
 
    //  headers: new HttpHeaders({
    //      "Content-Type": "application/json",
    //      Accept: "text/plain",
    //  });
    //  let options = { headers: headers };
 
return this.http.get<any>(this.REST_API_SERVER + '/api/SecRole/GetUserType?id='+ id) 
}
   Get(pageNumber, pageSize) : Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });
  let options = { headers: headers };
return this.http.get<any>(this.REST_API_SERVER + '/api/SecRole?pageNumber='+ pageNumber  + '&pageSize=' + pageSize , options); 
}
GetAll(pageNumber, pageSize) : Observable<any> {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
});
let options = { headers: headers };
return this.http.get<any>(this.REST_API_SERVER + '/api/SecRole/GetAllSecForm?pageNumber='+ pageNumber  + '&pageSize=' + pageSize , options); 
}

GetAllPermissions() : Observable<any> {
  return this.http.get<any>(this.REST_API_SERVER + '/api/SecRole/GetSecRolePermission') 
}
GetPermissionsById(id : number) : Observable<any>
{
  
  let headers = new HttpHeaders({
    "Content-Type": "application/json",
});
let options = { headers: headers };
   return this.http.get<any>(this.REST_API_SERVER+'/api/SecRole/GetById?id='+ id, options);
}

createSecRoleForm(body: SecRoleFormModel | undefined) : Observable<any> {
  
 const content_ = JSON.stringify(body);

     let options_: any = {
         headers: new HttpHeaders({
             "Content-Type": "application/json",
             Accept: "text/plain",
         }),
     };
   return this.http.post<any>(this.REST_API_SERVER + '/api/SecRole/CreatePermissions',content_, options_) 
 }
 authorizeRole(id,Remarks){
  
 let headers = new HttpHeaders({
   "Content-Type": "application/json",
});
let options = { headers: headers };
 return this.http.post<any>(this.REST_API_SERVER+'/api/SecRole/Authorize?id='+ id + '&Remarks=' + Remarks, options);

}


rejectRole(id,Remarks){
 let headers = new HttpHeaders({
   "Content-Type": "application/json",
});
let options = { headers: headers };
 return this.http.post<any>(this.REST_API_SERVER+'/api/SecRole/Reject?id='+ id + '&Remarks=' + Remarks, options);

}


}