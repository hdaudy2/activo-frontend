
//T.S

import { ActivatedRoute} from '@angular/router';



//for test file
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from "@angular/common/http";
//import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
//import { AppConsts } from "../AppConsts";
//import { LibraryResourceModel } from "../Dto/Library-Resource_model";
import { BehaviorSubject, Observable } from "rxjs";
import { TagContentType } from '@angular/compiler';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { create } from 'lodash-es';
import { FormControl, FormGroup } from '@angular/forms';

import { RoleFormService } from '@shared/Services/sec-role-service'
import { RoleFormModel } from '@shared/Dto/role-form-model';
import { Router } from '@angular/router';
import { SecRoleFormModel } from '@shared/Dto/sec-role-form-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';


import {StandardService} from 'shared/Services/standard-service';
import {StandardModel} from 'shared/Dto/standard-model';
import { ToastrService } from 'ngx-toastr';
import { DxListModule } from "devextreme-angular";
import {  DxDataGridModule,DxDataGridComponent,DxSpeedDialActionModule,DxSelectBoxModule} from 'devextreme-angular';
import { DxTreeListModule } from "devextreme-angular";
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import DataSource from 'devextreme/data/data_source';
import { BrowserModule } from '@angular/platform-browser';
import { DxContextMenuModule } from "devextreme-angular";
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import dxNumberBox from 'devextreme/ui/number_box';
import { DatePipe } from '@angular/common';
import { ClientService } from '@shared/Services/Client-Service';
import { SecUserService } from '@shared/Services/sec-user.service';
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-client-sites',
  templateUrl: './client-sites.component.html',
  styleUrls: ['./client-sites.component.css']
})
export class ClientSitesComponent implements OnInit {
  @Input() formName : string
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  pageNumber : number = 1
  pageSize : number = 6
  public isEditShown : boolean  
  public isViewShown : boolean  
  public isAddShown : boolean  
  public keyword : string = ''
  public CountryList=[];
  public StateList=[];
  public CityList=[];
  public ClientSitesList=[];
  fileToUpload: any;
  public CreatedById : number 
  public LastUpdatedId : number
 public StatusList=[]
 submitted = false;
 clientinfo: any;
 public Multisite:boolean=false
  ClientSitesForm = new FormGroup({
   
    SiteName: new FormControl(''),
    LegalStatus: new FormControl(''),
    OutsourceProductionProcessess: new FormControl(''),
    TotalEmployees: new FormControl(''),
    ShiftTimings: new FormControl(''),
    Address: new FormControl(''),
    CountryId: new FormControl(''),
    StateId: new FormControl(''),
    CityId: new FormControl(''),
  })
  readonly allowedPageSizes = [5, 10, 'all'];
  readonly displayModes = [{ text: "Display Mode 'full'", value: "full" }, { text: "Display Mode 'compact'", value: "compact" }];
  displayMode = "full";
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  div1: boolean=false;
  customizeColumns(columns) {
      columns[0].width = 70;
  }
  get isCompactMode() {
      return this.displayMode === "compact";
  }
  constructor( 
    //  private http: HttpClient,
      private ClientService: ClientService,
      private SecUserService: SecUserService,
      // private route: Router,
      //private _ClientService: ClientService,
       private _toster: ToastrService,
       private router: Router,
       private route: ActivatedRoute,
      private _makerAuthorizerFormService: MakerAuthorizerFormService
       //public StandardService: StandardService
      ) 
      {    this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this)  }
  
    ngOnInit(): void {
  
  
    // this.loadCities();
     this.loadCountries();
     //this.loadState();
     
      //this.onSearch();
     
    }
    ngAfterViewInit() : void {
      this.editUser()
     
    }

    // loadCities(): void {
    
    //   this.SecUserService.getCities().subscribe((Response)=>{
    //     this.CityList = Response
    //   })
    //   }
      // loadCountries(): void {
        
      //   this.SecUserService.getCountries().subscribe((Response)=>{
      //     this.CountryList = Response
      //   })
      //   }
    
      
          // loadState(): void {
        
          //   this.SecUserService.getState().subscribe((Response)=>{
          //     this.StateList = Response
          //   })
          //   }
            Clientid: number
    editUser()
    {
         
        var  ur ;
        ur=window.location.href.split("/")[7];
        var com=[]=ur.split("?")[1];
        if(com!=undefined && com!=null)
        {
        var PId=com.split("=")[0];
        this.Clientid=PId;
        this.onSearch();
       this.ClientData();
      // this.ClientService.GetUserDeclaration(this.Userid).subscribe(data => {
          
      //   this.UserDeclarationList= data
        
      // })
    //  this.onSearch(this.userUpdateId);
    }
      
    }
    get f() { return this.ClientSitesForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.ClientSitesForm.invalid) {
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
      
      var LoginUserId =localStorage.getItem('userId');
      if (this.id != undefined || this.id != null && this.id > 0 ) 
      {
       
    //  this.UserDeclaration.CreatedBy=parseInt(LoginUserId)
        this.LastUpdatedId=parseInt(LoginUserId);
        this.CreatedById=0;
      }
      else
      {
        this.id=0;
        this.LastUpdatedId=0;
        this.CreatedById=parseInt(LoginUserId);
      }
     const ClientSitesModel=
     
     {
     
       Id:this.id,
       ClientId :this.Clientid,
       SiteName :this.ClientSitesForm.get('SiteName').value,
       LegalStatus:this.ClientSitesForm.get('LegalStatus').value,
       OutsourceProductionProcessess:this.ClientSitesForm.get('OutsourceProductionProcessess').value,
       TotalEmployees:this.ClientSitesForm.get('TotalEmployees').value,
       ShiftTimings:this.ClientSitesForm.get('ShiftTimings').value,
       Address: this.ClientSitesForm.get('Address').value,
       CountryId: parseInt(this.ClientSitesForm.get('CountryId').value),
       StateId:parseInt(this.ClientSitesForm.get('StateId').value),
       CityId: parseInt(this.ClientSitesForm.get('CityId').value),
       CreatedById:this.CreatedById,
       LastModifiedById:this.LastUpdatedId
     };
     
      // if (this.id != undefined || this.id != null) {
      //   this.UserDeclaration.Id=this.id;
      // }
      // this.UserDeclaration.CompanyName=SiteName
      // this.UserDeclaration.ContractTypeId=this.UserDeclarationForm.get('ContractTypeId').value
      // this.UserDeclaration.Interest=this.UserDeclarationForm.get('Interest').value
      // this.UserDeclaration.StartYear=this.UserDeclarationForm.get('StartYear').value
      // this.UserDeclaration.EndYear=this.UserDeclarationForm.get('EndYear').value
     
      //this.UserDeclaration.ApprovalStatusId=this.UserDeclarationForm.get('ApprovalStatusId').value
  
     
    
    // var LoginUserId =localStorage.getItem('userId');
    //  this.UserDeclaration.CreatedBy=parseInt(LoginUserId)
    //  this.UserDeclaration.UserId= this.Userid
    //   const foData:FormData = new FormData();
    //  // const foData
    //   foData.append('CompanyName',this.UserStandardForm.get('CompanyName').value);
    //   if (this.id != undefined || this.id != null) {
    //     foData.append("Id",this.id.toString());
    //   }
    //   foData.append('ContractTypeId',this.UserStandardForm.get('ContractTypeId').value);
    //    foData.append('Interest',this.UserStandardForm.get('Interest').value);
    //    foData.append('StartYear',this.UserStandardForm.get('StartYear').value);
    //    foData.append('EndYear',this.UserStandardForm.get('EndYear').value);
    //    foData.append('ValidationDate',this.UserStandardForm.get('ValidationDate').value);
    //    foData.append('ApprovalStatusId',this.UserStandardForm.get('ApprovalStatusId').value);
  
      
    //    foData.append('ValidationDate',this.UserStandardForm.get('ValidationDate').value);
    //    foData.append('ApprovalStatusId',this.UserStandardForm.get('ApprovalStatusId').value);
    //    var LoginUserId =localStorage.getItem('userId');
    //    foData.append('CreatedBy',LoginUserId);
    //    foData.append('UserId', this.Userid.toString());
  
       
        this.ClientService.ClienSitesCreate(ClientSitesModel).subscribe((Response)=>{
   
      this._toster.info(Response.message)
      this.reloadGrid();
      this.NewRecord();
     })
  }
  
  
  id: number
    edit(e) {  
             
      // var List = [];
      // List=this.Liststandard                                                                             ; 
      // this.router.navigateByUrl('/app/pages/stock-management/library');
      this.id=e.row.data.id
      // var updateDate =this.StandardList.find(x => x.id == this.id );
  
      // this._StandardService.GetStandardById(this.id).subscribe((res) => 
      // { SiteName: new FormControl(''),
  
        
          // this.UserDeclarationForm.controls.CompanyName.setValue(e.row.data.companyName);
          this.ClientSitesForm.controls.SiteName.setValue(e.row.data.siteName);
          this.ClientSitesForm.controls.LegalStatus.setValue(e.row.data.legalStatus);
          this.ClientSitesForm.controls.OutsourceProductionProcessess.setValue(e.row.data.outsourceProductionProcessess);
          this.ClientSitesForm.controls.TotalEmployees.setValue(e.row.data.totalEmployees)
          this.ClientSitesForm.controls.ShiftTimings.setValue(e.row.data.shiftTimings);
          this.ClientSitesForm.controls.Address.setValue(e.row.data.address);
          // this.ClientSitesForm.controls.CountryId.setValue(e.row.data.countryId);
          // this.ClientSitesForm.controls.StateId.setValue(e.row.data.stateId);
          // this.ClientSitesForm.controls.CityId.setValue(e.row.data.cityId)
          this.ClientSitesForm.get('CountryId').setValue(e.row.data.countryId);
          this.loadState(e.row.data.countryId);
          this.ClientSitesForm.get('StateId').setValue(e.row.data.stateId);
          this.loadCities(e.row.data.stateId);
          this.ClientSitesForm.get('CityId').setValue(e.row.data.cityId);
     
  
  
     }  
   
  
  onTableDataChange(event) {
    this.pagedDto.page = event;
    this.onSearch();
  }
  
  
  
  
  
  
  
  
  onTableSizeChange(event): void {
    this.pagedDto.pageSize = event.target.value;
    this.onSearch();
  }
  
  onSearch(){
    
     
    this.pagedDto.keyword = this.Clientid.toString();
    this.pagedDto.authAllowed = true;
    //this.pagedDto.pageSize = 3
    this.ClientService.GetClientSitesData(this.pagedDto).subscribe((Response) => {
                
    
      this.totalCount = Response.totalCount
      this.ClientSitesList = Response.clientSitesModel
      //this .Liststandard=this.StandardList;
    })
  }
  
  
    reloadGrid()
   
   {
  
     this.pagedDto.page =1;
     this.onSearch();
   }
  
   NewRecord()
  
   
   {  
    // this.UserDeclarationForm.controls.CompanyName.setValue('');
    // this.UserDeclarationForm.controls.ContractTypeId.setValue('');
    // this.UserDeclarationForm.controls.Interest.setValue('');
    // this.UserDeclarationForm.controls.StartYear.setValue('');
    // this.UserDeclarationForm.controls.EndYear.setValue('')
    // this.UserDeclarationForm.controls.ApprovalStatusId.setValue('');
    this.id=null;
    this.ClientSitesForm.controls.SiteName.setValue('');
    this.ClientSitesForm.controls.LegalStatus.setValue('');
    this.ClientSitesForm.controls.OutsourceProductionProcessess.setValue('');
    this.ClientSitesForm.controls.TotalEmployees.setValue('')
    this.ClientSitesForm.controls.ShiftTimings.setValue('');
    this.ClientSitesForm.controls.Address.setValue('');
    this.ClientSitesForm.controls.CountryId.setValue('');
    this.ClientSitesForm.controls.StateId.setValue('');
    this.ClientSitesForm.controls.CityId.setValue('')
  }
  delete(e) {
    
      //  this._toster.confirm((""),
      //  undefined,
      //      (result: boolean) => {
      //          if (result) {
      //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
      //            //     this._toster.info("Deleted successfully", "Status", {});
   
      //                this.ClientService.DeleteSite(e.row.data.id).subscribe((Response)=>{
    
      //                  this._toster.info(Response.message)
      //                  this.onSearch();
                      
      //                 })
                     
      //          }
      //        }
      //   )
      this.ClientService.DeleteSite(e.row.data.id).subscribe((Response)=>{
    
        this._toster.info(Response.message)
        this.onSearch();
       
       })
        
    }
  
    editRecord(e)
    {
     // var count=this.ClientSitesList;
      
      // var userId=item;
      var urlink=e;
      this.router.navigateByUrl(e+this.Clientid)
  
    }
  
  
  
    Back(): void {this.router.navigateByUrl('/app/pages/sales/task-board-list'); }
   
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

    async ClientData() {
      // this.ClientService.GeClientDatabyPromiseId(this.Clientid).then((Response) => {

      //   console.log(Response);
        
      //   this.clientinfo = Response;
      //   if(!(this.id>0))
      //   {
      //     this.ClientSitesForm.controls.SiteName.setValue(this.clientinfo.name);
          
      //     this.ClientSitesForm.controls.CountryId.setValue( this.clientinfo.countryId);
      //     this.loadState(parseInt(this.clientinfo.countryId))
      //     this.ClientSitesForm.controls.StateId.setValue(this.clientinfo.stateId);
      //     this.loadCities(parseInt(this.clientinfo.stateId))
      //     this.ClientSitesForm.controls.CityId.setValue(this.clientinfo.cityId);

      //     this.Multisite= Response["multisite"];
      //   }

      // });

      debugger
      this.clientinfo = await this.ClientService.GeClientDatabyPromiseId(this.Clientid);

      if(!(this.id>0))
        {
          this.ClientSitesForm.controls.SiteName.setValue(this.clientinfo.name);
          
          this.ClientSitesForm.controls.CountryId.setValue( this.clientinfo.countryId);
          this.loadState(parseInt(this.clientinfo.countryId))
          this.ClientSitesForm.controls.StateId.setValue(this.clientinfo.stateId);
          this.loadCities(parseInt(this.clientinfo.stateId))
          this.ClientSitesForm.controls.CityId.setValue(this.clientinfo.cityId);
          this.ClientSitesForm.controls.Address.setValue(this.clientinfo.address);

          this.Multisite= this.clientinfo.multisite;
        }
    }

  }
  