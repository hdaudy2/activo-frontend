
import { result } from "lodash";



import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { LibraryResourceModel } from "../Dto/Library-Resource_model";
import { BehaviorSubject, Observable } from "rxjs";
import {HttpResponse} from '@angular/common/http';
import { environment } from "../../environments/environment.prod";
import { UserStandardModel } from "@shared/Dto/Userstandard-model";
import { UserConsultancyModel } from "@shared/Dto/user-consultancy-model";
import { UserAuditModel } from "@shared/Dto/user-audit-model";
import { UserAuditorNaceModel } from "@shared/Dto/User-Auditor-Nace";



export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


@Injectable({
    providedIn: 'root',
    
  })

  export class UserStandardService 
  {

    private baseUrl: string;

    private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
    $isDataLoaded = new EventEmitter();
  
    constructor(
      private http: HttpClient
    ) { }

//     create(body: StandardModel | undefined) : Observable<any> {
//         
//      const content_ = JSON.stringify(body);
  
//      let headers = new HttpHeaders({
//       "Content-Type": "application/json",
//       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
//         Accept: "text/plain",     
//     });
//    let options = { headers: headers };
//    // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
//        return this.http.post<any>(`${environment.apiUrl}/api/SecUser/CreateUserStandard`,content_,options) 
//      }

downloadFile(id:number)
{
  return this.http.get(`${environment.apiUrl}/api/SecUser/DownloadAcademic?id=${id}`,{responseType:'blob'})

}
downloadProfessionaldocuments(id:number)
{
  
  return this.http.get(`${environment.apiUrl}/api/SecUser/DownloadProfessional?id=${id}`,{responseType:'blob'})

}
downloadCPDdocuments(id:number)
{
  
  return this.http.get(`${environment.apiUrl}/api/SecUser/DownloadCPD?id=${id}`,{responseType:'blob'})

}

DownloadConfidentially(id:number)
{
  
  return this.http.get(`${environment.apiUrl}/api/SecUser/DownloadConfidentially?id=${id}`,{responseType:'blob'})

}
DownloadContract(id:number)
{
  
  return this.http.get(`${environment.apiUrl}/api/SecUser/DownloadContractFile?id=${id}`,{responseType:'blob'})

}
DownloadImage(id:number)
{
  
  return this.http.get(`${environment.apiUrl}/api/SecUser/DownloadImage?id=${id}`,{responseType:'blob'})

}
// create(body: UserStandardModel | undefined) : Observable<any> {
    
//  const content_ = JSON.stringify(body);

//  let headers = new HttpHeaders({
//   "Content-Type": "application/json",
//   'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
//     Accept: "text/plain",     
// });
// let options = { headers: headers };
// return this.http.post<any>(`${environment.apiUrl}/api/SecUser/CreateUserStandard`,content_,options) 

//  }


     CreateUserStandard(values): Observable<any> { 
      
     
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
         'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
           
       });
      let options = { headers: headers };
      // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
          return this.http.post<any>(`${environment.apiUrl}/api/SecUser/CreateUserStandard`,values,options) 
          
        }
        
   
     GetUserStandardById(id)
       {
         
     
        return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetUserStandardById?id=${id}`);
            }

     Get(value): Observable<any> {
          
      let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
      let options = { headers: headers };
      
      return this.http.post<any>(`${environment.apiUrl}/api/SecUser/GetPagedUserStandard`,value,options);
     // return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);
          
    }
    

  //   private data = new BehaviorSubject<any>(Response);
  //   getSecRoleForm() {
  //     
  //   this.data.next(JSON.parse(localStorage.getItem('secRoleForm')))
  //   return this.data.asObservable()
  // }


  
 Delete(id) { 
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      });
  let options = {headers : headers};
  
  return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserStandardDeleteById?id=${id}`,options)
  
}

