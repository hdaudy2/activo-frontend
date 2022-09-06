import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import { IndentRequestService } from '@shared/Services/indent-request-service';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { ToastrService } from 'ngx-toastr';
import { StateModel } from '@shared/Dto/state-model';
import {StateService} from 'shared/Services/state-service';
import { SecUserService } from '@shared/Services/sec-user.service';
import { AuditReportService } from '@shared/Services/Audit-report-service';





//for test file
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from "@angular/common/http";
//import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
//import { AppConsts } from "../AppConsts";
//import { LibraryResourceModel } from "../Dto/Library-Resource_model";
import { BehaviorSubject, Observable } from "rxjs";
import { TagContentType } from '@angular/compiler';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {  ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { create } from 'lodash-es';


import { RoleFormService } from '@shared/Services/sec-role-service'
import { RoleFormModel } from '@shared/Dto/role-form-model';

import { SecRoleFormModel } from '@shared/Dto/sec-role-form-model';import { TabsetComponent } from 'ngx-bootstrap/tabs';


import {StandardService} from 'shared/Services/standard-service';
import {StandardModel} from 'shared/Dto/standard-model';

import { DxListModule } from "devextreme-angular";
import {  DxDataGridModule,DxDataGridComponent,DxSpeedDialActionModule,DxSelectBoxModule} from 'devextreme-angular';
import { DxTreeListModule } from "devextreme-angular";

import DataSource from 'devextreme/data/data_source';
import { BrowserModule } from '@angular/platform-browser';
import { DxContextMenuModule } from "devextreme-angular";

import dxNumberBox from 'devextreme/ui/number_box';
import { DatePipe } from '@angular/common';
import { LibraryResourceService } from '@shared/Services/library-Resource_service';
import { ClientService } from '@shared/Services/Client-Service';
import * as path from 'path';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { SA8000Service } from  '@shared/Services/project-SA8000-service';
import { NgModule, enableProdMode } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ClientAuditVisitService } from '@shared/Services/Client-Audit-visit-service';
@Component({
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.css']
})
export class AuditReportComponent implements OnInit {
  
  public item: StateModel = new StateModel();
  AuditReportForm = new FormGroup({
    // Id: new FormControl(''),
    AuditDocumentTypeId: new FormControl(''),
    File: new FormControl(''),
   
  })

  employees: Employee[] = [];
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
  public DocumentsList=[]
  public ReportMasterList=[]
  public DocumentsTypeList=[]
  public projyctcodelist=[]
  submitted = false;
  fileToUpload: any;
  Projectcode:string;
  StandardName:string;
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

  constructor(service: EmployeesService,
    private indentRequestService : IndentRequestService,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    public SecUserService : SecUserService,
    private _toster: ToastrService,
    private route: ActivatedRoute,
     public AuditReportService: AuditReportService,
     private _ClientAuditVisitService: ClientAuditVisitService,
     private router : Router) 
      { this.edit = this.edit.bind(this); 
      this.NewRecord=this.NewRecord.bind(this);
      this.delete=this.delete.bind(this);
    this.Downloadfile=this.Downloadfile.bind(this)}

  ngOnInit(): void  {
    
    
    //this.loadSecRoleForm();
    this.GetAllDocumentsType();
    this.editUser();
    //this.onSearch();
    
  }
  AuditVisitId: number
  ProjectId:number
  editUser()
  {
      //  
      // var  ur ;
      // ur=window.location.href.split("/")[7];
      // var com=[]=ur.split("?")[1];
      // if(com!=undefined && com!=null)
      // {
      // var PId=com.split("=")[0];
      // this.AuditVisitId=PId;
      // this.onSearch();
    // this.ClientService.GetUserDeclaration(this.Userid).subscribe(data => {
        
    //   this.UserDeclarationList= data
      
    // })
  //  this.onSearch(this.userUpdateId);


  var  ur ;
  ur=window.location.href.split("/")[7];
  var com=[]=ur.split("?")[1];
  if(com!=undefined && com!=null)
  {
    var Parameter1=com.split("&")[0];
    var Parameter2=com.split("&")[1];

  
   if(Parameter1.split("=")[0]=="AuditVisitId")
   {
      this.AuditVisitId =Parameter1.split("=")[1];
   }
   else if(Parameter1.split("=")[0]=="ProjectId")
   {
    this.ProjectId =Parameter1.split("=")[1];
   }
   
   if(Parameter2.split("=")[0]=="AuditVisitId")
   {
      this.AuditVisitId =Parameter2.split("=")[1];
   }
   else if(Parameter2.split("=")[0]=="ProjectId")
   {
    this.ProjectId =Parameter2.split("=")[1];
   }
  //  this.ClientVisitForm.controls.ProjectId.setValue(this.projectId);
  //  this.ClientVisitForm.get('ProjectId').disable();
  this.LoadProjectCode();
  this.onSearch();
  }
    
  }
  id: number
  ReportMasterid: number

