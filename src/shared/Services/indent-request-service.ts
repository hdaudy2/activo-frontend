import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { AppConsts } from "@shared/AppConsts";
import { IndentingRequestDto } from "@shared/Dto/indenting-request-dto";
import { BehaviorSubject, Observable } from "rxjs";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class IndentRequestService {

  private REST_API_SERVER = AppConsts.remoteServiceBaseUrl; 
  $isDataLoaded = new EventEmitter();

  constructor(
    private http: HttpClient
    ) { }

    private data = new BehaviorSubject<any>(Response);

    setIndentMaker(data: any) {
        
      this.data.next(data);
      setTimeout(() => {
        this.data.next(null);
      }, 100);
    }

    getIndentMaker() {
        
      let obj = this.data.asObservable();
      this.data.value.length =  0
      return obj
    }
  
  create(body: IndentingRequestDto | undefined) : Observable<any> {
   const content_ = JSON.stringify(body);
       let options_: any = {
           headers: new HttpHeaders({
               "Content-Type": "application/json",
               Accept: "text/plain",
           }),
       };
     return this.http.post<any>(this.REST_API_SERVER + '/api/IndentRequest',content_, options_) 
   }

   update(body: IndentingRequestDto | undefined) : Observable<any> {
   const content_ = JSON.stringify(body);

       let options_: any = {
           headers: new HttpHeaders({
               "Content-Type": "application/json",
               Accept: "text/plain",
           }),
       };
     return this.http.put<any>(this.REST_API_SERVER + '/api/IndentRequest',content_, options_) 
   }

   GetIndentRequest(pageNumber, pageSize): Observable<any> {
          
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        });
    let options = {headers : headers};
    return this.http.get<any>(this.REST_API_SERVER + '/api/IndentRequest?pageNumber='+ pageNumber  + '&pageSize=' + pageSize , options);
        
}


// Delete(id) { 
//     let headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//         });
//     let options = {headers : headers};
//     return this.http.delete<any>(this.REST_API_SERVER +'/api/services/app/ItemReturnService/Delete?id='+id,options)
//     .pipe(map(res => {
//       this.$isDataLoaded.emit(res['result']);
//      }));
//   }

  GetIndentRequestById(id : number) : Observable<any>
    {
      let headers = new HttpHeaders({
        "Content-Type": "application/json",
    });
    let options = { headers: headers };
       return this.http.get<any>(this.REST_API_SERVER+'/api/IndentRequest/'+ id, options);
    }


}  