getAllAuditorTypes(id) : Observable<any> {
 
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
     
    return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetAllAuditorType?id=${id}`,options) 
   }
   getAllCourseTypes() : Observable<any> {
 
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
     
    return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetAllCourseType`,options) 
   }
   getAllApprovalStatus() : Observable<any> {
 
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
     
    return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetAllApprovalStatus`,options) 
   }
   
   GetAllContractType() : Observable<any> {
 
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
     
    return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetAllContractType`,options) 
   }
   getAllStandard() : Observable<any> {
 
   
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
      return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetAllCertification`,options) 
   }
   GetAllCertificationBody() : Observable<any> {
 
   
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
      return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetAllCertificationBody`,options) 
   }
   GetAllAuditType() : Observable<any> {
 
   
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
      return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetAllAuditType`,options) 
   }


   getAllEACode() : Observable<any> {
 
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
     
    return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetAllEACode`,options) 
   }
   getAllNaceCode() : Observable<any> {
 
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
          });
      let options = {headers : headers};
     
    return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetAllNaceCode`,options) 
   }


////User Declareation Services
CreateUserDeclaration(values): Observable<any> { 
      
  
     let headers = new HttpHeaders({
         'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        
    });
   let options = { headers: headers };
   // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
       return this.http.post<any>(`${environment.apiUrl}/api/SecUser/CreateUserDeclaration`,values,options) 
       
     }

     GetUserDeclarationById(id)
    {
      
  
     return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetUserDeclarationById?id=${id}`);
         }

  GetUserDeclaration(value): Observable<any> {
       
   let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   });
   let options = { headers: headers };
   
   return this.http.post<any>(`${environment.apiUrl}/api/SecUser/GetPagedUserDeclaration`,value,options);
  // return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);
       
 }

//   private data = new BehaviorSubject<any>(Response);
//   getSecRoleForm() {
//     
//   this.data.next(JSON.parse(localStorage.getItem('secRoleForm')))
//   return this.data.asObservable()
// }



DeleteUserDeclaration(id) { 
let headers = new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   });
let options = {headers : headers};

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserDeclarationById?id=${id}`,options)

}


/////User Academic
UserAcademicCreateWithFile(values): Observable<any> 
   
{    let headers = new HttpHeaders({

  'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   
});
let options = { headers: headers };
   return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserAcademicCreateWithFile`,values,options)
 
}
GetUserAcademicBYId(id)
{
  

 return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetUserAcademicBYId?id=${id}`);
     }

     GetPagedUserAcademic(value): Observable<any> {
   
let headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
});
let options = { headers: headers };

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/GetPagedUserAcademic`,value,options);
// return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);
   
}

//   private data = new BehaviorSubject<any>(Response);
//   getSecRoleForm() {
//     
//   this.data.next(JSON.parse(localStorage.getItem('secRoleForm')))
//   return this.data.asObservable()
// }



UserAcademicDeleteById(id) { 
let headers = new HttpHeaders({
'Content-Type': 'application/json',
'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
});
let options = {headers : headers};

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserAcademicDeleteById?id=${id}`,options)

}

//user Professional
UserProfessionalCreateWithFile(values): Observable<any> 
   
{    let headers = new HttpHeaders({

  'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   
});
let options = { headers: headers };
   return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserProsessionalCreateWithFile`,values,options)
 
}
GetUserProfessionalBYId(id)
{
  

 return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetUserProfessionalBYId?id=${id}`);
     }

     GetPagedUserProfessional(value): Observable<any> {
   
let headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
});
let options = { headers: headers };

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/GetPagedUserProfessional`,value,options);
// return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);
   
}

//   private data = new BehaviorSubject<any>(Response);
//   getSecRoleForm() {
//     
//   this.data.next(JSON.parse(localStorage.getItem('secRoleForm')))
//   return this.data.asObservable()
// }



