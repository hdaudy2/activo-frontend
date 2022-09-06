import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TokenService, LogService, UtilsService } from 'abp-ng2-module';
import { AppConsts } from '@shared/AppConsts';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import {
    AuthenticateModel,
    AuthenticateResultModel,
    TokenAuthServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppAuthService {
    authenticateModel: AuthenticateModel;
    authenticateResult: AuthenticateResultModel;
    rememberMe: boolean;

    constructor(
        private _tokenAuthService: TokenAuthServiceProxy,
        private _router: Router,
        private _utilsService: UtilsService,
        private _tokenService: TokenService,
        private _logService: LogService,
        private _toster : ToastrService 
    ) {
        this.clear();
    }

    // logout(reload?: boolean): void {
    //     abp.auth.clearToken();
    //     abp.utils.setCookieValue(
    //         AppConsts.authorization.encryptedAuthTokenName,
    //         undefined,
    //         undefined,
    //         abp.appPath
    //     );
    //     if (reload !== false) {
    //         location.href = AppConsts.appBaseUrl;
    //     }
    // }

    authenticate(finallyCallback?: () => void): void {
        finallyCallback = finallyCallback || (() => { });
  
        this._tokenAuthService
            .authenticate(this.authenticateModel)
            .pipe(
                finalize(() => {
                    finallyCallback();
                })

            )
            // .subscribe((result: AuthenticateResultModel) => {
            //       
            //     this.processAuthenticateResult(result);
            // });
            .subscribe((result: AuthenticateResultModel) => {
                  
               if (result.token != undefined) {
                      
                    localStorage.setItem('secRoleForm', JSON.stringify(result.secRoleForm))
                    localStorage.setItem('userId', JSON.stringify(result.userId))
                    localStorage.setItem('userName', JSON.stringify(result.userName))
                    localStorage.setItem('userSbpAllowed', JSON.stringify(result.userSbpAllowed))
                    localStorage.setItem('authAllowed', JSON.stringify(result.authAllowed))
                    localStorage.setItem('insertAllowed',JSON.stringify(result.insertAllowed))
                    localStorage.setItem('organizationId',JSON.stringify(result.organizationId))
                    localStorage.setItem('userTypeId',JSON.stringify(result.userTypeId))
                    localStorage.setItem('roleId',JSON.stringify(result.roleId))
                    localStorage.setItem('organizationName', JSON.stringify(result.organizationName))
                    //localStorage.setItem('roleId',JSON.stringify(result.roleId))
                    
          
                    
                   // localStorage.setItem('locationId', JSON.stringify(result.locationId))
                    //localStorage.setItem('locationTypeId', JSON.stringify(result.locationTypeId))
                    //localStorage.setItem('locationName', JSON.stringify(result.locationName))
                    localStorage.setItem('token', JSON.stringify(result.token))
                      
                    this.processAuthenticateResult(result);
                }
                else {
                    this._toster.error(result.message);
                    // this._toster.warn(result.message)
                }
            });
    }

    private processAuthenticateResult(
        authenticateResult: AuthenticateResultModel
    ) {
          
        this.authenticateResult = authenticateResult;
  
        if (authenticateResult.token) {
            // Successfully logged in
            this.login(
                //authenticateResult.token
                // authenticateResult.encryptedAccessToken,
                // authenticateResult.expireInSeconds,
                // this.rememberMe
           );
        } else {
            // Unexpected result!

            this._logService.warn('Unexpected authenticateResult!');
            this._router.navigate(['account/login']);
        }
    }

    private login(
        //token: string,
        // encryptedAccessToken: string,
        // expireInSeconds: number,
        // rememberMe?: boolean
    ): void {
        // const tokenExpireDate = rememberMe
        //     ? new Date(new Date().getTime() + 1000 * expireInSeconds)
        //     : undefined;

      //  this._tokenService.setToken(accessToken, tokenExpireDate);

        // this._utilsService.setCookieValue(
        //     AppConsts.authorization.encryptedAuthTokenName,
        //     // encryptedAccessToken,
        //     // tokenExpireDate,
        //     abp.appPath
        // );
    //      
    //     let initialUrl = UrlHelper.initialUrl;
    //     if (initialUrl.indexOf('/login') > 0) {
    //           
    //         initialUrl = AppConsts.appBaseUrl;
    //     }
    //   // initialUrl = "http://localhost:4200/"
    //    this._router.navigate(['app/pages/stock-management/indenting-maker-list'])
     // location.href = initialUrl + "app/pages/stock-management/indenting-maker-list";
        // event.preventDefault();
        this._toster.success('sign in')
        this._router.navigate(['app/home'])
    }


    private clear(): void {
        this.authenticateModel = new AuthenticateModel();
       // this.authenticateModel.rememberClient = false;
        //this.authenticateResult = null;
       // this.rememberMe = false;
    }
}
