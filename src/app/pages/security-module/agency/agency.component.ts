//import { Component, OnInit } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, AfterViewInit, Component,ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
// import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { create } from 'lodash-es';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RoleFormService } from '@shared/Services/sec-role-service'
import { RoleFormModel } from '@shared/Dto/role-form-model';
import { Router } from '@angular/router';
import { SecRoleFormModel } from '@shared/Dto/sec-role-form-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { LibraryResourceService } from '@shared/Services/library-Resource_service';
import { AgencyModel } from '@shared/Dto/Agency-model';
import { ActivatedRoute} from '@angular/router';
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
import { AgencyService } from '@shared/Services/Agency-service';


@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css'],
  animations: [appModuleAnimation()]
})
export class AgencyComponent implements OnInit 
{ @ViewChild('content',{static: false}) content : ElementRef;
public id: number
public roleList = [];
  public CountryList=[];
  public StateList=[];
  public CityList=[];
  public ActiveStatusList=[];
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
    public isShown:boolean=false
  UserMaker: any;
  private userUpdateId: number
public Agncy: AgencyModel = new AgencyModel();
AgencyForm = new FormGroup({
  Code: new FormControl(''),
  Name: new FormControl(''),
  Description: new FormControl(''),
  ContactNumber: new FormControl(''),
  JoiningDate: new FormControl(''),
  Email: new FormControl('', Validators.email),
  ContactPerson: new FormControl(''),
  // PersonContactNumber: new FormControl(''),
  Address: new FormControl(''),
  CountryId: new FormControl(''),

  CityId: new FormControl(''),
  IsDeleted: new FormControl(''),
  UserName: new FormControl(''),
  Password: new FormControl(''),
  EmailForgotPassword: new FormControl('',Validators.email),
  StateId: new FormControl(''),
  RoleId: new FormControl(''),
  Address2: new FormControl(''),
  PostalCode: new FormControl(''),
  IsActive: new FormControl(''),
  
 
})
submitted = false;
get f() { return this.AgencyForm.controls; }
  constructor( public SecUserService : SecUserService,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    public RoleFormService : RoleFormService,
    public _AgencyService :  AgencyService,
    private router : Router,private _toster: ToastrService,) { }

  ngOnInit(): void {
    
    this. loadSecRoleForm()
    //this.loadCities()
    this.loadCountries()
    this.loadRoles()
    //this.loadState()
    this.loadActiveStatus();
  }
  ngAfterViewInit() : void {
    this.editUser()
    this.AgencyForm.get('RoleId').setValue(6);
    this.AgencyForm.get('RoleId').disable();
   
  }

