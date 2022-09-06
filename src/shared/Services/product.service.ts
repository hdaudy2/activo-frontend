import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { AppConsts } from "@shared/AppConsts";
import { Observable } from "rxjs";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string;

  private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
  $isDataLoaded = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.get<any>(this.REST_API_SERVER + '/api/Product', options);
  }


  getProductNameById(id): Observable<any> {
      
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.get<any>(this.REST_API_SERVER + '/api/Product/' + id, options);
  }

  getDenominationListById(id): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.get<any>(this.REST_API_SERVER + '/api/ProductDenomination/' + id, options);
  }
}