
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
import { AgencyService } from '@shared/Services/Agency-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agency-task-board',
  templateUrl:'./agency-task-board.component.html',
  styleUrls: ['./agency-task-board.component.css']
})
export class AgencyTaskBoardComponent implements OnInit {
  public approval = [
    {
      dencode: "001",
      certificate: "Pakistan"
    }, {
      dencode: "002",
      certificate: "India"
    },{
      dencode: "003",
      certificate: "Bangladesh"
    }, {
      dencode: "004",
      certificate: "Iran"
    },{
      dencode: "005",
      certificate: "Iraq"
    }, {
      dencode: "006",
      certificate: "Dubai"
    }
  ]
  constructor(
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    public SecUserService : SecUserService,
    public _AgencyService :  AgencyService,
    private router : Router,
    private _toster: ToastrService,
  ) {  
    this.edit = this.edit.bind(this);  
    this.ManageRecord=this.ManageRecord.bind(this);
  this.delete=this.delete.bind(this)}
  @Output() tabIndexEmitter = new EventEmitter<object>();
  @Input() formName : string
  @Input() locationId: number

  public tabIndex: number = 1;
  secRoleForm
  isManageAllowed: boolean 
  public isAddShown : boolean 
  public isEditShown : boolean  
  public isViewShown : boolean  
  public keyword : string = ''
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public AgencyList = []
  public pagedDto: PagedRequestModel = new PagedRequestModel()


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
  ngOnInit(): void {
    this.loadSecRoleForm()
    this.onSearch()
  }
  id: number
  edit(e) {  
     

    this.id=e.row.data.id;
// this.router.navigateByUrl('/app/pages/stock-management/library');
//this.id=e.row.data.id;
  // this.router.navigate(['app/pages/stock-management/library']);
    //this.router.navigate(["account/login"]);
this.router.navigateByUrl('/app/pages/security-module/agency?'+this.id);  
}  
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
     
   this.formName = "Agency"
   this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
       
     let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
       
     this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)
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
   if(this.secRoleForm.authAllowed == true )
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
  if(this.isManageAllowed==false)
  {
    this.isAddShown=false;
    this.isEditShown=false;
  }
  }
  else
  {
    OrganId=localStorage.getItem('organizationId');
  }
  
  this.pagedDto.keyword = this.keyword
  this.pagedDto.authAllowed = this.secRoleForm.authAllowed
 // this.pagedDto.pageSize = 3
  this._AgencyService.Get(this.pagedDto).subscribe((Response) => 
  {
            
   
    this.totalCount = Response.totalCount
    this.AgencyList = Response.organizationModel
  })
}
ManageRecord(e)
{ this.id=e.row.data.id;
  
 // var userId=item;
  //var urlink=e;user-with-locations-task-board.component
  //this.router.navigateByUrl('/app/pages/security-module/user-standards?'+this.id)

  this.router.navigateByUrl('/app/pages/security-module/user-with-locations-task-board?'+this.id)

}
delete(e) {
  
    //  this._toster.confirm((""),
    //  undefined,
    //      (result: boolean) => {
    //          if (result) {
    //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //            //     this._toster.info("Deleted successfully", "Status", {});
 
    //                this._AgencyService.DeleteAgency(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onSearch();
                    
    //                 })
                   
    //          }
    //        }
    //   )
      this._AgencyService.DeleteAgency(e.row.data.id).subscribe((Response)=>{
  
        this._toster.info(Response.message)
        this.onSearch();
       
       })
    }
}
