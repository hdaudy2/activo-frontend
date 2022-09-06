// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-with-locations-task-board',
//   templateUrl: './user-with-locations-task-board.component.html',
//   styleUrls: ['./user-with-locations-task-board.component.css']
// })
// export class UserWithLocationsTaskBoardComponent implements OnInit {

//   public approval = [
    
//     {
//       dencode: "0001",
//       Name: "Muhammad Farooq",
//       Email: "m.farooq@gmail.com",
//       Role:"Auditor",
//     }, {
//       dencode: "0002",
//       Name: "Zahid",
//       Email: "m.Zahid@gmail.com",
//       Role:"Manager",
//     },{
//       dencode: "0003",
//       Name: "Arsalan",
//       Email: "m.arsalan@gmail.com",
//       Role:"Accountant",
//     }
//   ]
//   constructor() { }

//   ngOnInit(): void {
//   }

// }



import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { SecUserService } from '@shared/Services/sec-user.service';

import DataSource from 'devextreme/data/data_source';
import { BrowserModule } from '@angular/platform-browser';
import { DxContextMenuModule } from "devextreme-angular";
import { DxListModule } from "devextreme-angular";
import {  DxDataGridModule,DxDataGridComponent,DxSpeedDialActionModule,DxSelectBoxModule} from 'devextreme-angular';



import { FormControl, FormGroup } from '@angular/forms';

import { IndentRequestService } from '@shared/Services/indent-request-service'

import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {Observable} from 'rxjs';

import { ActivatedRoute} from '@angular/router';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';

import { DxTreeListModule } from "devextreme-angular";
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-with-locations-task-board',
  templateUrl: './user-with-locations-task-board.component.html',
  styleUrls: ['./user-with-locations-task-board.component.css']
}) 
// @Component({
//   selector: 'app-user-with-locations-task-board',
//   templateUrl: './user-with-locations-task-board.component.html',
//   styleUrls: ['./user-with-locations-task-board.component.css']
// })
export class UserWithLocationsTaskBoardComponent implements OnInit {
  @Output() tabIndexEmitter = new EventEmitter<object>();
  @Input() formName : string
  @Input() locationId: number

  public tabIndex: number = 1;
  secRoleForm
  isManageAllowed: boolean 
  public isAddShown : boolean 
  //public deletedbtn:boolean
  public isEditShown : boolean  
  public isViewShown : boolean  
  public userdata:any;
  public keyword : string = ''
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public user = []
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  ResetPasswordForm = new FormGroup({
   
    
    
     NewPassword: new FormControl(''),
     NewConfirmPassword: new FormControl(''),
     EmailForgotPassword: new FormControl(''),
 
 
   })

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
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    public SecUserService : SecUserService,
    private router : Router,
    private _toster: ToastrService,
  ) {  
    this.edit = this.edit.bind(this);  
    this.edittest=this.edittest.bind(this);
    this.delete=this.delete.bind(this);
    this.review=this.review.bind(this);
    this.SubmitForreview=this.SubmitForreview.bind(this);
    this.Remarks=this.Remarks.bind(this);
    this.resetpassword= this.resetpassword.bind(this);
    //  this.editIconClick = this.editIconClick.bind(this);  
    // this.Downloadfile=this.Downloadfile.bind(this);
  }
  
  Remarks(e)
  { 
    
   // var userId=item;
    //var urlink=e;app/pages/security-module/user-remarks
    this.router.navigateByUrl('app/pages/security-module/user-remarks?'+e.row.data.id)

  }
  ngOnInit(): void {
      
    this.tabIndexEmitter.emit({ "tabIndex" : undefined });

    this.loadSecRoleForm()
    this.reloadGrid()
    //this.onSearch()
  }
  ngAfterViewInit() : void {
    this.onSearch();
   
  }
//   edit(e) {  
//     
// //this.router.navigate([/app/pages/stock-management/library/']);  
// }  
 onTableDataChange(event) {
   
    this.pagedDto.page = event;
    this.onSearch();
  }
  reloadGrid()
  
  {

    this.pagedDto.page =1;
    this.onSearch();
  }
  loadSecRoleForm() {
      
    this.formName = "User"
    this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
        
      let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
        
      this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)
      debugger
      if(this.secRoleForm==undefined || this.secRoleForm=="" ||this.secRoleForm==null)
      {
      this.router.navigateByUrl('/app/home')
      }
      if(this.secRoleForm.manageAllowed == true)
      { 
        this.isManageAllowed = true

      }
      else
      {
        this.isManageAllowed = false;
    
      }
    //this.isEditShown= this.secRoleForm.authAllowed
    // this.isViewShown = this.secRoleForm.authAllowed

    // var formName = "User"
    // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
    //   this.secRoleForm = data.find(x => x.formName.toLocaleLowerCase() == formName.toLocaleLowerCase())
    if(this.secRoleForm.viewRecordAllowed == true )
    {
      this.isViewShown = true
      if(this.secRoleForm.updateAllowed==true)
      {
      this.isEditShown = true
      }
      else
      {
        this.isEditShown = false
      }
      if(this.secRoleForm.insertAllowed==true)
      {
          this.isAddShown = true
          }
          else
          {
            this.isAddShown = false
          }
    }
    else{
      this.isViewShown = false
      this.isEditShown = false
    }
      //this.isViewShown = this.secRoleForm.authAllowed
    })
      
  }
  id: number