  loadSecRoleForm() {
    // let secRoleForm = JSON.parse(localStorage.getItem('secRoleForm'))
    // let permission = secRoleForm.find(x => x.formCode != null && x.formCode == this.formCode)
      
    // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      
    //   let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
    //   this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)
    
    var formName = "Agency"
    this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      this.secRoleForm = data.find(x => x.formName == formName)
      this.isShown = this.secRoleForm.authAllowed
      if(this.secRoleForm.manageAllowed == true)
      {
        this.isManageAllowed = true

      }
      if(this.secRoleForm.authAllowed == false){
          

        this.isShownDeclineRemarks = this.secRoleForm.authAllowed
        this.isShownRejectOrAuthButton = true
        this.isMakerButtons = false
     
        this.isAuthAllowed =false     
      }
      else{
        this.isAuthAllowed=true
        this.isMakerButtons = true
        this.isDeclineRemarks = true
      }
        
    })
    
  }
  loadRoles(): void {
     
    
    var roleId= parseInt(localStorage.getItem('roleId'));
     this.RoleFormService.getroles(roleId).subscribe((Response)=>{
      this.roleList = Response
  
      //this.AgencyForm.get('RoleId').setValue(this.UserMaker.roleId);
      // Response['result'].forEach((element) => {
          
      //   const item = {
      //     id: element.id,
      //     name:
      //       element.name,
        
      //   };
      //  this.roleList.push(item);
      // });
     })
   }
  //  loadCities(): void {
  //     
  //   this.SecUserService.getCities().subscribe((Response)=>{
  //     this.CityList = Response
  //   })
  //   }
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


   onSubmit(): void 
  {
      
          
          this.submitted = true;

          // stop here if form is invalid
          if (this.AgencyForm.invalid) {
            this._toster.error("Some fields are required ");
            return;
          }
          var codelength = this.AgencyForm.get('Code').value
         
            if (codelength.length != 8) 
            {
              this._toster.error("Code Length should be 8 Character")
              return
            }
       
         
          if (this.id > 0 && this.id != null && this.id != undefined && this.id != NaN) {
            this.Agncy.Id = this.id
          }
          this.Agncy.Code = this.AgencyForm.get('Code').value
          this.Agncy.Name = this.AgencyForm.get('Name').value
          if (this.AgencyForm.get('JoiningDate').value != null && this.AgencyForm.get('JoiningDate').value != undefined && this.AgencyForm.get('JoiningDate').value != NaN&& this.AgencyForm.get('JoiningDate').value != "" && this.AgencyForm.get('JoiningDate').value != '') {
            this.Agncy.JoiningDate = this.AgencyForm.get('JoiningDate').value
          }
          //this.Agncy.JoiningDate = this.AgencyForm.get('JoiningDate').value
          this.Agncy.Description = this.AgencyForm.get('Description').value
      
          this.Agncy.ContactPerson=this.AgencyForm.get('ContactPerson').value
          this.Agncy.ContactNumber = this.AgencyForm.get('ContactNumber').value
          this.Agncy.Email = this.AgencyForm.get('Email').value
       
          this.Agncy.Address=this.AgencyForm.get('Address').value
          this.Agncy.Address2=this.AgencyForm.get('Address2').value
        

          this.Agncy.CountryId =parseInt( this.AgencyForm.get('CountryId').value)
          this.Agncy.StateId = parseInt( this.AgencyForm.get('StateId').value)
          this.Agncy.CityId = parseInt( this.AgencyForm.get('CityId').value)
          this.Agncy.PostalCode=this.AgencyForm.get('PostalCode').value
          this.Agncy.RoleId = parseInt(this.AgencyForm.get('RoleId').value)
          this.Agncy.UserName = this.AgencyForm.get('UserName').value
          this.Agncy.Password = this.AgencyForm.get('Password').value
          this.Agncy.EmailForgotPassword = this.AgencyForm.get('EmailForgotPassword').value
          if(this.AgencyForm.get('IsActive').value==1)
          {
            this.Agncy.IsActive =true;

          }
          else
          {
            this.Agncy.IsActive =false;

          }
          // this.Agncy.IsActive = this.AgencyForm.get('IsActive').value
     
      
     
      
      this._AgencyService.create(this.Agncy).subscribe((Response)=>
      {
       
          //  this._toster.info(Response.message)
          //  this.router.navigateByUrl('/app/pages/security-module/agency-task-board')
          if(Response.message=="0")
          {
            
            this._toster.error("User Already Exists!")
          }
          if(Response.message=="1")
          {
            
            this._toster.info("Successfully Inserted!")
            this.router.navigateByUrl('/app/pages/security-module/agency-task-board')
          }
          if(Response.message=="2")
          {
            this._toster.info("Successfully Updated!")
            this.router.navigateByUrl('/app/pages/security-module/agency-task-board')
          }
          if(Response.message=="3")
          {
            
            this._toster.error("Not Inserted!")
          }
          if(Response.message=="4")
          {
            
            this._toster.error("Code already exist!")
          }
          
          })
      
        }

        editUser()
        {
             
            var  ur ;
            ur=window.location.href.split("/")[7];
            var com=[]=ur.split("?")[1];
            if(com!=undefined && com!=null)
            {
            var PId=com.split("=")[0];
            this.id=PId;
          this._AgencyService.GeAgencyDatabyId(this.id).subscribe(data => {
              
           
            this.userUpdateId = data.id
            // this.UserMaker =
            var agencyData= data;
            if(this.userUpdateId != undefined)
            {
                //this.isResetButtonShow=true;
                // this.isResetPassword=false;
                // this.confrmPass = this.UserMaker.ConfirmPassword
                // this.pass = this.UserMaker.password
       
     //  this.AgencyForm.get('Id').setValue(agencyData.id);
       this.AgencyForm.get('Code').setValue(agencyData.code);
      this.AgencyForm.get('Name').setValue(agencyData.name);
      this.AgencyForm.get('Description').setValue(agencyData.description);
      // this.AgencyForm.get('JoiningDate').setValue(agencyData.joiningDate);
      this.AgencyForm.get('ContactPerson').setValue(agencyData.contactPerson);
      this.AgencyForm.get('ContactNumber').setValue(agencyData.contactNumber);
      this.AgencyForm.get('Email').setValue(agencyData.email);
      this.AgencyForm.get('Address').setValue(agencyData.address);
      this.AgencyForm.get('Address2').setValue(agencyData.address2);
      //this.AgencyForm.get('CountryId').setValue(agencyData.countryId);
      this.AgencyForm.get('CountryId').setValue(agencyData.countryId);
      this.loadState(agencyData.countryId);
      this.AgencyForm.get('StateId').setValue(agencyData.stateId);
      this.loadCities(agencyData.stateId);
      this.AgencyForm.get('CityId').setValue(agencyData.cityId);

      //this.AgencyForm.get('StateId').setValue(agencyData.stateId);
     // this.AgencyForm.get('CityId').setValue(agencyData.cityId);
      this.AgencyForm.get('PostalCode').setValue(agencyData.postalCode);
      let req = new Date(this.datePipe.transform(agencyData.joiningDate, 'yyyy/MM/dd'))
     
      this.AgencyForm.get('JoiningDate').setValue(this.datePipe.transform(req, 'yyyy-MM-dd'))
     
      this.AgencyForm.get('RoleId').setValue(agencyData.roleId);
      this.AgencyForm.get('UserName').setValue(agencyData.userName);
      this.AgencyForm.get('Password').setValue(agencyData.password);
      if(agencyData.isActive==true)
      {
        this.AgencyForm.get('IsActive').setValue(1);
      }
      else
     {
       this.AgencyForm.get('IsActive').setValue(0);
      }
      // this.AgencyForm.get('UserTypeId').setValue(this.agencyData.userTypeId);
      // this.AgencyForm.get('Password').disable();
      // this.AgencyForm.get('ConfirmPassword').disable();
      // this.AgencyForm.get('ConfirmPassword').setValue("Pakistan@123");
      // this.AgencyForm.get('Password').setValue("Pakistan@123");
      // this.AgencyForm.get('IsActive').setValue(this.agencyData.isActive);
      // this.AgencyForm.get('FirstName').setValue(this.agencyData.firstName);
       this.AgencyForm.get('EmailForgotPassword').setValue(agencyData.emailForgotPassword);
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

        loadActiveStatus(): void {
    
          this.SecUserService.getActiveStatus().subscribe((Response)=>{
            this.ActiveStatusList = Response
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
            this.StateList =null
            this.SecUserService.getStateByCountryId(countryId).subscribe((Response) => {
              this.StateList = Response
              this.CityList =null;
            })
          }
        
           loadCities(stateId): void {
            
            this.CityList = null
            this.SecUserService.getCitiesByState(stateId).subscribe((Response) => {
              this.CityList = Response
            })
          }

}