  edit(e) {  
     
// var List = [];
// List=this.Liststandard                                                                             ; 
// this.router.navigateByUrl('/app/pages/stock-management/library');
this.id=e.row.data.id
// var updateDate =this.StandardList.find(x => x.id == this.id );

// this._StandardService.GetStandardById(this.id).subscribe((res) => 
// {

 // this.ModuleForm.controls.Code.setValue(e.row.data.code);
  this.AuditReportForm.controls.AuditDocumentTypeId.setValue(e.row.data.auditDocumentTypeId);
  this.ReportMasterid=e.row.data.auditReportMasterId;
 
  

// this.CertificateForm.controls.StartDate.setValue(e.row.data.startdate);
  //let req = new Date(this.datePipe.transform(e.row.data.startDate, 'yyyy/MM/dd'))

   //this.CertificateForm.controls.StartDate.setValue(this.datePipe.transform(req, 'yyyy/MM/dd'))


  // });
  // this.router.navigate(['app/pages/stock-management/library']);
    //this.router.navigate(["account/login"]);
// this.router.navigateByUrl('/app/pages/certification-setups/Standard?'+this.id);  
}  


delete(e) {
  
    //  abp.message.confirm((""),
    //  undefined,
    //      (result: boolean) => {
    //          if (result) {
    //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //            //     this._toster.info("Deleted successfully", "Status", {});
 
    //                this.AuditReportService.AuditReportDeleteById(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onSearch();
                    
    //                 })
                   
    //          }
    //        }
    //   )
    this.AuditReportService.AuditReportDeleteById(e.row.data.id).subscribe((Response)=>{
  
      this._toster.info(Response.message)
      this.onSearch();
     
     })
  }

onTableDataChange(event) {
  this.pagedDto.page = event;
  this.onSearch();
}
// loadSecRoleForm() {

//   
    
//   this.formName = "AuditReport"
//   this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      
//     //let formName = (this.formName == undefined ? localStorage.getItem('AuditReport') : this.formName)
      
//     this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)

//   //this.isEditShown= this.secRoleForm.authAllowed
//   // this.isViewShown = this.secRoleForm.authAllowed

//   // var formName = "User"
//   // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
//   //   this.secRoleForm = data.find(x => x.formName.toLocaleLowerCase() == formName.toLocaleLowerCase())
//     if(this.secRoleForm.authAllowed == true )
//     {
//       this.isViewShown = true
//       if(this.secRoleForm.updateAllowed==true)
//       {
//       this.isEditShown = true
//       }
//       else
//       {
//         this.isEditShown = false
//       }
//       if(this.secRoleForm.insertAllowed==true)
//       {
//           this.isAddShown = true
//           }
//           else
//           {
//             this.isAddShown = false
//           }
//     }
//     else{
//       this.isViewShown = false
//       this.isEditShown = false
//     }
//     //this.isViewShown = this.secRoleForm.authAllowed
//   })
    
// } 


onTableSizeChange(event): void {
  this.pagedDto.pageSize = event.target.value;
  this.onSearch();

 }

//   onSubmit(): void {
//     

//   if(this.id>0){this.item.Id=this.id}

// // this.item.Id=this.DocumentTypeForm.get('Id').value
// this.item.Name=this.AuditReportForm.get('Name').value

// // var userId =localStorage.getItem('userId');
// // this.item.CreatedBy=parseFloat(userId);


// // this.item.IsDeleted=this.CertificateForm.get('IsDeleted').value

//       this.AuditReportService.CreateWithFile(this.item).subscribe((Response)=>{
 
//     this._toster.info(Response.message)
//     this.reloadGrid();
//     this.NewRecord();
   
//    })
// }

onSearch(){
  
    
  this.pagedDto.keyword = this.keyword
  this.pagedDto.authAllowed = true
  //this.pagedDto.pageSize = 3
  //this.AuditReportService.GetPagedAuditReport(this.pagedDto).subscribe((Response) => {
    this.AuditReportService.GetPagedAuditReportById(this.AuditVisitId,this.pagedDto).subscribe((Response) => {
  
    this.totalCount = Response.totalCount
    this.DocumentsList = Response.auditVisitReportMasterModel
     this.ReportMasterList= Response.auditVisitReportModel
  })
}


reloadGrid()
 
{

  this.pagedDto.page =1;
  this.onSearch();
}

NewRecord()
 {  



   this.id=0;
  this.AuditReportForm.controls.AuditDocumentTypeId.setValue('');
  this.AuditReportForm.controls.File.setValue('');
  this.fileToUpload=null;
}
handlefileInput(e: any)
{

this.fileToUpload= <File>e?.target?.files[0];
//this.url=e.target.value; 


}
Downloadfile(e): void {
   

  this.id=e.row.data.id;
 // var fillename=e.row.data.title;
 var fillename=e.row.data.auditDocumentName;
  this.AuditReportService.downloadFile(this.id).subscribe((result:Blob)=>{
    const Blb =new Blob([result], { type: result.type });
    // const url=window.URL.createObjectURL(Blb);
    
    // window.open(url);
    // console.log("success");
  
    
    const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
     a.download =fillename;  
     // const fileName =
      
      //="farooq";
      a.href = URL.createObjectURL(Blb);
      a.target = '_blank';
      a.click();
      document.body.removeChild(a);
      
  })
 }
 get f() { return this.AuditReportForm.controls; }
  onSubmit(): void 
  {

   let auditvisitid= this.AuditVisitId;
  
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.AuditReportForm.invalid) {
      this._toster.error("Some fields are required ");
      return;
    }
    var LoginUserId =localStorage.getItem('userId');
  const foData:FormData = new FormData();
  
