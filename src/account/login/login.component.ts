import { Component, Injector } from '@angular/core';
import { AbpSessionService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { Router } from '@angular/router';

@Component({

  templateUrl: './login.component.html',
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {
  public showPassword: boolean;
  public showPasswordOnPress: boolean;
  submitting = false;

  public credentials = {

    username: 'admin',
    password: 'test',
    username1: 'muzamil',
    password1: 'pakistan'
  }

  public username: string
  public password: string
  constructor(
    injector: Injector,
    public route: Router,
    public authService: AppAuthService,
    private _sessionService: AbpSessionService
  ) {
    super(injector);
  }

  // get multiTenancySideIsTeanant(): boolean {
  //   return this._sessionService.tenantId > 0;
  // }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(): void {


    this.submitting = true;
    this.authService.authenticate(() => (this.submitting = false));


    // if(this.username == this.credentials.username && this.password == this.credentials.password)
    // {
    //   this.submitting = true;
    //   //this._toster.success("Successfully login")
    //    this.route.navigate(['app/home'])
    // }
    // else if(this.username==this.credentials.username1 && this.password==this.credentials.password1)
    // {
    //   this.submitting=true;
    //   this._toster.success("Successfully login")
    //   // this.route.navigate(['/app/pages/stock-management/indenting-maker-list'])
    //  // this.route.navigate(['app/home'])
    // }
    // else{
    //   this._toster.warn("Incorrect UserName or Password")
    // }

  }
}
