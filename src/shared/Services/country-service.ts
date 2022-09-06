import { result } from "lodash";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
import { AppConsts } from "../AppConsts";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { CountryModel } from "../Dto/country-model";
import { QueryParamModel } from "@shared/interface/QueryParam.interface";
import { QueryParamObjToUrl } from "@shared/utility/queryParamFormatter.utility";

export const API_BASE_URL = new InjectionToken<string>("API_BASE_URL");

@Injectable({
  providedIn: "root",
})
export class CountryService {
  private baseUrl: string;

  private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
  $isDataLoaded = new EventEmitter();

  constructor(private http: HttpClient) {}

  create(body: CountryModel | undefined): Observable<any> {
    const content_ = JSON.stringify(body);

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      Accept: "text/plain",
    });
    let options = { headers: headers };
    // return this.http.post(this.REST_API_SERVER + '/api/services/app/PurchaseOrderService/CreatePurchaseOrder',content_)
    return this.http.post<any>(
      `${environment.apiUrl}/api/Country/Create`,
      content_,
      options
    );
  }

  Delete(id) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    });
    let options = { headers: headers };

    return this.http.post<any>(
      `${environment.apiUrl}/api/Country/CountryDeleteById?id=${id}`,
      options
    );
  }

  GetCountryById(id) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    });
    let options = { headers: headers };
    return this.http.get<any>(
      `${environment.apiUrl}/api/StandardType/GetCountryDataById?id=${id}`,
      options
    );
  }

  Get(value): Observable<any> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    });
    let options = { headers: headers };
    return this.http.post<any>(
      `${environment.apiUrl}/api/Country/GetPagedCountry`,
      value,
      options
    );
  }

  GetAllCountries(queryParams?: QueryParamModel[]): Promise<CountryModel[]> {
    let params: string = QueryParamObjToUrl(queryParams);

    const URL: string = `${environment.apiUrl}/api/Country/Get${params}`;
    return this.http.get<CountryModel[]>(URL).toPromise();
  }
}
