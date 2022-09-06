import { Injectable, InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class MakerAuthorizerFormService {

  constructor(
    ) { }

    private data = new BehaviorSubject<any>(Response);

    getSecRoleForm() {
        
      this.data.next(JSON.parse(localStorage.getItem('secRoleForm')))
      return this.data.asObservable()
    }

}