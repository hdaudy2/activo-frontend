import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AfterViewChecked, AfterViewInit,EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'header-user-menu',
  templateUrl: './header-user-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent {
  saving = false;
  userName: any;
  ModalForm = new FormGroup({
  NewPassword: new FormControl(''),
  NewConfirmPassword: new FormControl(''),

  })
  constructor(private _authService: AppAuthService,


    public router : Router,) {
 
  }
  ngOnInit(): void {
    
  
    var UserName =localStorage.getItem('userName');
      this.userName =  UserName.replace(/['"]+/g, '').toUpperCase();
    
      //this.userName ="Muhammd Farooq Fayyaz Khan"

   
  }
  logout(): void {
   
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
    this.router.navigate(['account/login']);
  }
  
  // displayStyle="none";

  // openPopup(){
  //   this.displayStyle="block";
  // }
  // closePopup(){
  //   this.displayStyle="none";
  // }

  
 // UserSubmit(): void {
  //   

  //   if (this.SecUserForm.get('NewConfirmPassword').value != this.SecUserForm.get('NewPassword').value) {
  //     this._toster.error("Password doesn't match Confirm Password", "Alert")
  //     return
  //   }
  //   if (this.SecUserForm.get('EmailForgotPassword').value == null || this.SecUserForm.get('EmailForgotPassword').value == undefined || this.SecUserForm.get('EmailForgotPassword').value == "") {
  //     this._toster.error("Email Address required", "Alert")
  //     return
  //     // MesseageError="Module is Empty";
  //   }
  //   const UserModel =

  //   {

  //     Id: this.id,
  //     Password: this.SecUserForm.get('NewPassword').value,
  //     ConfirmPassword: this.SecUserForm.get('NewConfirmPassword').value,
  //     Email: this.SecUserForm.get('EmailForgotPassword').value,

  //   }


  //   this.SecUserService.UCreate(UserModel).subscribe((Response) => {

  //     this._toster.info(Response.message)
  //     // this.router.navigateByUrl('/app/pages/security-module/agency')

  //   })
  // }


  profile(): void {
    var userId =parseInt(localStorage.getItem('userId'));
    this.router.navigateByUrl('/app/pages/security-module/user-review?'+userId)
  }

}



