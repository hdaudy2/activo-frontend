
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
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RoleFormService } from '@shared/Services/sec-role-service'
import { RoleFormModel } from '@shared/Dto/role-form-model';
import { Router } from '@angular/router';
import { SecRoleFormModel } from '@shared/Dto/sec-role-form-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

import { SecUserService } from '@shared/Services/sec-user.service';
import {UserStandardService} from 'shared/Services/User-Standard-service';

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
import{ UserAuditorNaceModel} from'@shared/Dto/User-Auditor-Nace';


@Component({
  selector: 'app-user-auditor',
  templateUrl: './user-auditor.component.html',
  styleUrls: ['./user-auditor.component.css']
})
export class UserAuditorComponent implements OnInit {

  public UserAudit: UserAuditorNaceModel = new UserAuditorNaceModel();
  UserAuditorNaceForm = new FormGroup({
    // Id: new FormControl(''),
   
    StandardId: new FormControl(''),
  
    EacodeId: new FormControl(''),
  
    NaceCodeId: new FormControl(''),
   
    ApprovalStatusId: new FormControl(''),

   
  })
  datePipe = new DatePipe("en-US");

  @Input() formName : string
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  pageNumber : number = 1
  pageSize : number = 10
  public isEditShown : boolean  
  public isViewShown : boolean  
  public isAddShown : boolean  
  public keyword : string = ''
  public StandardList = [];
  public UserAuditorNaceList = [];
  public ApprovalList = [];
  public NaceCodeList=[];
  public EAcodeList=[];
  public UserConsultancyList=[];
  public AuditTypeList=[];
  public CertificationBodyList=[];
  submitted = false;

 get f() { return this.UserAuditorNaceForm.controls; }
  fileToUpload: any;

 public UserStatusList=[]
 
  readonly allowedPageSizes = [5, 10, 'all'];
  readonly displayModes = [{ text: "Display Mode 'full'", value: "full" }, { text: "Display Mode 'compact'", value: "compact" }];
  displayMode = "full";
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  customizeColumns(columns) {
      columns[0].width = 70;
  }
  get isCompactMode() {
      return this.displayMode === "compact";
  }
  
  constructor( 
  //  private http: HttpClient,
    private _UserStandardService: UserStandardService,
    public SecUserService: SecUserService,
    // private route: Router,
     private _toster: ToastrService,
     private router: Router,
     private route: ActivatedRoute,
    private _makerAuthorizerFormService: MakerAuthorizerFormService
     //public StandardService: StandardService
    ) 
    {    this.edit = this.edit.bind(this);
      this.delete = this.delete.bind(this);
      this.editRecord =this.editRecord.bind(this); 
      this.AuditorSubmitForreview=this.AuditorSubmitForreview.bind(this);
    }

