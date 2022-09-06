
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
import{ UserDeclarationModel} from'@shared/Dto/user-declaration-model';

@Component({
  selector: 'app-user-declaration',
  templateUrl: './user-declaration.component.html',
  styleUrls: ['./user-declaration.component.css']
})
export class UserDeclarationComponent implements OnInit {

  public UserDeclaration: UserDeclarationModel = new UserDeclarationModel();
  UserDeclarationForm = new FormGroup({
    // Id: new FormControl(''),
    CompanyName: new FormControl(''),
    ContractTypeId: new FormControl(''),
    Interest: new FormControl(''),
    StartYear: new FormControl('', Validators.minLength(4)),
    ApprovalStatusId: new FormControl(''),
  
    EndYear: new FormControl(''),
    
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
  public UserDeclarationList = [];
  public ApprovalList = [];
  public AuditorTypeList=[];
  public ContractTypeList=[];
  submitted = false;

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
      this.delete = this.delete.bind(this)  }

  ngOnInit(): void {


this.loadApprovalStatus()
   this.loadContractType()
   
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
    // this._UserStandardService.GetUserDeclaration(this.Userid).subscribe(data => {
        
    //   this.UserDeclarationList= data
      
    // })
  //  this.onSearch(this.userUpdateId);
  }
    
  }
  loadApprovalStatus(): void {
      
    this._UserStandardService.getAllApprovalStatus().subscribe((Response)=>{
      this.ApprovalList = Response
        
    })
  }
  loadContractType(): void {
      
    this._UserStandardService.GetAllContractType().subscribe((Response)=>{
      this.ContractTypeList = Response
        
    })
  }
   get f() { return this.UserDeclarationForm.controls; }
  onSubmit(): void {
    
    this.submitted = true;
    
        // stop here if form is invalid
        if (this.UserDeclarationForm.invalid) {
          this._toster.error("Some fields are required ");
          return;
        }

    this.UserDeclaration= new UserDeclarationModel();
    if (this.id != undefined || this.id != null) {
      this.UserDeclaration.Id=this.id;
    }
    this.UserDeclaration.CompanyName=this.UserDeclarationForm.get('CompanyName').value
    this.UserDeclaration.ContractTypeId=parseInt(this.UserDeclarationForm.get('ContractTypeId').value)
    this.UserDeclaration.Interest=this.UserDeclarationForm.get('Interest').value
    this.UserDeclaration.StartYear=parseInt(this.UserDeclarationForm.get('StartYear').value)
    this.UserDeclaration.EndYear=parseInt(this.UserDeclarationForm.get('EndYear').value)
   
    //this.UserDeclaration.ApprovalStatusId=this.UserDeclarationForm.get('ApprovalStatusId').value

   
  
  var LoginUserId =localStorage.getItem('userId');
   this.UserDeclaration.CreatedBy=parseInt(LoginUserId)
   
   this.UserDeclaration.UserId= this.Userid
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

     
      this._UserStandardService.CreateUserDeclaration(this.UserDeclaration).subscribe((Response)=>{
 
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
      
        this.UserDeclarationForm.controls.CompanyName.setValue(e.row.data.companyName);
        this.UserDeclarationForm.controls.ContractTypeId.setValue(e.row.data.contractTypeId);
        this.UserDeclarationForm.controls.Interest.setValue(e.row.data.interest);
        this.UserDeclarationForm.controls.StartYear.setValue(e.row.data.startYear);
        this.UserDeclarationForm.controls.EndYear.setValue(e.row.data.endYear)
        this.UserDeclarationForm.controls.ApprovalStatusId.setValue(e.row.data.approvalStatusId);


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
  this._UserStandardService.GetUserDeclaration(this.pagedDto).subscribe((Response) => {
              
  
    this.totalCount = Response.totalCount
    this.UserDeclarationList = Response.userDeclarationsModel
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
  this.UserDeclarationForm.controls.CompanyName.setValue('');
  this.UserDeclarationForm.controls.ContractTypeId.setValue('');
  this.UserDeclarationForm.controls.Interest.setValue('');
  this.UserDeclarationForm.controls.StartYear.setValue('');
  this.UserDeclarationForm.controls.EndYear.setValue('')
  //this.UserDeclarationForm.controls.ApprovalStatusId.setValue('');
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
 
    //                this._UserStandardService.DeleteUserDeclaration(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onSearch();
                    
    //                 })
                   
    //          }
    //        }
    //   )
    this._UserStandardService.DeleteUserDeclaration(e.row.data.id).subscribe((Response)=>{
  
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




 

}
