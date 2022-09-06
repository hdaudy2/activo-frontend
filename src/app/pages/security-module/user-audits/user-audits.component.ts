
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
import{ UserAuditModel} from'@shared/Dto/user-audit-model';

@Component({
  selector: 'app-user-audits',
  templateUrl: './user-audits.component.html',
  styleUrls: ['./user-audits.component.css']
})
export class UserAuditsComponent implements OnInit {

  public UserAudit: UserAuditModel = new UserAuditModel();
  UserAuditForm = new FormGroup({
    // Id: new FormControl(''),
    Organization: new FormControl(''),
    StandardId: new FormControl(''),
    Duration: new FormControl(''),
    Year: new FormControl('', Validators.minLength(4)),
    EacodeId: new FormControl(''),
  
    NaceCodeId: new FormControl(''),
    AuditTypeId: new FormControl(''),
    CertificationBodyId: new FormControl(''),
    AuditLevel: new FormControl(''),
    // IsDeleted: new FormControl(''),
   
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
  public UserAuditList = [];
  public ApprovalList = [];
  public NaceCodeList=[];
  public EAcodeList=[];
  public UserConsultancyList=[];
  public AuditTypeList=[];
  public CertificationBodyList=[];
  submitted = false;

 get f() { return this.UserAuditForm.controls; }
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
    // private route: Router,
     private _toster: ToastrService,
     private router: Router,
     private route: ActivatedRoute,
    private _makerAuthorizerFormService: MakerAuthorizerFormService
     //public StandardService: StandardService
    ) 
    {    this.edit = this.edit.bind(this);
      this.delete = this.delete.bind(this);
      this.editRecord =this.editRecord.bind(this); }

  ngOnInit(): void {

this.loadStandard();
this.loadNaceCode();
   this.loadEaCode();
   this.loadAuditTypeId();
   this.loadCertificationBody();
    //this.onSearch();
   
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
        
    //   this.UserAuditList= data
      
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
    

    this.UserAudit= new UserAuditModel();
    this.submitted = true;
    
        // stop here if form is invalid
        if (this.UserAuditForm.invalid) {
          this._toster.error("Some fields are required ");
          return;
        }

   
    if (this.id != undefined || this.id != null&& this.id>0) {
      this.UserAudit.Id=this.id;
    }
    else
    {
      this.UserAudit.Id=0;
    }
    this.UserAudit.Organization=this.UserAuditForm.get('Organization').value
    this.UserAudit.StandardId=parseInt(this.UserAuditForm.get('StandardId').value)
    this.UserAudit.Duration=parseInt(this.UserAuditForm.get('Duration').value)
    this.UserAudit.Year=parseInt(this.UserAuditForm.get('Year').value)
    this.UserAudit.NaceCodeId=parseInt(this.UserAuditForm.get('NaceCodeId').value)
   
    this.UserAudit.EacodeId=parseInt(this.UserAuditForm.get('EacodeId').value)
    this.UserAudit.AuditTypeId=parseInt(this.UserAuditForm.get('AuditTypeId').value)
    this.UserAudit.CertificationBodyId=parseInt(this.UserAuditForm.get('CertificationBodyId').value)
    this.UserAudit.AuditLevel=this.UserAuditForm.get('AuditLevel').value
   
   
  
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

     
      this._UserStandardService.UserAuditCreate(this.UserAudit).subscribe((Response)=>{
 
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
      
        this.UserAuditForm.controls.Organization.setValue(e.row.data.organization);
        this.UserAuditForm.controls.StandardId.setValue(e.row.data.standardId);
        this.UserAuditForm.controls.Duration.setValue(e.row.data.duration);
        this.UserAuditForm.controls.Year.setValue(e.row.data.year);
        this.UserAuditForm.controls.NaceCodeId.setValue(e.row.data.naceCodeId)
        this.UserAuditForm.controls.EacodeId.setValue(e.row.data.eacodeId);
        this.UserAuditForm.controls.AuditTypeId.setValue(e.row.data.auditTypeId);
        this.UserAuditForm.controls.CertificationBodyId.setValue(e.row.data.certificationBodyId);
        this.UserAuditForm.controls.AuditLevel.setValue(e.row.data.auditLevel);
        

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
  
  this._UserStandardService.GetPagedUserAudit(this.pagedDto).subscribe((Response) => {
              
  
    this.totalCount = Response.totalCount
    this.UserAuditList = Response.userAuditModel
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
  this.UserAuditForm.controls.Organization.setValue('');
  this.UserAuditForm.controls.StandardId.setValue('');
  //this.UserConsultancyForm.controls.StandardId.setValue('');
  this.UserAuditForm.controls.Duration.setValue('');
  this.UserAuditForm.controls.Year.setValue('');
  this.UserAuditForm.controls.NaceCodeId.setValue('')
  this.UserAuditForm.controls.EacodeId.setValue('');
  this.UserAuditForm.controls.AuditTypeId.setValue('');
  this.UserAuditForm.controls.CertificationBodyId.setValue('');
  this.UserAuditForm.controls.AuditLevel.setValue('');
  
  
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
 
    //                this._UserStandardService.UserAuditDeleteById(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onSearch();
                    
    //                 })
                   
    //          }
    //        }
    //   )
    this._UserStandardService.UserAuditDeleteById(e.row.data.id).subscribe((Response)=>{
  
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
  loadAuditTypeId(): void {
      
    this._UserStandardService.GetAllAuditType().subscribe((Response)=>{
      this.AuditTypeList = Response
        
    })
  }
  loadCertificationBody(): void {
      
    this._UserStandardService.GetAllCertificationBody().subscribe((Response)=>{
      this.CertificationBodyList = Response
        
    })
  }

}

