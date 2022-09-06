import { EventEmitter, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { SecUserModel } from '../Dto/sec-user-model';
// import { SecUserPasswordModel } from '../Dto/sec-user-password-model';
import { AppConsts } from "@shared/AppConsts";
import { environment } from 'environments/environment';
import { map, } from 'rxjs/operators';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');


interface BuildingModel {
  Id: number;
  Code: number | null;
  Name: string;
  Status: number | null;
  CreateDate: string | null;
  CreateUser: number | null;
  CreateUnit: string | null;
  Approved1: number | null;
  Approved2: number | null;
  Post: number | null;
  Approved1User: number | null;
  Approved2User: number | null;
  PostUser: number | null;
  RbUser: number | null;
  AeUser: number | null;
  IsActive: boolean | null;
  IsDelete: boolean | null;
  CountryId: number | null;
  StateId: number | null;
  CityId: number | null;
  CountryName: string;
  StateName: string;
  CityName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SecUserService {

  private REST_API_SERVER = AppConsts.remoteServiceBaseUrl;
  $isDataLoaded = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }
  private data = new BehaviorSubject<any>(Response);
  setUserWithLocations(data: any) {
    //  
    this.data.next(data);
    //  setTimeout(() => {
    //    this.data.next(null);
    //  }, 200);
  }

  getUserWithLocations() {

    return this.data.asObservable();
  }

  SubmitForReview(id: number): Observable<any> {

    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    // var Id =localStorage.getItem('organizationId');
    return this.http.post<any>(`${environment.apiUrl}/api/SecUser/SubmitForReview?id=${id}`, options);
  }
  Approval(body: SecUserModel | undefined): Observable<any> {

    const content_ = JSON.stringify(body);

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      Accept: "text/plain",
    });
    let options = { headers: headers };
    return this.http.post<any>(`${environment.apiUrl}/api/SecUser/Approval`, content_, options)
  }

  create(body: SecUserModel | undefined): Observable<any> {

    const content_ = JSON.stringify(body);

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      Accept: "text/plain",
    });
    let options = { headers: headers };
    return this.http.post<any>(`${environment.apiUrl}/api/SecUser/CreateSecUser`, content_, options)
  }

  Get(Id: number, value): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    // var Id =localStorage.getItem('organizationId');
    return this.http.post<any>(`${environment.apiUrl}/api/SecUser/GetPagedUser?id=${Id}`, value, options);

  }

  GetLocationsById(id: number): Observable<any> {

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetLocationById?id=${id}`, options);
  }
  getUserType(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    //return this.http.get<any>(`${environment.apiUrl}` '/api/SecRole/GetSecRole') 
    return this.http.get<any>(`${environment.apiUrl}/api/SecRole​/GetUserType`, options)
  }
  getroles(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    //  headers: new HttpHeaders({
    //      "Content-Type": "application/json",
    //      Accept: "text/plain",
    //  });
    //  let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/SecRole/GetUserType`, options)
  }
  getlocations(): Observable<any> {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/Location`, options)
  }
  getdepartments(): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/Department`, options)
  }
  getCities(): Observable<any> {

    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),

    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/SecRole/GetCities`, options)
  }
  getCountries(): Observable<any> {


    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),

    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/SecRole/GetCountries`, options)
  }
  getClient(): Observable<any> {


    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),

    });
    let options = { headers: headers };

    return this.http.get<any>(`${environment.apiUrl}/api/TenantClient/client`, options)
  }
  getPrefix(): Observable<any> {


    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),

    });
    let options = { headers: headers };


    return this.http.get<any>(`${environment.apiUrl}/api/SecRole/GetPrefix`, options)
  }
  getState(): Observable<any> {


    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),

    });
    let options = { headers: headers };


    return this.http.get<any>(`${environment.apiUrl}/api/SecRole/GetState`, options)
  }
  getStateByCountryId(id): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/City/GetState?id=${id}`, options)
  }


  // getCityByStateId(id): Observable<any> {
  //   let headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
  //   });
  //   let options = { headers: headers };
  //   return this.http.get<any>(`${environment.apiUrl}/api/City/GetState?id=${id}`, options)
  // }
  getCitiesByState(id): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/City/GetCities?id=${id}`, options)
  }


  UserCreateWithFiles(values): Observable<any> {
    //let headers = new HttpHeaders({
    debugger;
    //   'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),

    // });
    // let options = { headers: headers };
    return this.http.post<any>(`${environment.apiUrl}/api/SecUser/CreateUserWithFiles`, values)

  }
  GetUserbyId(id) {


    return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetUserDataById?id=${id}`);
  }
  getActiveStatus(): Observable<any> {


    let headers = new HttpHeaders({

      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),

    });
    let options = { headers: headers };


    return this.http.get<any>(`${environment.apiUrl}/api/SecRole/GetActiveStatus`, options)
  }

  getAllAgency(): Observable<any> {
    debugger
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/ProjectAmountReports/getAllAgency`, options)
  }

  getAllBuildings(): Observable<BuildingModel[]> {
    debugger
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<BuildingModel[]>(`${environment.apiUrl}/api/SecUser/GetBuldings`, options)
  }
  getAllFloors(id): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetFloors?id=${id}`, options)
  }
  getAllFlats(id): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetFlats?id=${id}`, options)
  }
  getAllUsers(id): Observable<any> {
    debugger
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };
    return this.http.get<any>(`${environment.apiUrl}/api/SecUser/GetAllUsers?id=${id}`, options)
  }

  Deleteuser(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UserDeleteById?id=${id}`, options)

  }
  UCreate(values): Observable<any> {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.post<any>(`${environment.apiUrl}/api/SecUser/UCreate`, values)

  }
  CheckPermission(id) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    });
    let options = { headers: headers };

    return this.http.post<any>(`${environment.apiUrl}/api/Authenticate/CheckPermission?id=${id}`, options)

  }
}
