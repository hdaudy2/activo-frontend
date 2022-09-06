
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
  selector: 'app-user-professional',
  templateUrl: './user-professional.component.html',
  styleUrls: ['./user-professional.component.css']
})
export class UserProfessionalComponent implements OnInit {


  //public UserDeclaration: UserDeclarationModel = new UserDeclarationModel();
  UserProfessionalForm = new FormGroup({
    // Id: new FormControl(''),
    Qualification: new FormControl(''),
    Details: new FormControl(''),
    Body: new FormControl(''),
    Year: new FormControl('', Validators.minLength(4)),
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
  public UserProsissionalList = [];

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
      this.delete = this.delete.bind(this);
     this.DownloadProfesional=this.DownloadProfesional.bind(this)  }

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

  get f() { return this.UserProfessionalForm.controls; }

  onSubmit(): void 
  {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.UserProfessionalForm.invalid) {
      this._toster.error("Some fields are required ");
      return;
    }
  
    // if(this.SecUserForm.get('UserName').value ==null ||this.SecUserForm.get('UserName').value==undefined|| this.SecUserForm.get('UserName').value=="")
    // {  this._toster.error("User Name required","Alert")
    // return
    // // MesseageError="Module is Empty";
    // }
    // if(this.SecUserForm.get('Email').value ==null ||this.SecUserForm.get('Email').value==undefined|| this.SecUserForm.get('Email').value=="")
    // {  this._toster.error("Email Address required","Alert")
    // return
    // // MesseageError="Module is Empty";
    // }
    // if(this.SecUserForm.get('UserTypeId').value ==null ||this.SecUserForm.get('UserTypeId').value==undefined|| this.SecUserForm.get('UserTypeId').value=="")
    // {  this._toster.error("User Type  required","Alert")
    // return
    // MesseageError="Module is Empty";
    //}
  const foData:FormData = new FormData();
  foData.append('Qualification',this.UserProfessionalForm.get('Qualification').value);
  if (this.id != undefined && this.id != null && this.id>0 ) {
    foData.append("Id",this.id.toString());
  }
  else 
  {
    if (this.fileToUpload != null && this.fileToUpload != "" && this.fileToUpload != undefined && this.fileToUpload != undefined && this.fileToUpload != NaN && this.fileToUpload != undefined && this.fileToUpload != "" && this.fileToUpload != undefined && this.fileToUpload != '') {


    }
    else {

      this._toster.error("Please Upload Document File!", "Document File required");
      return;
    }
  }
 
  foData.append('UserId',this.Userid.toString());
  foData.append('Details',this.UserProfessionalForm.get('Details').value);
   foData.append('Body',this.UserProfessionalForm.get('Body').value);
   foData.append('Year',this.UserProfessionalForm.get('Year').value);
 
   foData.append('DocumentFile',this.fileToUpload);
   var LoginUserId =localStorage.getItem('userId');
 
   foData.append('CreatedBy',LoginUserId);
 



this._UserStandardService.UserProfessionalCreateWithFile(foData).subscribe((Response)=>{
 
     this._toster.info(Response.message)
    // window.location.reload();
  this.reloadGrid();
  this.ClearAllFielsd();
    
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
      
        this.UserProfessionalForm.controls.Qualification.setValue(e.row.data.qualification);
        this.UserProfessionalForm.controls.Details.setValue(e.row.data.details);
        this.UserProfessionalForm.controls.Body.setValue(e.row.data.body);
        this.UserProfessionalForm.controls.Year.setValue(e.row.data.year);
        this.UserProfessionalForm.controls.Year.setValue(e.row.data.year);
       
        


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
  this._UserStandardService.GetPagedUserProfessional(this.pagedDto).subscribe((Response) => {
              
  
    this.totalCount = Response.totalCount
    this.UserProsissionalList = Response.userProfessionalModel
    //this .Liststandard=this.StandardList;
  })
}

ClearAllFielsd()
{
  this.UserProfessionalForm.controls.Qualification.setValue('');
  this.UserProfessionalForm.controls.Details.setValue('');
  this.UserProfessionalForm.controls.Body.setValue('');
  this.UserProfessionalForm.controls.Year.setValue('');
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
 
    //                this._UserStandardService.UserProfessionalDeleteById(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onSearch();
                    
    //                 })
                   
    //          }
    //        }
    //   )
    this._UserStandardService.UserProfessionalDeleteById(e.row.data.id).subscribe((Response)=>{
  
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
    var fillename=e.row.data.title;
   
  //   this.LibraryResourceService.downloadFile(this.id).subscribe((result:Blob)=>{
  //     const Blb =new Blob([result], { type: result.type });
  //     // const url=window.URL.createObjectURL(Blb);
  //     // window.open(url);
  //     // console.log("success");
    
  //     
  //     const a = document.createElement('a');
  //       a.setAttribute('style', 'display:none;');
  //       document.body.appendChild(a);
  //      a.download =fillename;  
  //      // const fileName =
        
  //       //="farooq";
  //       a.href = URL.createObjectURL(Blb);
  //       a.target = '_blank';
  //       a.click();
  //       document.body.removeChild(a);
        
  //   })
   }

   DownloadProfesional(e): void {
     
    if(e.row.data.documentsFilePath!=null && e.row.data.documentsFilePath!=undefined && e.row.data.documentsFilePath!=NaN && e.row.data.documentsFilePath!="" && e.row.data.documentsFilePath!='')
    {
    this.id=e.row.data.id;
   // var fillename=e.row.data.title;
   var fillename="Document File";
    this._UserStandardService.downloadProfessionaldocuments(this.id).subscribe((result:Blob)=>{
      const Blb =new Blob([result], { type: result.type });
      // const url=window.URL.createObjectURL(Blb);
      // window.open(url);
      // console.log("success");
    
      
      const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
      // a.download =fillename;  
       // const fileName =
        
        //="farooq";
        a.href = URL.createObjectURL(Blb);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
        
    })
  }
  else{this._toster.error("File Not Exsit", "Alert")}
   }

}