  ngOnInit(): void {

this.loadStandard();
this.loadNaceCode();
   this.loadEaCode();
  
  
   
  }
  ngAfterViewInit() : void {
    this.editUser()
   
  }
  Userid: number
  editUser()
  {
       
      var  ur ;
      ur=window.location.href.split("/")[7];
      var com=[]=ur.split("?")[1];
      if(com!=undefined && com!=null)
      {
      var PId=com.split("=")[0];
      this.Userid=PId;
      this.onSearch();
    // this._UserStandardService.GetUserAudit(this.Userid).subscribe(data => {
        
    //   this.UserAuditorNaceList= data
      
    // })
  //  this.onSearch(this.userUpdateId);
  }
    
  }
  loadNaceCode(): void {
      
    this._UserStandardService.getAllNaceCode().subscribe((Response)=>{
      this.NaceCodeList = Response
        
    })
  }
  loadEaCode(): void {
      
    this._UserStandardService.getAllEACode().subscribe((Response)=>{
      this.EAcodeList = Response
        
    })
  }
  onSubmit(): void {
    
    this.submitted = true;
    
        // stop here if form is invalid
        if (this.UserAuditorNaceForm.invalid) {
          this._toster.error("Some fields are required ");
          return;
        }
   
    if (this.id != undefined && this.id != null && this.id > 0) {
      this.UserAudit.Id=this.id;
    }
    else
    {
      this.UserAudit.Id=0;
    }

    this.UserAudit.ApprovelStatusId= (this.UserAuditorNaceForm.get('ApprovalStatusId').value)
  
    this.UserAudit.StandardId= parseInt(this.UserAuditorNaceForm.get('StandardId').value)
   
    
    this.UserAudit.NaceCodeId=parseInt(this.UserAuditorNaceForm.get('NaceCodeId').value)
   
    this.UserAudit.EacodeId=parseInt(this.UserAuditorNaceForm.get('EacodeId').value)
   
    
   
   
  
  var LoginUserId =localStorage.getItem('userId');
   this.UserAudit.CreatedBy=parseInt(LoginUserId)
   this.UserAudit.UserId= this.Userid
  //   const foData:FormData = new FormData();
  //  // const foData
  //   foData.append('Organization',this.UserStandardForm.get('Organization').value);
  //   if (this.id != undefined || this.id != null) {
  //     foData.append("Id",this.id.toString());
  //   }
  //   foData.append('StandardId',this.UserStandardForm.get('StandardId').value);
  //    foData.append('DurationDays',this.UserStandardForm.get('DurationDays').value);
  //    foData.append('Year',this.UserStandardForm.get('Year').value);
  //    foData.append('NaceCodeId',this.UserStandardForm.get('NaceCodeId').value);
  //    foData.append('ValidationDate',this.UserStandardForm.get('ValidationDate').value);
  //    foData.append('EacodeId',this.UserStandardForm.get('EacodeId').value);

    
  //    foData.append('ValidationDate',this.UserStandardForm.get('ValidationDate').value);
  //    foData.append('EacodeId',this.UserStandardForm.get('EacodeId').value);
  //    var LoginUserId =localStorage.getItem('userId');
  //    foData.append('CreatedBy',LoginUserId);
  //    foData.append('UserId', this.Userid.toString());

     
      this._UserStandardService.UserAuditorNaceCreate(this.UserAudit).subscribe((Response)=>{
 
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
    // {
      
     
        this.UserAuditorNaceForm.controls.StandardId.setValue(e.row.data.standardId);
      
        this.UserAuditorNaceForm.controls.NaceCodeId.setValue(e.row.data.naceCodeId)
        this.UserAuditorNaceForm.controls.EacodeId.setValue(e.row.data.eacodeId);
     
        

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
  
    
  this.pagedDto.keyword = this.Userid.toString();
  this.pagedDto.authAllowed = true;
  //this.pagedDto.pageSize = 3
  
  this._UserStandardService.GetPagedUserAuditorNace(this.pagedDto).subscribe((Response) => {
              
  
    this.totalCount = Response.totalCount
    this.UserAuditorNaceList = Response.userAuditorNaceModel
    console.log(this.UserAuditorNaceList)

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
 
  this.UserAuditorNaceForm.controls.StandardId.setValue('');
 
  this.UserAuditorNaceForm.controls.NaceCodeId.setValue('')
  this.UserAuditorNaceForm.controls.EacodeId.setValue('');
 
  
  this.id=0;
  //  window.location.reload();
  // this.ModuleForm.controls.Name.setValue('');
  //   this.ModuleForm.controls.Description.setValue('');
  //   this.ModuleForm.controls.Code.setValue('');
   



  //  let currentUrl = this.router.url;
  // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  // this.router.onSameUrlNavigation = 'reload';
  // this.router.navigate([currentUrl]);
   
 // this.router.navigateByUrl('/app/pages/certification-setups/module');

}
delete(e) {
  
    //  this._toster.confirm((""),
    //  undefined,
    //      (result: boolean) => {
    //          if (result) {
    //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //            //     this._toster.info("Deleted successfully", "Status", {});
 
    //                this._UserStandardService.UserAuditorNaceDeleteById(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onSearch();
                    
    //                 })
                   
    //          }
    //        }
    //   )
    this._UserStandardService.UserAuditorNaceDeleteById(e.row.data.id).subscribe((Response)=>{
  
      this._toster.info(Response.message)
      this.onSearch();
     
     })
  }

  editRecord(e)
  {
    
    // var userId=item;
    var urlink=e;
    this.router.navigateByUrl(e+this.Userid)

  }



  loadStandard(): void {
      
    this._UserStandardService.getAllStandard().subscribe((Response)=>{
      this.StandardList = Response
        
    })
  }

  AuditorSubmitForreview(e) 
{ 
  debugger
  // if(e.row.data.approvelStatusId==10003 || e.row.data.approvelStatusId==1  )
  // {
  //   this._toster.error("Can not Manage this user Because this record has been send For Review")

  // }
  // else{

  //this.id=e.row.data.approvelStatusId=10003;
  
  // this._toster.confirm(("Please make sure all the required information is entered. Are you sure to submit your application for review?"),
  // undefined,
  //     (result: boolean) => {
  //         if (result) {
  //           // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
  //           //     this._toster.info("Deleted successfully", "Status", {});

  //               this._UserStandardService.AuditorNaceSubmitForReviewStatus(e.row.data.id).subscribe((Response)=>{

  //                 this._toster.info(Response.message)
  //                 this.onSearch();
                 
  //                })
                
  //         }
  //       }
  //  )
  this._UserStandardService.AuditorNaceSubmitForReviewStatus(e.row.data.id).subscribe((Response)=>{

    this._toster.info(Response.message)
    this.onSearch();
   
   })

}
btnforReview(e) {
   
  
  if (e.row.data.approvalStatusId=="1" || e.row.data.approvalStatusId=="10002" ||e.row.data.approvalStatusId=="2")
   {
   return e.row.isEditing;
 }
 
   else
   {
     
     return !e.row.isEditing;
   }
 
 
 }
 
}

