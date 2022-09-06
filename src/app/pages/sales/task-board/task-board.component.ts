//import { Component, OnInit } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
// import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { create } from 'lodash-es';
import { FormControl, FormGroup } from '@angular/forms';

import { RoleFormService } from '@shared/Services/sec-role-service'
import { RoleFormModel } from '@shared/Dto/role-form-model';
import { Router } from '@angular/router';
import { SecRoleFormModel } from '@shared/Dto/sec-role-form-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { LibraryResourceService } from '@shared/Services/library-Resource_service';
import { AgencyModel } from '@shared/Dto/Agency-model';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from "@angular/common/http";
//import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
//import { AppConsts } from "../AppConsts";
//import { LibraryResourceModel } from "../Dto/Library-Resource_model";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { TagContentType } from '@angular/compiler';
import { Content } from '@angular/compiler/src/render3/r3_ast';

import { appModuleAnimation } from '@shared/animations/routerTransition';
import { SecUserService } from '@shared/Services/sec-user.service';
import { ClientService } from '@shared/Services/Client-Service';
import { ClientModel } from '@shared/Dto/Client-model';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
    @ViewChild('content', { static: false }) content: ElementRef;
  public id: number
  public MultisiteList = [];
  public StatusList = [];
  public PrefixList = [];
  public CountryList = [];
  public StateList = [];
  public CityList = [];
  submitted = false;
  secRoleForm
  message: string;
  progress: number;
  pipe = new DatePipe('en-US');
  datePipe = new DatePipe("en-US");
  isAuthAllowed: boolean = false
  isManageAllowed: boolean = false
  isShownDeclineRemarks: boolean = false
  isShownRejectOrAuthButton: boolean = false
  isMakerButtons: boolean = false
  isDeclineRemarks: boolean = false
  public isShown: boolean = false
  UserMaker: any;
  private userUpdateId: number
  public Client: ClientModel = new ClientModel();
  ClientForm = new FormGroup({
    Code: new FormControl(''),
    Name: new FormControl(''),
    Address1: new FormControl(''),
    Address2: new FormControl(''),
    CountryId: new FormControl(''),
    CityId: new FormControl(''),
    StateId: new FormControl(''),
    PostalCode: new FormControl(''),
    PrefixId: new FormControl(''),
    ContactPerson: new FormControl(''),
    Date: new FormControl(''),
    Position: new FormControl(''),
    PhoneNumber: new FormControl(''),
    MobileNumber: new FormControl(''),
    Email: new FormControl(''),
    Website: new FormControl(''),
    Multisite: new FormControl(''),
    IsDeleted: new FormControl(''),
    IsActive: new FormControl(''),


  })




  constructor(public SecUserService: SecUserService,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    public RoleFormService: RoleFormService,
    public _ClientService: ClientService,
    private _toster: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadSecRoleForm()
    this.loadSecRoleForm()
    //this.loadCities()
    this.loadCountries()
    this.loadPrefix()
    // this.loadState()
    this.loadStatus()
    this.loadMultisite()
  }
  ngAfterViewInit(): void {
    this.editUser()

  }
  loadSecRoleForm() {
    // let secRoleForm = JSON.parse(localStorage.getItem('secRoleForm'))
    // let permission = secRoleForm.find(x => x.formCode != null && x.formCode == this.formCode)

    // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {

    //   let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
    //   this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)

    var formName = "Clients"
    this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      this.secRoleForm = data.find(x => x.formName == formName)
      this.isShown = this.secRoleForm.authAllowed
      if (this.secRoleForm.manageAllowed == true) {
        this.isManageAllowed = true

      }
      if (this.secRoleForm.authAllowed == false) {


        this.isShownDeclineRemarks = this.secRoleForm.authAllowed
        this.isShownRejectOrAuthButton = true
        this.isMakerButtons = false

        this.isAuthAllowed = false
      }
      else {
        this.isAuthAllowed = true
        this.isMakerButtons = true
        this.isDeclineRemarks = true
      }

    })

  }
  editUser() {
    
    var ur;
    ur = window.location.href.split("/")[7];
    var com = [] = ur.split("?")[1];
    if (com != undefined && com != null) {
      var PId = com.split("=")[0];
      this.id = PId;
      this._ClientService.GeClientDatabyId(this.id).subscribe(data => {


        this.userUpdateId = data.id
        // this.UserMaker =
        var agencyData = data;
        if (this.userUpdateId != undefined) {
          //this.isResetButtonShow=true;
          // this.isResetPassword=false;
          // this.confrmPass = this.UserMaker.ConfirmPassword
          // this.pass = this.UserMaker.password

          
          //  this.AgencyForm.get('Id').setValue(agencyData.id);
          this.ClientForm.get('Code').setValue(agencyData.code);
          this.ClientForm.get('Name').setValue(agencyData.name);
          this.ClientForm.get('Address1').setValue(agencyData.address1);
          // this.AgencyForm.get('JoiningDate').setValue(agencyData.joiningDate);
          this.ClientForm.get('Address2').setValue(agencyData.address2);
          // this.ClientForm.get('CountryId').setValue(agencyData.countryId);
          // this.ClientForm.get('CityId').setValue(agencyData.cityId);
          // this.ClientForm.get('StateId').setValue(agencyData.stateId);
          this.ClientForm.get('CountryId').setValue(agencyData.countryId);
          this.loadState(agencyData.countryId);
          this.ClientForm.get('StateId').setValue(agencyData.stateId);
          this.loadCities(agencyData.stateId);
          this.ClientForm.get('CityId').setValue(agencyData.cityId);
          this.ClientForm.get('PostalCode').setValue(agencyData.postalCode);
          this.ClientForm.get('PrefixId').setValue(agencyData.prefixId);
          this.ClientForm.get('ContactPerson').setValue(agencyData.contactPerson);
          this.ClientForm.get('Position').setValue(agencyData.position);
          this.ClientForm.get('PhoneNumber').setValue(agencyData.phoneNumber);
          let req = new Date(this.datePipe.transform(agencyData.date, 'yyyy/MM/dd'))

          this.ClientForm.get('Date').setValue(this.datePipe.transform(req, 'yyyy-MM-dd'))

          this.ClientForm.get('MobileNumber').setValue(agencyData.mobileNumber);
          this.ClientForm.get('Email').setValue(agencyData.email);
          this.ClientForm.get('Website').setValue(agencyData.website);
          //this.ClientForm.get('Multisite').setValue(agencyData.website);
          // this.ClientForm.get('Multisite').setValue(agencyData.multisite);
          //  this.ClientForm.get('IsActive').setValue(agencyData.isActive);
          
          if (agencyData.isActive == true) {
            this.ClientForm.get('IsActive').setValue(1);
          }
          else {
            this.ClientForm.get('IsActive').setValue(0);
          }
          if (agencyData.multisite == true) {
            this.ClientForm.get('Multisite').setValue('1');
          }
          else {
            this.ClientForm.get('Multisite').setValue('0');

          }
          if (agencyData.isProjectExist == true) {
            this.ClientForm.get('Code').disable();

          }


          // this.AgencyForm.get('Password').disable();
          // this.AgencyForm.get('ConfirmPassword').disable();
          // this.AgencyForm.get('ConfirmPassword').setValue("Pakistan@123");
          // this.AgencyForm.get('Password').setValue("Pakistan@123");
          // this.AgencyForm.get('IsActive').setValue(this.agencyData.isActive);
          // this.AgencyForm.get('FirstName').setValue(this.agencyData.firstName);

          // this.SecUserForm.get('OrganizationId').setValue(this.agencyData.EmailForgotPassword);


          //   this.SecUserForm.get('Designation').setValue(this.agencyData.designation);
          //  this.SecUserForm.get('Remarks').setValue(this.agencyData.remarks);

          //  this.SecUserForm.get('SbpAllowed').setValue(this.agencyData.sbpAllowed);
          //  this.SecUserForm.get('SbpAllowed').setValue(this.agencyData.sbpAllowed);


        }

      })
      //  this.onSearch(this.userUpdateId);
    }

  }

  // loadCities(): void {
  //   
  // this.SecUserService.getCities().subscribe((Response)=>{
  //   this.CityList = Response
  // })
  // }
  // loadCountries(): void {
  //   
  //   this.SecUserService.getCountries().subscribe((Response)=>{
  //     this.CountryList = Response
  //   })
  //   }
  //   loadState(): void
  //    {
  //     
  //     this.SecUserService.getState().subscribe((Response)=>{
  //       this.StateList = Response
  //     })
  //  }
  loadPrefix(): void {

    this.SecUserService.getPrefix().subscribe((Response) => {
      this.PrefixList = Response
    })
  }

  loadStatus(): void {

    const item = {
      id: 1,
      name: 'Active',


    };
    this.StatusList.push(item);
    const item2 = {
      id: 0,
      name: 'InActive',


    };
    this.StatusList.push(item2);

  }
  loadMultisite(): void {

    const item = {
      id: 1,
      name: 'Yes',


    };
    this.MultisiteList.push(item);
    const item2 = {
      id: 0,
      name: 'No',


    };
    this.MultisiteList.push(item2);

  }

  get f() { return this.ClientForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.ClientForm.invalid) {
      this._toster.error("Some fields are required ");
      return;
    }
    this.onSubmit1();
    // if (this.fileToUpload != null && this.fileToUpload != "" && this.fileToUpload != undefined && this.fileToUpload != undefined && this.fileToUpload != NaN) {
    //   this.onSubmit1();
    // }
    // else {

    //   this._toster.error("Please Upload Application Form!", "Application Form is required ");
    // }
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.SLCPForm.value, null, 4));
  }
  onSubmit1(): void {
    var codelength = this.ClientForm.get('Code').value
    

    if (this.id > 0) {
      if (codelength.length != 12) {
        this._toster.error("Code Length should be 12 Character")
        return
      }
    }
    else {
      if (codelength.length != 8) {
        this._toster.error("Code Length should be 8 Character")
        return
      }
    }
    var MesseageError = "";

    // MesseageError="Module is Empty";

    // if(this.ClientForm.get('ContactPerson').value ==null ||this.ClientForm.get('ContactPerson').value==undefined|| this.ClientForm.get('ContactPerson').value=="")
    // {  this._toster.error("ContactPerson is Required","Alert")
    // return
    // // MesseageError="Title is Empty";
    // }
    // if(this.ClientForm.get('Email').value ==null ||this.ClientForm.get('Email').value==undefined|| this.ClientForm.get('Email').value=="")
    // {  this._toster.error("Email is Required","Alert")
    // return
    // // MesseageError="Version is Empty";
    // }
    // if(this.ClientForm.get('Address1').value ==null ||this.ClientForm.get('Address1').value==undefined|| this.ClientForm.get('Address1').value=="")
    // {  this._toster.error("Address1 is Required","Alert")
    // return
    // // MesseageError="Version is Empty";
    // }
    // if(this.ClientForm.get('Date').value ==null ||this.ClientForm.get('Date').value==undefined|| this.ClientForm.get('Date').value=="")
    // {  this._toster.error("Date is Required","Alert")
    // return
    // // MesseageError="Version is Empty";
    // }



    if (this.id > 0) {
      this.Client.Id = this.id
    }
    this.Client.Code = this.ClientForm.get('Code').value;
    this.Client.Name = this.ClientForm.get('Name').value;
    this.Client.Address1 = this.ClientForm.get('Address1').value;

    this.Client.Address2 = this.ClientForm.get('Address2').value;
    this.Client.CountryId = parseInt(this.ClientForm.get('CountryId').value);
    this.Client.CityId = parseInt(this.ClientForm.get('CityId').value);
    this.Client.StateId = parseInt(this.ClientForm.get('StateId').value);
    this.Client.PostalCode = this.ClientForm.get('PostalCode').value;
    this.Client.PrefixId = parseInt(this.ClientForm.get('PrefixId').value);
    this.Client.ContactPerson = this.ClientForm.get('ContactPerson').value;
    this.Client.Position = this.ClientForm.get('Position').value;
    this.Client.PhoneNumber = this.ClientForm.get('PhoneNumber').value;
    if (this.ClientForm.get('Date').value != null && this.ClientForm.get('Date').value != "" && this.ClientForm.get('Date').value != undefined && this.ClientForm.get('Date').value != NaN) { this.Client.Date = this.ClientForm.get('Date').value; }
    this.Client.MobileNumber = this.ClientForm.get('MobileNumber').value;
    this.Client.Email = this.ClientForm.get('Email').value;
    this.Client.Website = this.ClientForm.get('Website').value;

    if (this.ClientForm.get('Multisite').value == '1') {
      this.Client.Multisite = true;
    }
    else if (this.ClientForm.get('Multisite').value == '0') {

      this.Client.Multisite = false;
    }
    if (this.ClientForm.get('IsActive').value == '1') {
      this.Client.IsActive = true;
    }
    else {
      this.Client.IsActive = false;
    }



    var OrgId = localStorage.getItem('organizationId');
    this.Client.OrganizationId = parseInt(OrgId);

    var userId = localStorage.getItem('userId');
    this.Client.CreatorUserId = parseInt(userId);


    // this.Agncy.IsActive = this.AgencyForm.get('IsActive').value




    this._ClientService.create(this.Client).subscribe((Response) => {
      if (Response.message == '1') {
        this._toster.info("Successfully Saved!")
        this.router.navigateByUrl('/app/pages/sales/task-board-list');
      }
      else if (Response.message == '2') {
        this._toster.info("Successfully Updated!")
        this.router.navigateByUrl('/app/pages/sales/task-board-list');
      }
      else if (Response.message == '0') {
        this._toster.error("Client Code Already Exist")
      }
      else {
        this._toster.error(Response.message)
      }


    })

  }

  Back(): void {
    this.router.navigateByUrl('/app/pages/sales/task-board-list');

  }

  loadCities(stateId): void {
    
    this.CityList = null
    this.SecUserService.getCitiesByState(stateId).subscribe((Response) => {
      this.CityList = Response
    })
  }

  loadCountries(): void {
    
    this.SecUserService.getCountries().subscribe((Response) => {
      this.CountryList = Response
      let countryId = 0;
      this.loadState(countryId);
    })
  }

  loadState(countryId): void {
    this.StateList = [];
    this.SecUserService.getStateByCountryId(countryId).subscribe((Response) => {
      this.StateList = Response
      this.CityList = [];
    })
  }
}