//   editIconClick(e)
//    {  
//      
// // this.router.navigateByUrl('/app/pages/stock-management/library');
// this.id=e.row.data.id;
//   // this.router.navigate(['app/pages/stock-management/library']);
//     //this.router.navigate(["account/login"]);
// this.router.navigateByUrl('/app/pages/stock-management/user-with-locations?'+this.id);  
// }  

// Downloadfile(e): void {
//    

//   // this.id=e.row.data.id;
//   // var fillename=e.row.data.title;
//   // //this.LibraryResourceService.PostItemReturnListPagination().subscribe((result:Blob)=>
//   //  // const downloadedFile = new Blob([data.body], { type: data.body.type });
//   // this.LibraryResourceService.downloadFile(this.id).subscribe((result:Blob)=>{
//   //   const Blb =new Blob([result], { type: result.type });
//   //   // const url=window.URL.createObjectURL(Blb);
//   //   // window.open(url);
//   //   // console.log("success");
  
//   //   
//   //   const a = document.createElement('a');
//   //     a.setAttribute('style', 'display:none;');
//   //     document.body.appendChild(a);
//   //    a.download =fillename;  
    
      
     
//   //     a.href = URL.createObjectURL(Blb);
//   //     a.target = '_blank';
//   //     a.click();
//   //     document.body.removeChild(a);
      