  if (this.id != undefined && this.id != null && this.id>0 ) 
  {
    //foData.append('CreatedById',LoginUserId);
    foData.append("Id",this.id.toString());
  }
  else
   {
    if (this.fileToUpload != null && this.fileToUpload != "" && this.fileToUpload != undefined && this.fileToUpload != undefined && this.fileToUpload != NaN) {

     
    }
    else
     {

      this._toster.error("Please Upload Document File!", "Document File required");
      return;
    }
  }
  foData.append('File',this.fileToUpload);
  foData.append('AuditDocumentTypeId',this.AuditReportForm.get('AuditDocumentTypeId').value);
  foData.append('ClientAuditVisitId',this.AuditVisitId.toString());
  foData.append('ProjectId',this.ProjectId.toString());
  if (this.id != undefined && this.id != null && this.id>0 ) 
  {
    foData.append('CreatedById',LoginUserId);
    foData.append('ReportMasterid',this.ReportMasterid.toString());
   
  }
  else{ foData.append('LastModifiedById',LoginUserId);}
  



  //  foData.append('Qualification',this.UserAcademicForm.get('Qualification').value);
  //  foData.append('Details',this.UserAcademicForm.get('Details').value);
  //  foData.append('Institution',this.UserAcademicForm.get('Institution').value);
  //  foData.append('StartYear',this.UserAcademicForm.get('StartYear').value);
  //  foData.append('EndYear',this.UserAcademicForm.get('EndYear').value);
   
 
  

//formData

// 
// let data ={
//   File:this.fileToUpload,
//   Title:'Title',
//   Version:'Version',
//   ModuleId:'ModuleId',
//   Description:'Description',
//   Reviewer:'Reviewer',
//   CertificationId:'CertificationId',
//   StatusId:'StatusId',
//   DocumentTypeId:'DocumentTypeId',


//}

this.AuditReportService.CreateWithFile(foData).subscribe((Response)=>{
 
     this._toster.info(Response.message)
     this.reloadGrid();
     this.NewRecord();
    
    })
   // window.location.reload();
    // this.LibraryResourceService.create(this.item).subscribe((Response)=>{
 
    // //  this._toster.info(Response.message)
     
    //  })

  
  

      //this.LibraryResourceService.create(this.item).subscribe((Response)=>{
      
 }

 GetAllDocumentsType(): void {

  this.AuditReportService.GetAllDocumentsType().subscribe((Response) => {
    
    this.DocumentsTypeList = Response

  })
}

LoadProjectCode(): void
{


 this._ClientAuditVisitService.GetProjectCodeById(this.ProjectId).subscribe((Response)=>{
   //this.projyctcodelist = Response
     this.Projectcode=Response.projectCode
     this.StandardName=Response.standardName
 })
}
}
