import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import {ChangePasswordDto,UserServiceProxy} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SecUserService } from '@shared/Services/sec-user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './change-password.component.html',
  // styleUrls: ['./change-password.component.css'],
  animations: [appModuleAnimation()]
})
export class ChangePasswordComponent extends AppComponentBase {
  ChangePasswordForm = new FormGroup({
    NewConfirmPassword: new FormControl(''),
    NewPassword: new FormControl(''),

  })
  public id: number

  saving = false;
  changePasswordDto = new ChangePasswordDto();
  newPasswordValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'pattern',
      localizationKey:
        'PasswordsMustBeAtLeast8CharactersContainLowercaseUppercaseNumber',
    },
  ];
  confirmNewPasswordValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'validateEqual',
      localizationKey: 'PasswordsDoNotMatch',
    },
  ];

  constructor(
    injector: Injector,
    private userServiceProxy: UserServiceProxy,
    public SecUserService: SecUserService,
    private router: Router,
    private _toster: ToastrService,
  ) {
    super(injector);
  }

  UserSubmit(): void {
    

    if (this.ChangePasswordForm.get('NewConfirmPassword').value != this.ChangePasswordForm.get('NewPassword').value) {
      this._toster.error("Password doesn't match Confirm Password", "Alert")
      return
    }
    // if (this.ChangePasswordForm.get('EmailForgotPassword').value == null || this.ChangePasswordForm.get('EmailForgotPassword').value == undefined || this.ChangePasswordForm.get('EmailForgotPassword').value == "") {
    //   this._toster.error("Email Address required", "Alert")
    //   return
    //   // MesseageError="Module is Empty";
    // }
    var LoginUserId = localStorage.getItem('userId');
    const UserModel =

    {

      Id: LoginUserId,
      LastModifiedById: LoginUserId,
      CreatedById: LoginUserId,
      Password: this.ChangePasswordForm.get('NewPassword').value,
      //ConfirmPassword: this.ChangePasswordForm.get('NewConfirmPassword').value,
      
    }


    this.SecUserService.UCreate(UserModel).subscribe((Response) => {

      this._toster.info(Response.message)
      if(Response.message=="Successfully Changed Password!")
      {
       
   
          // this._authService.logout();
          // this.route.navigate(['src/login']);
          localStorage.removeItem('secRoleForm')
          localStorage.removeItem('userId')
          localStorage.removeItem('userName')
          localStorage.removeItem('userSbpAllowed')
          localStorage.removeItem('authAllowed')
          localStorage.removeItem('insertAllowed')
          localStorage.removeItem('organizationId')
          localStorage.removeItem('userTypeId')
          localStorage.removeItem('roleId')
          localStorage.removeItem('token')
          localStorage.removeItem('clientId');
          this.router.navigateByUrl('/account/login');
        
       

      }

      // this.router.navigateByUrl('/app/pages/security-module/agency')

    })
  }

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }



//   UserSubmit(): void {
//     

//     if (this.SecUserForm.get('NewConfirmPassword').value != this.SecUserForm.get('NewPassword').value) {
//       this._toster.error("Password doesn't match Confirm Password", "Alert")
//       return
//     }
//     if (this.SecUserForm.get('EmailForgotPassword').value == null || this.SecUserForm.get('EmailForgotPassword').value == undefined || this.SecUserForm.get('EmailForgotPassword').value == "") {
//       this._toster.error("Email Address required", "Alert")
//       return
//       // MesseageError="Module is Empty";
//     }
//     const UserModel =

//     {

//       Id: this.id,
//       Password: this.SecUserForm.get('NewPassword').value,
//       ConfirmPassword: this.SecUserForm.get('NewConfirmPassword').value,
//       Email: this.SecUserForm.get('EmailForgotPassword').value,

//     }


//     this.SecUserService.UCreate(UserModel).subscribe((Response) => {

//       this._toster.info(Response.message)
//       // this.router.navigateByUrl('/app/pages/security-module/agency')

//     })
//   }
 }