//   // })
// }
  onTableSizeChange(event): void {
    
    this.pagedDto.pageSize = event.target.value;
    this.onSearch();
  }
  onSearch(){
    
    var OrganId;
    var  ur ;
     ur=window.location.href.split("/")[7];
    var com=[]=ur.split("?")[1];
    if(com!=undefined && com!=null)
    {
      OrganId=com.split("=")[0];
      this.isAddShown=false;
      this.isEditShown=false;
     // this.isManageAllowed=false;
    // if(thi==false)
    // {
    //   this.isAddShown=false;
    //   this.isEditShown=false;
    // }
    }
    else
    {
      OrganId=localStorage.getItem('organizationId');
    }
    this.pagedDto.keyword = this.keyword
    //this.pagedDto.authAllowed = this.secRoleForm.authAllowed
   // this.pagedDto.pageSize = 3
    this.SecUserService.Get(OrganId,this.pagedDto).subscribe((Response) => {
              
     
      this.totalCount = Response.totalCount
      this.user = Response.secUserModel
    })
  }

  // id: number
  // editIconClick(e) {  
  //          
  //   // this.router.navigateByUrl('/app/pages/stock-management/library');
  //   this.id=e.row.data.id;
  //       // this.router.navigate(['app/pages/stock-management/library']);
  //         //this.router.navigate(["account/login"]);
  //     this.router.navigateByUrl('/app/pages/stock-management/library?'+this.id);  
  //    }  
  displayStyle = "none";
  userId:number
  resetpassword(e)
   {
     
     this.userId=0;
    this.userId=e.row.data.id;
    this.userdata=e.row.data;
    this.ResetPasswordForm.get('EmailForgotPassword').setValue(e.row.data.emailForgotPassword);
    this.ResetPasswordForm.get('EmailForgotPassword').disable();
    this.displayStyle = "block";
  
  //this.router.navigateByUrl('/app/pages/stock-management/library?'+this.id);  
  }
 
  edit(e) {
    if(e.row.data.approvelStatusId==1)
    {
      this._toster.error("Can not Edit this user Because this record has been send For Review")

    }
    else
    {
    
    this.id=e.row.data.id;
    // var userdata=e.row.data;
    //  this.SecUserService.setUserWithLocations(e.row.data)
    // this.tabIndexEmitter.emit({ "tabIndex" : this.tabIndex });
   this.router.navigateByUrl('/app/pages/security-module/user-with-locations?'+this.id)
    }
  //this.router.navigateByUrl('/app/pages/stock-management/library?'+this.id);  
  }
 

  // openPopup() {
  //   this.displayStyle = "block";
  // }

  closePopup() {
    this.displayStyle = "none";
  }
  onView(item){
      
    item["onView"] = true
    this.SecUserService.setUserWithLocations(item)
    this.tabIndexEmitter.emit({ "tabIndex" : this.tabIndex });
  }
  review(e)
  { this.id=e.row.data.id;
    
   // var userId=item;
    //var urlink=e;
    this.router.navigateByUrl('/app/pages/security-module/user-review?'+this.id)

  }
  SubmitForreview(e) 
  { 
    if(e.row.data.approvelStatusId==1)
    {
      this._toster.error("Can not Manage this user Because this record has been send For Review")

    }
    else{

    this.id=e.row.data.id;
    
    // this._toster.confirm(("Please make sure all the required information is entered. Are you sure to submit your application for review?"),
    // undefined,
    //     (result: boolean) => {
    //         if (result) {
    //           // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //           //     this._toster.info("Deleted successfully", "Status", {});

    //               this.SecUserService.SubmitForReview(e.row.data.id).subscribe((Response)=>{
 
    //                 this._toster.info(Response.message)
    //                 this.onSearch();
                   
    //                })
                  
    //         }
    //       }
    //  )
    this.SecUserService.SubmitForReview(e.row.data.id).subscribe((Response)=>{
 
      this._toster.info(Response.message)
      this.onSearch();
     
     })
        }

  }
  edittest(e)
  {  if(e.row.data.approvelStatusId==1)
    {
      this._toster.error("Can not Manage this user Because this record has been send For Review")

    }
    else{
    this.id=e.row.data.id;
    
   // var userId=item;
    //var urlink=e;
    this.router.navigateByUrl('/app/pages/security-module/user-standards?'+this.id)

  }}
  delete(e) {
 

 if(e.row.data.approvelStatusId==1)
 {
   this._toster.error("Can not Delete this user Because this record has been send For Review")

 }
 else{
    // this._toster.confirm((""),
    // undefined,
    //     (result: boolean) => {
    //         if (result) {
    //           // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //           //     this._toster.info("Deleted successfully", "Status", {});

    //               this.SecUserService.Deleteuser(e.row.data.id).subscribe((Response)=>{
 
    //                 this._toster.info(Response.message)
    //                 this.onSearch();
                   
    //                })
                  
    //         }
    //       }
    //  )
    this.SecUserService.Deleteuser(e.row.data.id).subscribe((Response)=>{
 
      this._toster.info(Response.message)
      this.onSearch();
     
     })
  }
        }
     onCellPrepared (e) {
       
      if (e.row.data.approvelStatusId == "1") {
        e.row.Cells[2].Visible = false;
         
      }
  }
  UserSubmit(): void {
    

    if (this.ResetPasswordForm.get('NewConfirmPassword').value != this.ResetPasswordForm.get('NewPassword').value) {
      this._toster.error("Password doesn't match Confirm Password", "Alert")
      return
    }
    if (this.ResetPasswordForm.get('EmailForgotPassword').value == null || this.ResetPasswordForm.get('EmailForgotPassword').value == undefined || this.ResetPasswordForm.get('EmailForgotPassword').value == "") {
      this._toster.error("Email Address required", "Alert")
      return
      // MesseageError="Module is Empty";
    }
   
    var LoginUserId = localStorage.getItem('userId');
    const UserModel =

    {

      Id:this.userId ,
      Password: this.ResetPasswordForm.get('NewPassword').value,
      ConfirmPassword: this.ResetPasswordForm.get('NewConfirmPassword').value,
      EmailAddress: this.ResetPasswordForm.get('EmailForgotPassword').value,
      LastModifiedById: LoginUserId.toString(),

    }


    this.SecUserService.UCreate(UserModel).subscribe((Response) => {

      this._toster.info(Response.message)
      // this.router.navigateByUrl('/app/pages/security-module/agency')

    })
  }

  deletedbtn(e) {
     
    
    var LoginUserId =parseInt(localStorage.getItem('userId'));
  //  var tt= this.authorizer;
    if(LoginUserId == parseInt(e.row.data.id))
    {
  
    return e.row.isEditing;
    }
  
    else
    {
      
      return !e.row.isEditing;
    }
  
  
  
  }
  btnforReview(e) {
    debugger
    
        var Insert_Allow =localStorage.getItem('InsertAllow');
               debugger
      
                  if (Insert_Allow =="1" && e.row.data.approvalStatusId!="3" && e.row.data.approvalStatusId!="10003")
                   {
                   return !e.row.isEditing;
                 }
                 
                   else
                   {
                     
                     return e.row.isEditing;
                   }
                 
                 
                 }        
    
}
