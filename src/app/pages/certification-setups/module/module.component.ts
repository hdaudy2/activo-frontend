import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {Observable} from 'rxjs';
import { PagedRequestModel } from '@shared/Dto/paged-Request-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { ActivatedRoute, Router} from '@angular/router';
import repaintFloatingActionButton from 'devextreme/ui/speed_dial_action/repaint_floating_action_button';
import { DxListModule } from "devextreme-angular";
import {  DxDataGridModule,DxDataGridComponent,DxSpeedDialActionModule,DxSelectBoxModule} from 'devextreme-angular';
import { DxTreeListModule } from "devextreme-angular";
import { Employee, EmployeesService } from '@app/pages/sales/employees.service';
import DataSource from 'devextreme/data/data_source';
import { BrowserModule } from '@angular/platform-browser';
import {ModuleService} from 'shared/Services/module-service';
import { DxContextMenuModule } from "devextreme-angular";
import { IndentRequestService } from '@shared/Services/indent-request-service';
import { ModuleModel } from '@shared/Dto/Module-model';
import { ToastrService } from 'ngx-toastr';






//for test file
import { HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";
//import { EventEmitter, Injectable, InjectionToken } from "@angular/core";
//import { AppConsts } from "../AppConsts";
//import { LibraryResourceModel } from "../Dto/Library-Resource_model";
import { BehaviorSubject } from "rxjs";
import { TagContentType } from '@angular/compiler';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {  ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { create } from 'lodash-es';



import { TabsetComponent } from 'ngx-bootstrap/tabs';


import {StandardService} from 'shared/Services/standard-service';
import {StandardModel} from 'shared/Dto/standard-model';

import dxNumberBox from 'devextreme/ui/number_box';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  public item: ModuleModel = new ModuleModel();
  ModuleForm = new FormGroup({
    // Id: new FormControl(''),
    Id: new FormControl(''),
    Name: new FormControl(''),
    IsActive: new FormControl(''),
    Description: new FormControl(''),
    Code: new FormControl(''),
   
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
  public ModuleList = []
  public moduleList = [];
  public StatusList=[];
  fileToUpload: any;

  submitted = false;
get f() { return this.ModuleForm.controls; }
  LibraryForm = new FormGroup({
   
    ModuleId: new FormControl(''),
    
  
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

  constructor(service: EmployeesService,
    private indentRequestService : IndentRequestService,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    private _toster: ToastrService,
    private route: ActivatedRoute,
     public ModuleService: ModuleService,
     private router : Router)
      { this.edit = this.edit.bind(this); 
        this.NewRecord=this.NewRecord.bind(this);
        this.delete=this.delete.bind(this);
      }

  ngOnInit(): void {
    
    
    this.loadSecRoleForm();
    this.loadStatus();
    this.onSearch()
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
  
   // this.ModuleForm.controls.Code.setValue(e.row.data.code);
    this.ModuleForm.controls.Name.setValue(e.row.data.name);
    this.ModuleForm.controls.Description.setValue(e.row.data.description);
    this.ModuleForm.controls.Code.setValue(e.row.data.code);
   

  // this.CertificateForm.controls.StartDate.setValue(e.row.data.startdate);
    //let req = new Date(this.datePipe.transform(e.row.data.startDate, 'yyyy/MM/dd'))

     //this.CertificateForm.controls.StartDate.setValue(this.datePipe.transform(req, 'yyyy/MM/dd'))

    if(e.row.data.isActive==true){
    this.ModuleForm.controls.IsActive.setValue(1);
    }else{this.ModuleForm.controls.IsActive.setValue(0);}
    
    // });
    // this.router.navigate(['app/pages/stock-management/library']);
      //this.router.navigate(["account/login"]);
  // this.router.navigateByUrl('/app/pages/certification-setups/Standard?'+this.id);  
}  

onTableDataChange(event) {
  this.pagedDto.page = event;
  this.onSearch();
}
loadSecRoleForm() {
    
  this.formName = "Modules"
  this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      
    let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
      
    this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)

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
  onSubmit(): void {
    
   this.item =new ModuleModel();
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.ModuleForm.invalid) {
     this._toster.error("Some fields are required ");
      return;
    }

    if(this.id>0 && this.id!=null && this.id!=undefined && this.id!=NaN)
    {
          this.item.Id = this.id
    }

this.item.Name=this.ModuleForm.get('Name').value
this.item.Description=this.ModuleForm.get('Description').value
this.item.Code=this.ModuleForm.get('Code').value
if(this.ModuleForm.get('IsActive').value==1)
{
  this.item.IsActive=true;

}
else
{ 
  this.item.IsActive=false;

}
// this.item.IsDeleted=this.CertificateForm.get('IsDeleted').value

      this.ModuleService.create(this.item).subscribe((Response)=>{
 
    this._toster.info(Response.message)
    this.reloadGrid();
    
   
   })
}
onSearch(){
  
    
  this.pagedDto.keyword = this.keyword
  this.pagedDto.authAllowed = this.secRoleForm.authAllowed
  //this.pagedDto.pageSize = 3
  this.ModuleService.Get(this.pagedDto).subscribe((Response) => {
              
  
    this.totalCount = Response.totalCount
    this.ModuleList = Response.moduleModel
  })
}
loadStatus(): void {
    
  const item = {
    id: 1,
    name:'Active',
  };
 this.StatusList.push(item);
 const item2 = {
  id: 0,
  name:'InActive',
  };
this.StatusList.push(item2);

  } 

  reloadGrid()
 
 {

   this.pagedDto.page =1;
   this.onSearch();
 }

 NewRecord()

 
 {  
  this.ModuleForm.controls.Name.setValue('');
  this.ModuleForm.controls.Description.setValue('');
  this.ModuleForm.controls.Code.setValue('');
  this.ModuleForm.controls.IsActive.setValue('');
}
delete(e) {
  
    //  this._toster.confirm((""),
    //  undefined,
    //      (result: boolean) => {
    //          if (result) {
    //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //            //     this._toster.info("Deleted successfully", "Status", {});
 
                  
                   
    //          }
    //        }
    //   )
    this.ModuleService.Delete(e.row.data.id).subscribe((Response)=>{
  
      this._toster.info(Response.message)
      this.onSearch();
     
     })
    }
}
