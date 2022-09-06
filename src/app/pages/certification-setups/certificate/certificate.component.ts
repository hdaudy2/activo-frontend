
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


import {StandardService} from 'shared/Services/standard-service';
import {StandardModel} from 'shared/Dto/standard-model';
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



@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
  animations:[appModuleAnimation()]
})
export class CertificateComponent implements OnInit {

  public item: StandardModel = new StandardModel();
  CertificateForm = new FormGroup({
    // Id: new FormControl(''),
    Code: new FormControl('',Validators.minLength(3)),
    Name: new FormControl(''),
    Description: new FormControl(''),
    StartDate: new FormControl(''),
    IsActive: new FormControl(''),
    // IsDeleted: new FormControl(''),
   
  })
  datePipe = new DatePipe("en-US");

  @Input() formName : string
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  pageNumber : number = 1
  pageSize : number = 6
  public isEditShown : boolean  
  public isViewShown : boolean  
  public isAddShown : boolean  
  public keyword : string = ''
  public StandardList = [];
  public moduleList = [];
  public Liststandard = [];
  fileToUpload: any;
  submitted = false;
  get f() { return this.CertificateForm.controls; }
 public StatusList=[]
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
  
  constructor( 
  //  private http: HttpClient,
    private _StandardService: StandardService,
    // private route: Router,
     private _toster: ToastrService,
     private router: Router,
     private route: ActivatedRoute,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    
     //public StandardService: StandardService
    ) 
    {    this.edit = this.edit.bind(this);
      this.delete = this.delete.bind(this)  }

  ngOnInit(): void {


    this.loadSecRoleForm();
    this.loadStatus();
    this.onSearch();
   
  }


  onSubmit(): void {
    this.item= new StandardModel();
    this.submitted = true;
    if (this.CertificateForm.get('Code').value.length !=3) {
     this._toster.error("Standard Code should be 3 Character! ");
      return;
    }
    // stop here if form is invalid
    if (this.CertificateForm.invalid) {
      this._toster.error("Some fields are required ");
      return;
    }
    
    if(this.id>0 && this.id!=null && this.id!=undefined && this.id!=NaN)
    {
          this.item.Id = this.id
    }
  //var test=this.CertificateForm.get('Code').value
this.item.Code=this.CertificateForm.get('Code').value
this.item.Name=this.CertificateForm.get('Name').value
this.item.Description=this.CertificateForm.get('Description').value
if(this.CertificateForm.get('StartDate').value!=undefined && this.CertificateForm.get('StartDate').value!=null && this.CertificateForm.get('StartDate').value!=NaN && this.CertificateForm.get('StartDate').value!="" && this.CertificateForm.get('StartDate').value!='' )
{this.item.StartDate=this.CertificateForm.get('StartDate').value}


if(this.CertificateForm.get('IsActive').value==1)
{
  this.item.IsActive=true;

}
else
{ 
  this.item.IsActive=false;

}
// this.item.IsDeleted=this.CertificateForm.get('IsDeleted').value

      this._StandardService.create(this.item).subscribe((Response)=>{
 
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
      
        this.CertificateForm.controls.Code.setValue(e.row.data.code);
        this.CertificateForm.controls.Name.setValue(e.row.data.name);
        this.CertificateForm.controls.Description.setValue(e.row.data.description);
        let req = new Date(this.datePipe.transform(e.row.data.startDate, 'yyyy/MM/dd'))

this.CertificateForm.get('StartDate').setValue(this.datePipe.transform(req, 'yyyy-MM-dd'))

      // this.CertificateForm.controls.StartDate.setValue(e.row.data.startdate);
        //let req = new Date(this.datePipe.transform(e.row.data.startDate, 'yyyy/MM/dd'))

         //this.CertificateForm.controls.StartDate.setValue(this.datePipe.transform(req, 'yyyy/MM/dd'))

        if(e.row.data.isActive==true){
        this.CertificateForm.controls.IsActive.setValue(1);
        }else{this.CertificateForm.controls.IsActive.setValue(0);}
        
        // });
        // this.router.navigate(['app/pages/stock-management/library']);
          //this.router.navigate(["account/login"]);
      // this.router.navigateByUrl('/app/pages/certification-setups/Standard?'+this.id);  
   }  
 

onTableDataChange(event) {
  this.pagedDto.page = event;
  this.onSearch();
}
// loadSecRoleForm() {
//     
//   this.formName = "Standard"
//   this._StandardService.getSecRoleForm().subscribe((data) => {
      
//     let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
      
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



loadSecRoleForm() {
        
  this.formName = "Standard"
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

onSearch(){
  
    
  this.pagedDto.keyword = this.keyword
  this.pagedDto.authAllowed = this.secRoleForm.authAllowed
  //this.pagedDto.pageSize = 3
  this._StandardService.Get(this.pagedDto).subscribe((Response) => {
              
  
    this.totalCount = Response.totalCount
    this.StandardList = Response.standardModel
    //this .Liststandard=this.StandardList;
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
   //window.location.reload();
   this.id=null;
   this.CertificateForm.controls.Code.setValue('');
   this.CertificateForm.controls.Name.setValue('');
   this.CertificateForm.controls.Description.setValue('');
   this.CertificateForm.controls.StartDate.setValue('');
   this.CertificateForm.controls.IsActive.setValue('');

//this.CertificateForm.get('StartDate').setValue(this.datePipe.transform(req, 'yyyy-MM-dd'))



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
    this._StandardService.Delete(e.row.data.id).subscribe((Response)=>{
  
      this._toster.info(Response.message)
      this.onSearch();
     
     })
    }
}