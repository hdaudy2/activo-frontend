import { Injectable } from '@angular/core';
import { PermissionCheckerService } from 'abp-ng2-module';
import { AppSessionService } from '../session/app-session.service';
import { RoleAuthorizationService } from './role-authorization.service';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  UrlTree
} from '@angular/router';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppAuthService } from './app-auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppRouteGuard extends RoleAuthorizationService implements CanActivate, CanActivateChild {
  constructor(
    // private _permissionChecker: PermissionCheckerService,
    private _router: Router,
    // private _sessionService: AppSessionService


  ) {
    super()
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> {
    
    const token = (localStorage.getItem('token')) ?
      JSON.parse(localStorage.getItem('token')) : undefined;
    if (!token) {
      return true;
    }
    else 
    {
      
      if (this._router && this._router.url && this._router.url !== '/') {
        this._router.navigate([this._router.url]);
      } 
      else
       {
         
      
          // this._router.navigate(['/app/pages/stock-management/indent']);
      //this._router.navigate(['app/pages/stock-management/indenting-maker-list']);
         this._router.navigate(['app/home']);
      }
      return false;
    }






    // this.token = JSON.parse(localStorage.getItem('token'));

    // if (this._authService.isUserLogedIn()) {
    //     // this._router.navigate(['/account/login']);
    //     return true;

    // }
    //  this._router.navigate(['/account/login']);
    // return false;
    // if (!route.data || !route.data['permission']) {
    //     return true;
    // }

    // if (this._permissionChecker.isGranted(route.data['permission'])) {
    //     return true;
    // }
    // let initialUrl = UrlHelper.initialUrl;
    // this._router.navigate(['/app/pages/stock-management/indent'])
    // this._router.navigate(['#/app/pages/stock-management/indent']);

    // }

    // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     // return this.canActivate(route, state);
    // }

    // selectBestRoute(): string {

    //     if (!this.token) {
    //         return '/account/login';
    //     }

    //     // if (this._permissionChecker.isGranted('Pages.Users')) {
    //     //     return '/app/admin/users';
    //     // }

    //     return '/app/home';
    // }
  }
};
@Injectable({
  providedIn: 'root'
})
export class PageGuard extends AppRouteGuard {

  constructor(
    private _route: Router,
  ) {
    super(_route);
  }
  canActivate(_next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const token = (localStorage.getItem('token')) ?
      JSON.parse(localStorage.getItem('token')) : undefined;
    if (token) {
      return this.canLoad(_next);
    }
    else {
      if (this._route && this._route.url && this._route.url !== '/') {
        this._route.navigate([this._route.url]);
      } else {
        this._route.navigate(['/account/login']);
      }
      return false;
    }
  }

  canLoad(_route): boolean {
    const token = (localStorage.getItem('token')) ?
      JSON.parse(localStorage.getItem('token')) : undefined;
    if (!token) {
      this._route.navigate(['/account/login']);
      return false;
    } else {
      if (!this.isAuthorized()) {
        return false;
      }
      //    const roles = _route.data && _route.data.roles;
      //    if (roles && roles.length &&  !roles.some(r => this.hasRole(r))) {
      //      if(!_route.url){
      //       this._route.navigate(['/app/dashboard']);
      //      }
      //       return false;
      //     }
      return true;
    }

  }
};