UserProfessionalDeleteById(id) { 
let headers = new HttpHeaders({
'Content-Type': 'application/json',
'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
});
let options = {headers : headers};

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserProfessionalDeleteById?id=${id}`,options)

}


////User Employment Services
CreateUserEmployment(values): Observable<any> { 
      
  
     let headers = new HttpHeaders({
         'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        
    });
   let options = { headers: headers };
   // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
       return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserEmploymentCreate`,values,options) 
       
     }

     GetUserEmploymentById(id)
    {
      
  
     return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetUserEmploymentBYId?id=${id}`);
         }

  GetUserEmployment(value): Observable<any> {
       
   let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   });
   let options = { headers: headers };
   
   return this.http.post<any>(`${environment.apiUrl}/api/SecUser/GetPagedUserEmployment`,value,options);
  // return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);
       
 }

//   private data = new BehaviorSubject<any>(Response);
//   getSecRoleForm() {
//     
//   this.data.next(JSON.parse(localStorage.getItem('secRoleForm')))
//   return this.data.asObservable()
// }



DeleteUserEmployment(id) { 
let headers = new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   });
let options = {headers : headers};

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserEmploymentDeleteById?id=${id}`,options)

}


////User CPD
UserCPDCreateWithFile(values): Observable<any> 
   
{    let headers = new HttpHeaders({

  'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   
});
let options = { headers: headers };
   return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserCPDCreate`,values,options)
 
}
GetUserCPDBYId(id)
{
  

 return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetUserCPDBYId?id=${id}`);
     }

     GetPagedUserCPD(value): Observable<any> {
   
let headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
});
let options = { headers: headers };

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/GetPagedUserCPD`,value,options);
// return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);
   
}

//   private data = new BehaviorSubject<any>(Response);
//   getSecRoleForm() {
//     
//   this.data.next(JSON.parse(localStorage.getItem('secRoleForm')))
//   return this.data.asObservable()
// }



UserCPDDeleteById(id) { 
let headers = new HttpHeaders({
'Content-Type': 'application/json',
'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
});
let options = {headers : headers};

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserCPDDeleteById?id=${id}`,options)

}
CreateUserConsultancy(body: UserConsultancyModel | undefined) : Observable<any> {
  
const content_ = JSON.stringify(body);

let headers = new HttpHeaders({
"Content-Type": "application/json",
'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
  Accept: "text/plain",     
});
let options = { headers: headers };
// return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserConsultancyCreate`,content_,options) 
}

////User Consultancy Services
// CreateUserConsultancy(values): Observable<any> { 
      
//   
//      let headers = new HttpHeaders({
//          'Content-Type': 'application/json',
//       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        
//     });
//    let options = { headers: headers };
//    // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
//        return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserConsultancyCreate`,values,options) 
       
//      }

     GetUserConsultancyById(id)
    {
      
  
     return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetUserConsultancyBYId?id=${id}`);
         }

  GetUserConsultancy(value): Observable<any> {
       
   let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   });
   let options = { headers: headers };
   
   return this.http.post<any>(`${environment.apiUrl}/api/SecUser/GetPagedUserConsultancy`,value,options);
 
       
 }

//   private data = new BehaviorSubject<any>(Response);
//   getSecRoleForm() {
//     
//   this.data.next(JSON.parse(localStorage.getItem('secRoleForm')))
//   return this.data.asObservable()
// }



DeleteUserConsultancy(id) { 
let headers = new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   });
let options = {headers : headers};

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserConsultancyDeleteById?id=${id}`,options)

}



GetUserRemarks(value): Observable<any> {
   
let headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
});
let options = { headers: headers };

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/GetPagedUserRemarks`,value,options);
// return this.http.post<any>(`${environment.apiUrl}​/api​/Standard​/GetPagedStandard`, value, options);
   
}



///User Auditor Nace
UserAuditorNaceCreate(body: UserAuditorNaceModel | undefined) : Observable<any> {
  
const content_ = JSON.stringify(body);

let headers = new HttpHeaders({
"Content-Type": "application/json",
'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
  Accept: "text/plain",     
});
let options = { headers: headers };
// return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserAuditorNaceCreate`,content_,options) 
}

