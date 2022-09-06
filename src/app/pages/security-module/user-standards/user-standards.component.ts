import { ActivatedRoute } from '@angular/router';



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


import { UserStandardService } from 'shared/Services/User-Standard-service';
import { UserStandardModel } from 'shared/Dto/Userstandard-model';
import { ToastrService } from 'ngx-toastr';
import { DxListModule } from "devextreme-angular";
import { DxDataGridModule, DxDataGridComponent, DxSpeedDialActionModule, DxSelectBoxModule } from 'devextreme-angular';
import { DxTreeListModule } from "devextreme-angular";
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import DataSource from 'devextreme/data/data_source';
import { BrowserModule } from '@angular/platform-browser';
import { DxContextMenuModule } from "devextreme-angular";
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import dxNumberBox from 'devextreme/ui/number_box';
import { DatePipe } from '@angular/common';
import { SecUserService } from '@shared/Services/sec-user.service';
import { UserReviewComponent } from '../user-review/user-review.component';

@Component({
  selector: 'app-user-standards',
  templateUrl: './user-standards.component.html',
  styleUrls: ['./user-standards.component.css']
})
export class UserStandardsComponent implements OnInit {

  public UserStandar: UserStandardModel = new UserStandardModel();
  UserStandardForm = new FormGroup({
    // Id: new FormControl(''),
    StandardId: new FormControl(''),
    AuditorTypeId: new FormControl(''),
    CourseTypeId: new FormControl(''),
    CourseDate: new FormControl(''),
    PreValidDate: new FormControl(''),
    ValidationDate: new FormControl(''),
     ApprovalStatusId: new FormControl(''),

    // IsDeleted: new FormControl(''),

  })
  datePipe = new DatePipe("en-US");

  @Input() formName: string
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  pageNumber: number = 1
  pageSize: number = 10
  public isEditShown: boolean
  public isViewShown: boolean
  public isAddShown: boolean
  public keyword: string = ''
  public StandardList = [];
  public UserStandardList = [];
  public ApprovalList = [];
  public AuditorTypeList = [];
  public CourseTypeList = [];
  public Username: any;
  submitted = false;
  fileToUpload: any;

