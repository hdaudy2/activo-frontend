import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {

  constructor(
    private readonly _router: Router,
    private ngxService: NgxUiLoaderService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =  JSON.parse(localStorage.getItem('token')); 
    // const object = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));
    // const token = object && object.Token;
    // const userID = object && object.UserId;
      if (token) {
        req = req.clone({
            setHeaders: {
             
              // "Content-Type": "application/json",
              // Accept: "text/plain",
              'Authorization': `Bearer ${token}`,
              'url': `${this._router.url}`
            }
        });
    }
    this.ngxService.start();
    // this._fuseProgressBarService.show();
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        // Checking if it is an Authentication Error (401)
        if ((err.status === 401 || err.status === 498)) {
            
          // <Log the user out of your application code>
          // if(err.status === 498){
          //   // this._toast.error("Session has been expired");
          // }
          // localStorage.removeItem('token');
          // this._router.navigate([ '/account/login' ]);
          //return throwError(err);
        }
        // If it is not an authentication error, just throw it
        return throwError(err);
      }),
      
      finalize(() => {
        this.ngxService.stop();
        
      })
    );
  }
}
// function finalize(): import("rxjs").OperatorFunction<unknown, HttpEvent<any>> {
//   throw new Error('Function not implemented.');
// }

