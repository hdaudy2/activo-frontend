
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
  selector: 'app-user-remarks',
  templateUrl: './user-remarks.component.html',
  styleUrls: ['./user-remarks.component.css']
})
export class UserRemarksComponent implements OnInit {

  
 ngAfterViewInit() : void {
    this.editUser()
   
  }
  ngOnInit(): void
   {
  }

  
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
  public UserRemarksList = [];
  public ApprovalList = [];
  public AuditorTypeList=[];
  public ContractTypeList=[];
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
    {   this.editRecord=this.editRecord.bind(this);  }
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
    onSearch(){
      
        
      this.pagedDto.keyword = this.Userid.toString();
      this.pagedDto.authAllowed = true;
      //this.pagedDto.pageSize = 3
      this._UserStandardService.GetUserRemarks(this.pagedDto).subscribe((Response) => {
                  
      
        this.totalCount = Response.totalCount
        this.UserRemarksList = Response.userRemarksModel
        //this .Liststandard=this.StandardList;
      })
    }

    
onTableDataChange(event) {
  this.pagedDto.page = event;
  this.onSearch();
}








onTableSizeChange(event): void {
  this.pagedDto.pageSize = event.target.value;
  this.onSearch();
} reloadGrid()
 
{

  this.pagedDto.page =1;
  this.onSearch();
}
editRecord(e)
{
  
  // var userId=item;
  var urlink=e;
  this.router.navigateByUrl(e+this.Userid)

}

btnforReview(e) {
   
  
  if (e.row.data.approvalStatusId=="3" || e.row.data.approvalStatusId=="10003")
   {
   return e.row.isEditing;
 }
 
   else
   {
     
     return !e.row.isEditing;
   }
 
 
 }
 
}
