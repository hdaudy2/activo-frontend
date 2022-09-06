import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class TenantSecUserService {
  constructor(private http: HttpClient) {}

  // ---------------------------------------------------------
  // SecUser: Start
  GetUserByIdUsingPromise(id): Promise<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/api/SecUser/GetUserDataById?id=${id}`)
      .toPromise();
  }
  // SecUser: End
  // ---------------------------------------------------------
}