////User Consultancy Services
// CreateUserConsultancy(values): Observable<any> { 
      
//   
//      let headers = new HttpHeaders({
//          'Content-Type': 'application/json',
//       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        
//     });
//    let options = { headers: headers };
//    // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
//        return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserConsultancyCreate`,values,options) 
       
//      }

GetUserAuditorNaceBYId(id)
    {
      
  
     return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetUserAuditorNaceBYId?id=${id}`);
         }

         GetPagedUserAuditorNace(value): Observable<any> {
       
   let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   });
   let options = { headers: headers };
   
   return this.http.post<any>(`${environment.apiUrl}/api/SecUser/GetPagedUserAuditorNace`,value,options);
 
       
 }




UserAuditorNaceDeleteById(id) { 
let headers = new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   });
let options = {headers : headers};

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserAuditorNaceDeleteById?id=${id}`,options)

}


/// User Audits


UserAuditCreate(body: UserAuditModel | undefined) : Observable<any> {
  
const content_ = JSON.stringify(body);

let headers = new HttpHeaders({
"Content-Type": "application/json",
'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
  Accept: "text/plain",     
});
let options = { headers: headers };
// return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserAuditCreate`,content_,options) 
}

////User Consultancy Services
// CreateUserConsultancy(values): Observable<any> { 
      
//   
//      let headers = new HttpHeaders({
//          'Content-Type': 'application/json',
//       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        
//     });
//    let options = { headers: headers };
//    // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_) 
//        return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserConsultancyCreate`,values,options) 
       
//      }

GetUserAuditBYId(id)
    {
      
  
     return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetUserAuditBYId?id=${id}`);
         }

         GetPagedUserAudit(value): Observable<any> {
       
   let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   });
   let options = { headers: headers };
   
   return this.http.post<any>(`${environment.apiUrl}/api/SecUser/GetPagedUserAudit`,value,options);
 
       
 }




 UserAuditDeleteById(id) { 
let headers = new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   });
let options = {headers : headers};

return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserAuditDeleteById?id=${id}`,options)

}


downloadFileStandard(id:number)
{
  return this.http.get(`${environment.apiUrl}/api/SecUser/DownloadStandards?id=${id}`,{responseType:'blob'})

}
create(values): Observable<any> 
   
{    let headers = new HttpHeaders({

  'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
   
});
let options = { headers: headers };
   return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserStandardsCreateWithFile`,values,options)
 
}
SubmitForReviewStatus(id: number) : Observable<any>
   
{   
  debugger

  let headers = new HttpHeaders({
    
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
});
let options = { headers: headers };

 // var Id =localStorage.getItem('organizationId');
return this.http.post<any>(`${environment.apiUrl}/api/SecUser/SubmitForReviewStatus?id=${id}`,options);
}

AuditorNaceSubmitForReviewStatus(id: number) : Observable<any>
   
{   
  debugger

  let headers = new HttpHeaders({
    
    'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
});
let options = { headers: headers };

 // var Id =localStorage.getItem('organizationId');
return this.http.post<any>(`${environment.apiUrl}/api/SecUser/AuditorNaceSubmitForReviewStatus?id=${id}`,options);
}

ApprovedUserStandard(values): Observable<any> 
   
{ 
  debugger
 let headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
});
let options = { headers: headers };

   return this.http.post<any>(`${environment.apiUrl}/api/SecUser/StandardApproval`,values)
 
}

ApprovedUserAuditor(values): Observable<any> 
   
{ 
  debugger
 let headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
});
let options = { headers: headers };

   return this.http.post<any>(`${environment.apiUrl}/api/SecUser/AuditorNaceApproval`,values)
 
}
  }
