
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
  selector: 'app-user-academic',
  templateUrl: './user-academic.component.html',
  styleUrls: ['./user-academic.component.css']
})
export class UserAcademicComponent implements OnInit {
 
 
  //public UserDeclaration: UserDeclarationModel = new UserDeclarationModel();
  UserAcademicForm = new FormGroup({
    // Id: new FormControl(''),
    Qualification: new FormControl(''),
    Details: new FormControl(''),
    Institution: new FormControl(''),
    StartYear: new FormControl(''),
    EndYear: new FormControl(''),
    File: new FormControl(''),
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
  public UserAcademicList = [];
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
      this.delete = this.delete.bind(this) 
    this.Downloadfile=this.Downloadfile.bind(this) }

  ngOnInit(): void {



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
  handlefileInput(e: any)
  {

this.fileToUpload= <File>e?.target?.files[0];
//this.url=e.target.value; 


  }
  get f() { return this.UserAcademicForm.controls; }
  onSubmit(): void 
  {

    
  
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.UserAcademicForm.invalid) {
      this._toster.error("Some fields are required ");
      return;
    }
  const foData:FormData = new FormData();
  
  if (this.id != undefined && this.id != null && this.id>0 ) {
    foData.append("Id",this.id.toString());
  }
  else {
    if (this.fileToUpload != null && this.fileToUpload != "" && this.fileToUpload != undefined && this.fileToUpload != undefined && this.fileToUpload != NaN) {


    }
    else {

      this._toster.error("Please Upload Document File!", "Document File required");
      return;
    }
  }
  foData.append('DocumentFile',this.fileToUpload);
   var LoginUserId =localStorage.getItem('userId');
  foData.append('CreatedById',LoginUserId);
  foData.append('UserId',this.Userid.toString());

  Object.keys(this.UserAcademicForm.controls).forEach(key => {
  if (this.UserAcademicForm.controls[key].value != null && this.UserAcademicForm.controls[key].value != "" && this.UserAcademicForm.controls[key].value != undefined && this.UserAcademicForm.controls[key].value != NaN &&this.UserAcademicForm.controls[key].value != "" && this.UserAcademicForm.controls[key].value !='') {
    var sname = key;
    //var sname= this.SLCPForm.controls[key].;
    var val = this.UserAcademicForm.controls[key].value;

    foData.append(sname, val);
  }
});

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

this._UserStandardService.UserAcademicCreateWithFile(foData).subscribe((Response)=>{
 
     this._toster.info(Response.message)
     this.reloadGrid();
     this.ClearAllFields();
    
    })
   // window.location.reload();
    // this.LibraryResourceService.create(this.item).subscribe((Response)=>{
 
    // //  this._toster.info(Response.message)
     
    //  })

  
  

      //this.LibraryResourceService.create(this.item).subscribe((Response)=>{
      
 }
 
//   onSubmit(): void {
//     
   
   
//     if (this.id != undefined || this.id != null) {
//       this.UserDeclaration.Id=this.id;
//     }
//     this.UserDeclaration.Qualification=this.UserAcademicForm.get('Qualification').value
//     this.UserDeclaration.Details=this.UserAcademicForm.get('Details').value
//     this.UserDeclaration.Institution=this.UserAcademicForm.get('Institution').value
//     this.UserDeclaration.StartYear=this.UserAcademicForm.get('StartYear').value
//     this.UserDeclaration.EndYear=this.UserAcademicForm.get('EndYear').value
   
//     this.UserDeclaration.ApprovalStatusId=this.UserAcademicForm.get('ApprovalStatusId').value

   
  
//   var LoginUserId =localStorage.getItem('userId');
//    this.UserDeclaration.CreatedBy=parseInt(LoginUserId)
//    this.UserDeclaration.UserId= this.Userid
//   //   const foData:FormData = new FormData();
//   //  // const foData
//   //   foData.append('Qualification',this.UserStandardForm.get('Qualification').value);
//   //   if (this.id != undefined || this.id != null) {
//   //     foData.append("Id",this.id.toString());
//   //   }
//   //   foData.append('Details',this.UserStandardForm.get('Details').value);
//   //    foData.append('Institution',this.UserStandardForm.get('Institution').value);
//   //    foData.append('StartYear',this.UserStandardForm.get('StartYear').value);
//   //    foData.append('EndYear',this.UserStandardForm.get('EndYear').value);
//   //    foData.append('ValidationDate',this.UserStandardForm.get('ValidationDate').value);
//   //    foData.append('ApprovalStatusId',this.UserStandardForm.get('ApprovalStatusId').value);

    
//   //    foData.append('ValidationDate',this.UserStandardForm.get('ValidationDate').value);
//   //    foData.append('ApprovalStatusId',this.UserStandardForm.get('ApprovalStatusId').value);
//   //    var LoginUserId =localStorage.getItem('userId');
//   //    foData.append('CreatedBy',LoginUserId);
//   //    foData.append('UserId', this.Userid.toString());

//      
//       this._UserStandardService.CreateUserDeclaration(this.UserDeclaration).subscribe((Response)=>{
 
//     this._toster.info(Response.message)
//     this.reloadGrid();
   
//    })
// }


id: number
  edit(e) {  
           
    // var List = [];
    // List=this.Liststandard                                                                             ; 
    // this.router.navigateByUrl('/app/pages/stock-management/library');
    this.id=e.row.data.id
    // var updateDate =this.StandardList.find(x => x.id == this.id );

    // this._StandardService.GetStandardById(this.id).subscribe((res) => 
    // {
      
        this.UserAcademicForm.controls.Qualification.setValue(e.row.data.qualification);
        this.UserAcademicForm.controls.Details.setValue(e.row.data.details);
        this.UserAcademicForm.controls.Institution.setValue(e.row.data.institution);
        this.UserAcademicForm.controls.StartYear.setValue(e.row.data.startYear);
        this.UserAcademicForm.controls.EndYear.setValue(e.row.data.endYear)
        


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
  this._UserStandardService.GetPagedUserAcademic(this.pagedDto).subscribe((Response) => {
              
  
    this.totalCount = Response.totalCount
    this.UserAcademicList = Response.userAcademicModel
    //this .Liststandard=this.StandardList;
  })
}

ClearAllFields()
{

  this.UserAcademicForm.controls.Qualification.setValue('');
  this.UserAcademicForm.controls.Details.setValue('');
  this.UserAcademicForm.controls.Institution.setValue('');
  this.UserAcademicForm.controls.StartYear.setValue('');
  this.UserAcademicForm.controls.EndYear.setValue('')
  this.UserAcademicForm.controls.File.setValue('')
  this.id=0;
}
  reloadGrid()
 
 {

   this.pagedDto.page =1;
   this.onSearch();
  
 }


delete(e) {
  
    //  this._toster.confirm((""),
    //  undefined,
    //      (result: boolean) => {
    //          if (result) {
    //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //            //     this._toster.info("Deleted successfully", "Status", {});
 
    //                this._UserStandardService.UserAcademicDeleteById(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onSearch();
                    
    //                 })
                   
    //          }
    //        }
    //   )
    this._UserStandardService.UserAcademicDeleteById(e.row.data.id).subscribe((Response)=>{
  
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


  Downloadfile(e): void {
     
  
    this.id=e.row.data.id;
   // var fillename=e.row.data.title;
   var fillename="Document File";
    this._UserStandardService.downloadFile(this.id).subscribe((result:Blob)=>{
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

 

}