  public UserStatusList = []

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
    private _toster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _makerAuthorizerFormService: MakerAuthorizerFormService
    //public StandardService: StandardService
  ) {
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this)
    this.Downloadfile=this.Downloadfile.bind(this)
    this.SubmitForreview=this.SubmitForreview.bind(this);

  }

  ngOnInit(): void {
    
    this.loadStandard()
    this.loadAuditorType()

    this.loadCourseType()
    this.loadApprovalStatus()
    this.editUser()



  }
  ngAfterViewInit(): void {
    this.onSearch();

  }
  Userid: number
  editUser() {
    
    var ur;
    ur = window.location.href.split("/")[7];
    var com = [] = ur.split("?")[1];
    if (com != undefined && com != null) {
      var PId = com.split("=")[0];
      this.Userid = PId;

      // this.pagedDto.keyword = this.Userid.toString();
      // this.pagedDto.authAllowed = true;
      // this._UserStandardService.Get(this.Userid).subscribe(data => {

      //   this.UserStandardList= data


      // })

      //document.getElementById(this.Username).innerHTML = "FArooq";

      //  this.onSearch(this.userUpdateId);
    }

  }


  loadApprovalStatus(): void {

    this._UserStandardService.getAllApprovalStatus().subscribe((Response) => {
      this.ApprovalList = Response

    })
  }
  loadAuditorType(): void {
    var OrganizationId =parseInt(localStorage.getItem('organizationId'));
    this._UserStandardService.getAllAuditorTypes(OrganizationId).subscribe((Response) => {
      this.AuditorTypeList = Response

    })
  }
  loadCourseType(): void {

    this._UserStandardService.getAllCourseTypes().subscribe((Response) => {
      this.CourseTypeList = Response

    })
  }

  loadStandard(): void {

    this._UserStandardService.getAllStandard().subscribe((Response) => {
      this.StandardList = Response

    })
  }
  get f() { return this.UserStandardForm.controls; }
  onSubmit(): void {
debugger
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.UserStandardForm.invalid) {
      this._toster.error("Some fields are required ");
      return;
    }
    const foData:FormData = new FormData();
    //this.UserStandar= new UserStandardModel();

    if (this.id != undefined && this.id != null && this.id > 0) {
      this.UserStandar.Id = this.id;
    }
    this.UserStandar.ApprovelStatusId =(this.UserStandardForm.get('ApprovalStatusId').value)
    this.UserStandar.StandardId = parseInt(this.UserStandardForm.get('StandardId').value)
    this.UserStandar.AuditorTypeId = parseInt(this.UserStandardForm.get('AuditorTypeId').value)
    this.UserStandar.CourseTypeId = parseInt(this.UserStandardForm.get('CourseTypeId').value)
    if (this.UserStandardForm.get('CourseDate').value != null && this.UserStandardForm.get('CourseDate').value != undefined && this.UserStandardForm.get('CourseDate').value != NaN && this.UserStandardForm.get('CourseDate').value != "" && this.UserStandardForm.get('CourseDate').value != '') { this.UserStandar.CourseDate = this.UserStandardForm.get('CourseDate').value }
    //else{this.UserStandar.CourseDate=null}
    if (this.UserStandardForm.get('PreValidDate').value != null && this.UserStandardForm.get('PreValidDate').value != undefined && this.UserStandardForm.get('PreValidDate').value != NaN && this.UserStandardForm.get('PreValidDate').value != "" && this.UserStandardForm.get('PreValidDate').value != '') { this.UserStandar.PreValidDate = this.UserStandardForm.get('PreValidDate').value }
    //else{this.UserStandar.PreValidDate=null}
    if (this.UserStandardForm.get('ValidationDate').value != null && this.UserStandardForm.get('ValidationDate').value != undefined && this.UserStandardForm.get('ValidationDate').value != NaN && this.UserStandardForm.get('ValidationDate').value != "" && this.UserStandardForm.get('ValidationDate').value != '') { this.UserStandar.ValidationDate = this.UserStandardForm.get('ValidationDate').value }
    //else{this.UserStandar.ValidationDate=null}
    
      // if (this.fileToUpload != null && this.fileToUpload != "" && this.fileToUpload != undefined && this.fileToUpload != undefined && this.fileToUpload != NaN) {
  
  
      // }
      // else {
  
      //   this._toster.error("Please Upload Document File!", "Document File required");
      //   return;
      // }
    
    if(this.fileToUpload!=null && this.fileToUpload!=""&& this.fileToUpload!=''&& this.fileToUpload!=undefined &&this.fileToUpload!=NaN)
    {
      foData.append('DocumentFile',this.fileToUpload);
    }
    var LoginUserId = localStorage.getItem('userId');
    foData.append('CreatedById',LoginUserId);

    //this.UserStandar.CreatedBy = parseInt(LoginUserId)

    //this.UserStandar.UserId = this.Userid
    foData.append('UserId',this.Userid.toString());

    //this.UserStandar.LastModifiedBy = parseInt(LoginUserId)
    foData.append('LastModifiedBy',LoginUserId);
    Object.keys(this.UserStandardForm.controls).forEach(key => {
      if (this.UserStandardForm.controls[key].value != null && this.UserStandardForm.controls[key].value != "" && this.UserStandardForm.controls[key].value != undefined && this.UserStandardForm.controls[key].value != NaN &&this.UserStandardForm.controls[key].value != "" && this.UserStandardForm.controls[key].value !='') {
        var sname = key;
        //var sname= this.SLCPForm.controls[key].;
        var val = this.UserStandardForm.controls[key].value;
    
        foData.append(sname, val);
      }
    }),
    //   const foData:FormData = new FormData();
    //  // const foData
    //   foData.append('StandardId',this.UserStandardForm.get('StandardId').value);
    //   if (this.id != undefined || this.id != null) {
    //     foData.append("Id",this.id.toString());
    //   }
    //   foData.append('AuditorTypeId',this.UserStandardForm.get('AuditorTypeId').value);
    //    foData.append('CourseTypeId',this.UserStandardForm.get('CourseTypeId').value);
    //    foData.append('CourseDate',this.UserStandardForm.get('CourseDate').value);
    //    foData.append('PreValidDate',this.UserStandardForm.get('PreValidDate').value);
    //    foData.append('ValidationDate',this.UserStandardForm.get('ValidationDate').value);
    //    foData.append('ApprovalStatusId',this.UserStandardForm.get('ApprovalStatusId').value);


    //    foData.append('ValidationDate',this.UserStandardForm.get('ValidationDate').value);
    //    foData.append('ApprovalStatusId',this.UserStandardForm.get('ApprovalStatusId').value);
    //    var LoginUserId =localStorage.getItem('userId');
    //    foData.append('CreatedBy',LoginUserId);
    //    foData.append('UserId', this.Userid.toString());

    
    this._UserStandardService.create(foData).subscribe((Response) => {

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
    this.id = e.row.data.id
    // var updateDate =this.StandardList.find(x => x.id == this.id );

    // this._StandardService.GetStandardById(this.id).subscribe((res) => 
    // {
    
    this.UserStandardForm.controls.StandardId.setValue(e.row.data.standardId);
    this.UserStandardForm.controls.AuditorTypeId.setValue(e.row.data.auditorTypeId);
    this.UserStandardForm.controls.CourseTypeId.setValue(e.row.data.courseTypeId);
    if (e.row.data.courseDate != null && e.row.data.courseDate != undefined && e.row.data.courseDate != NaN && e.row.data.courseDate != "" && e.row.data.courseDate != '') {
      let req = new Date(this.datePipe.transform(e.row.data.courseDate, 'yyyy/MM/dd'))

      this.UserStandardForm.get('CourseDate').setValue(this.datePipe.transform(req, 'yyyy-MM-dd'))
    }
    if (e.row.data.preValidDate != null && e.row.data.preValidDate != undefined && e.row.data.preValidDate != NaN && e.row.data.preValidDate != "" && e.row.data.preValidDate != '') {
   
    let PreValid_Date = new Date(this.datePipe.transform(e.row.data.preValidDate, 'yyyy/MM/dd'))

    this.UserStandardForm.get('PreValidDate').setValue(this.datePipe.transform(PreValid_Date, 'yyyy-MM-dd'))
   
     } 
     if (e.row.data.validationDate != null && e.row.data.validationDate != undefined && e.row.data.validationDate != NaN && e.row.data.validationDate != "" && e.row.data.validationDate != '') {
   
     let Validation_Date = new Date(this.datePipe.transform(e.row.data.validationDate, 'yyyy/MM/dd'))

    this.UserStandardForm.get('ValidationDate').setValue(this.datePipe.transform(Validation_Date, 'yyyy-MM-dd'))
     }
  this.UserStandardForm.controls.ApprovalStatusId.setValue(e.row.data.approvalStatusId);


  }


  onTableDataChange(event) {
    this.pagedDto.page = event;
    this.onSearch();
  }








  onTableSizeChange(event): void {
    this.pagedDto.pageSize = event.target.value;
    this.onSearch();
  }

  onSearch() {
    

    this.pagedDto.keyword = this.Userid.toString();
    this.pagedDto.authAllowed = true;
    //this.pagedDto.pageSize = 3
    this._UserStandardService.Get(this.pagedDto).subscribe((Response) => {

      
      this.totalCount = Response.totalCount
      this.UserStandardList = Response.userStandardModel
console.log(this.UserStandardList)
      //this .Liststandard=this.StandardList;
    })
  }


  reloadGrid() {

    this.pagedDto.page = 1;
    this.onSearch();
  }

  NewRecord() {
    //window.location.reload();


    this.id = 0;
    // var updateDate =this.StandardList.find(x => x.id == this.id );

    // this._StandardService.GetStandardById(this.id).subscribe((res) => 
    // {
    
    this.UserStandardForm.controls.StandardId.setValue('');
    this.UserStandardForm.controls.AuditorTypeId.setValue('');
    this.UserStandardForm.controls.CourseTypeId.setValue('');
   
      this.UserStandardForm.get('CourseDate').setValue('')
    
    
    this.UserStandardForm.get('PreValidDate').setValue('')
   
     
    
    this.UserStandardForm.get('ValidationDate').setValue('')
     
    //this.UserStandardForm.controls.ApprovalStatusId.setValue(e.row.data.approvalStatusId);


  }
  delete(e) {
    
    // this._toster.confirm((""),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {
    //       // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //       //     this._toster.info("Deleted successfully", "Status", {});

    //       this._UserStandardService.Delete(e.row.data.id).subscribe((Response) => {

    //         this._toster.info(Response.message)
    //         this.onSearch();

    //       })

    //     }
    //   }
    // )
    this._UserStandardService.Delete(e.row.data.id).subscribe((Response) => {

      this._toster.info(Response.message)
      this.onSearch();

    })
  }

  editRecord(e) {
    
    // var userId=item;
    var urlink = e;
    this.router.navigateByUrl(e + this.Userid)
    
  }

  handlefileInput(e: any)
  {

this.fileToUpload= <File>e?.target?.files[0];
//this.url=e.target.value; 


  }

  Downloadfile(e): void {
     
  
    this.id=e.row.data.id;
   // var fillename=e.row.data.title;
   var fillename="Document File";
    this._UserStandardService.downloadFileStandard(this.id).subscribe((result:Blob)=>{
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
//     forReview(e) : void
//     {
//  this.UserStandardForm = e.row.data.approvalStatusId()

//  this.UserStandar.ApprovelStatusId =(this.UserStandardForm.get('ApprovalStatusId').value)
   
// }

SubmitForreview(e) 
{ 
  // debugger
  // if(e.row.data.approvalStatusId==1  )
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

  //               this._UserStandardService. SubmitForReviewStatus(e.row.data.id).subscribe((Response)=>{

  //                 this._toster.info(Response.message)
  //                 this.onSearch();
                 
  //                })
                
  //         }
  //       }
  //  )
  this._UserStandardService. SubmitForReviewStatus(e.row.data.id).subscribe((Response)=>{

    this._toster.info(Response.message)
    this.onSearch();
   
   })
     // }

}
btnforReview(e) 
{
   
  
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