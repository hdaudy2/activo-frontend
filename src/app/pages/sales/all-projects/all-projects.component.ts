
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
import { FormControl, FormGroup } from '@angular/forms';

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
import { LibraryResourceService } from '@shared/Services/library-Resource_service';
import { ClientService } from '@shared/Services/Client-Service';
import * as path from 'path';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { SA8000Service } from  '@shared/Services/project-SA8000-service';
import { NgModule, enableProdMode } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
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
  public ProjectsList = [];
  public ClientList=[];
  public ProjectsRemarksList = [];
  public isShown:boolean=false
  public authorizer:boolean=false
  public InsertAllow:boolean=false
  clientinfo: any;
  public Multisite:boolean=false
  authorizerVelue:number
  fileToUpload: any;

 public StatusList=[]
  ProjectForm = new FormGroup({
   
    checkbox: new FormControl(''),
    StandardId: new FormControl(''),
    ClientId: new FormControl(''),
    
  
  })
  readonly allowedPageSizes = [5, 10, 'all'];
  readonly displayModes = [{ text: "Display Mode 'full'", value: "full" }, { text: "Display Mode 'compact'", value: "compact" }];
  displayMode = "full";
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  div1: boolean=false;
  customizeColumns(columns) {
      columns[0].width = 70;
  }
  get isCompactMode() {
      return this.displayMode === "compact";
  }
  constructor(  
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    private _layoutStore: LayoutStoreService,  private _toster: ToastrService,
    private router: Router,
    private route: ActivatedRoute ,
    public LibraryResourceService: LibraryResourceService,
    public _SA8000Service: SA8000Service,
    
    public _ClientService :  ClientService,
    ) {  this.edit = this.edit.bind(this);
      this.review = this.review.bind(this);
      this.Remarks=this.Remarks.bind(this);
      this.SubmitForreview=this.SubmitForreview.bind(this);
      this.delete=this.delete.bind(this);
      this.Downloadfile=this.Downloadfile.bind(this);
      this.OnManageVisit=this.OnManageVisit.bind(this);
       }
       sidebarExpanded: boolean;
       events: string[] = [];
       opened: boolean;
  ngOnInit(): void {
    //this.loadSecRoleForm()
    this.loadAllCertification()
   this.editClient()
   //this.toggleSidebar()
  //  this._layoutStore.sidebarExpanded.subscribe((value) => {
  //   this.sidebarExpanded = value; });
  }

  
  
  
  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
  }
  ngAfterViewInit() : void {
    this.loadSecRoleForm()
    
   
  }
 public Clientid:number
  editClient()
  {
       
      var  ur ;
      ur=window.location.href.split("/")[7];
      var com=[]=ur.split("?")[1];
      if(com!=undefined && com!=null)
      {
      var PId=com.split("=")[0];
      this.Clientid=PId;
      //this.ClientData();
   
  //  this.onSearch(this.userUpdateId);
  }
    
  }
  
  loadSecRoleForm() {
    // let secRoleForm = JSON.parse(localStorage.getItem('secRoleForm'))
    // let permission = secRoleForm.find(x => x.formCode != null && x.formCode == this.formCode)
      
    // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      
    //   let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)
    //   this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)
    
    var formName = "AllProjects"

//this form name only for head office
    var formname2="AllAgencyProjects"
    this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      
      this.secRoleForm = data.find(x => x.formName == formName || x.formName==formname2)
      this.isShown = this.secRoleForm.authAllowed
     
      if(this.secRoleForm.authAllowed ==true  )
      {
        if(this.secRoleForm.formName=="AllAgencyProjects")
        
        {
          this.authorizer=true
          this.authorizerVelue=1;
          localStorage.removeItem('authorizer');
          localStorage.setItem('authorizer','1');

        }
        else
         
        {
          this.router.navigateByUrl('/app/home');


        }
       
      }
      else{
        this.authorizer=false
        this.authorizerVelue=2;
        localStorage.removeItem('authorizer');
        localStorage.setItem('authorizer','0');
      }
      if(this.secRoleForm.insertAllowed ==true)
      {

        localStorage.removeItem('manageAllowed');
        localStorage.setItem('manageAllowed','1');
      }
      else{
       
        localStorage.removeItem('manageAllowed');
        localStorage.setItem('manageAllowed','0');
      }
      if(this.secRoleForm.insertAllowed ==true)
      {
        localStorage.removeItem('InsertAllow');
        localStorage.setItem('InsertAllow','1');
        this.InsertAllow=true
      }
      else{ this.InsertAllow=false
        localStorage.removeItem('InsertAllow');
        localStorage.setItem('InsertAllow','0');}
      this.onSearch()
    })
    
  }

    


  onSearch(){
    
      if(this.authorizer==true )
      {
        this.pagedDto.keyword = this.keyword;
        this.pagedDto.authAllowed = true;
        this.Clientid=0;
        this._ClientService.GetAllProjects(this.Clientid,this.pagedDto).subscribe((Response) => {
                    
        
          this.totalCount = Response.totalCount
          this.ProjectsList = Response.clientProjectModel
          //this .Liststandard=this.StandardList;
        })
      }
      else{

    this.pagedDto.keyword = this.keyword;
    this.pagedDto.authAllowed = false;
    //this.pagedDto.pageSize = 3
    this._ClientService.GetAllProjects(this.Clientid,this.pagedDto).subscribe((Response) => {
                
    
      this.totalCount = Response.totalCount
      this.ProjectsList = Response.clientProjectModel
      //this .Liststandard=this.StandardList;
    })}
     
  }
  
  edit(e) { 
    if(e.row.data.approvalStatusId==4 || e.row.data.approvalStatusId==2)
    {
      this._toster.error("Can not Manage this user Because this record has been send For Review")

    }
    else{
    let ProjectId: number
     

    ProjectId=e.row.data.id

    this._ClientService.GetProjectFormUrlById(e.row.data.standardId).subscribe((Response) => {
                
   
  var FormPth  = Response.path
  
  // localStorage.removeItem('projectId');
  // localStorage.setItem('projectId',ProjectId.toString());
 // this.router.navigateByUrl(FormPth + ProjectId +"&"+ this.Clientid);
  // localStorage.removeItem('clientId');
  // localStorage.setItem('clientId',this.Clientid.toString());

  // localStorage.removeItem('standardId');
  // localStorage.setItem('standardId',e.row.data.standardId.toString());
 

 // this.router.navigateByUrl(FormPth + ProjectId);


  this.router.navigateByUrl(FormPth+"ProjectId="+ e.row.data.id +"&StandardId="+e.row.data.standardId+"&ClientId="+e.row.data.clientId );
   //this .Liststandard=this.StandardList;
 })
    }
 //this.router.navigateByUrl('/app/pages/certification-setups/Standard?'+this.id);  
} 
 onTableDataChange(event) {
  this.pagedDto.page = event;
   this.onSearch();
}
onTableSizeChange(event): void {
  this.pagedDto.pageSize = event.target.value;
 this.onSearch();
}

delete(e) {
  if(e.row.data.approvalStatusId==4 || e.row.data.approvalStatusId==2)
  {
    this._toster.error("Can not delete this user Because this record has been send For Review")

  }
  else{
  
    //  this._toster.confirm((""),
    //  undefined,
    //      (result: boolean) => {
    //          if (result) {
    //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //            //     this._toster.info("Deleted successfully", "Status", {});
 
    //                this._SA8000Service.DeleteProject(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onSearch();
                    
    //                })
                   
    //          }
    //        }
    //   )
    this._SA8000Service.DeleteProject(e.row.data.id).subscribe((Response)=>{
  
      this._toster.info(Response.message)
      this.onSearch();
     
    })
    }
  }

      reloadGrid()
 
      {
     
        this.pagedDto.page =1;
        //this.onSearch();
      }
      div1Function(){
        this.div1=true;
     
    }
    updateState(){
      // Reset 
    
              // If selected and flag is true
              if(this.ProjectForm.controls.checkbox.value==true){
                  this.div1 = true;
              }
              else{this.div1 = false;}
          
      
  }
  onAddProject()
  {
    
    var stdId= this.ProjectForm.get('StandardId').value
    let FormPth: string
    localStorage.removeItem('standardId');
    localStorage.setItem('standardId',stdId.toString());
    
  //  if(stdId==6){this.router.navigateByUrl('/app/pages/sales/slcp?'+this.Clientid);  }
  //  if(stdId==3){this.router.navigateByUrl('/app/pages/sales/higg?'+this.Clientid);  }
  //  if(stdId==7){this.router.navigateByUrl('/app/pages/sales/project-sa8000?'+this.Clientid); 
   this._ClientService.GetProjectFormUrlById(stdId).subscribe((Response) => {
                
   
   FormPth = Response.path

   localStorage.removeItem('clientId');
   localStorage.setItem('clientId',this.Clientid.toString());
   //localStorage.removeItem('projectId');
  // this.router.navigateByUrl(FormPth);
   
  this.router.navigateByUrl(FormPth+"ProjectId="+ 0 +"&StandardId="+stdId+"&ClientId="+this.Clientid);
   //this.router.navigateByUrl(FormPth+"ProjectId=0"+"&ClientId="+this.Clientid);
    })

    //
  
  }
  loadAllCertification(): void {
      
    this.LibraryResourceService.getAllCertification().subscribe((Response)=>{
      this.StandardList = Response
        
    })
  }

  editRecord(e)
  {
    
    // var userId=item;
    var urlink=e;
    this.router.navigateByUrl(e+this.Clientid)

  }



  ProjectRemarks(){
    
     
        this.pagedDto.keyword = this.keyword;
        this.pagedDto.authAllowed = true;
        this.Clientid=0;
        this._SA8000Service.GetProjectRemarks(this.pagedDto).subscribe((Response) => {
                    
        
          this.totalCount = Response.totalCount
          this.ProjectsRemarksList = Response.projectRemarksHistoryModel
          //this .Liststandard=this.StandardList;
        })
      
   
     
  }
  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
   this.displayStyle = "none";
 }
  

  Downloadfile(e): void {
     
  
    e.row.data.id;
   // var fillename=e.row.data.title;
   var fillename="Document File";
    this._SA8000Service.downloadApplicationForm(e.row.data.id).subscribe((result:Blob)=>{
      const Blb =new Blob([result], { type: result.type });
      // const url=window.URL.createObjectURL(Blb);
      // window.open(url);
      // console.log("success");
    
      
      const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
      //a.download =fillename;  
       // const fileName =
        
        //="farooq";
        a.href = URL.createObjectURL(Blb);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
        
    })
   }

   review(e)
   {
     debugger
    this._ClientService.GetProjectFormUrlById(e.row.data.standardId).subscribe((Response) => {
                
   
      var FormPth  = Response.path
      
      // localStorage.removeItem('clientId');
      // localStorage.setItem('clientId',this.Clientid.toString());
      // localStorage.removeItem('standardId');
      // localStorage.setItem('standardId',e.row.data.standardId.toString());
      //this.router.navigateByUrl(FormPth + e.row.data.id +"&"+ e.row.data.clientId);
      //this.router.navigateByUrl(FormPth + e.row.data.id);
       //this .Liststandard=this.StandardList;

       this.router.navigateByUrl(FormPth+"ProjectId="+ e.row.data.id +"&StandardId="+e.row.data.standardId+"&ClientId="+e.row.data.clientId );
     })
   }

   Remarks(e)
   { 
     
    // var userId=item;
     //var urlink=e;
     this.router.navigateByUrl('/app/pages/sales/project-remarks?'+e.row.data.id)
 
   }


   SubmitForreview(e) 
   { 
    if(e.row.data.approvalStatusId==4 || e.row.data.approvalStatusId==2)
     {
       this._toster.error("Can not Manage this user Because this record has been send For Review")
 
     }
     if(e.row.data.approvalStatusId==4 || e.row.data.approvalStatusId==2)
     {
       this._toster.error("Can not Manage this user Because this record has been send For Review")
 
     }
     else{
 
    
     
    //  this._toster.confirm(("Please make sure all the required information is entered. Are you sure to submit your application for review?"),
    //  undefined,
    //      (result: boolean) => {
    //          if (result) {
    //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //            //     this._toster.info("Deleted successfully", "Status", {});
 
    //                this._SA8000Service.SubmitForReview(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onSearch();
                    
    //                 })
                   
    //          }
    //        }
    //   )
    this._SA8000Service.SubmitForReview(e.row.data.id).subscribe((Response)=>{
  
      this._toster.info(Response.message)
      this.onSearch();
     
     })
         }
 
   }
   onCellPrepared(e) {         
     
    
    // if(e.cell.rowPath === 'rowName' && e.cell.columnPath === 'columnName') {
        // e.cellElement.style.fontSize = '20px';
        // e.cellElement.style.fontWeight = 'bold';
        // e.cellElement.style.color  = 'red';

        e.cellElement.addClass('RED');
    // }
}

  loadClient(): void {
      
    this._ClientService.getClients().subscribe((Response)=>{
      this.ClientList = Response
        
    })
  }
//   isCloneIconVisible (e) {
//     
//     if(e.row.data.approvalStatusId=="1")
//     {
//     return !e.row.isEditing;
//   }
//     else{
//       return e.row.isEditing;
//     }
// }

FormRights(e)
{
  var formName = "AllProjects"
  this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
    
    this.secRoleForm = data.find(x => x.formName == formName)
    this.isShown = this.secRoleForm.authAllowed
   
    if(this.secRoleForm.authAllowed ==true)
    {
        
      this.authorizer=true
      this.authorizerVelue=1;
       
    }
    else{
      this.authorizer=false
      this.authorizerVelue=2;
     
    }
   // this.onSearch()
  })

}
editViaible(e) {
   
  debugger
  var Insert_Allow =localStorage.getItem('InsertAllow');
//  var tt= this.authorizer;
  if(Insert_Allow =="1")
  {
 if (e.row.data.approvalStatusId=="1" || e.row.data.approvalStatusId=="4" ||e.row.data.approvalStatusId=="2"||e.row.data.approvalStatusId=="7" ||e.row.data.approvalStatusId=="8"||e.row.data.approvalStatusId=="9"||e.row.data.approvalStatusId=="10")
  {
  return e.row.isEditing;
}

  else
  {
    
    return !e.row.isEditing;
  }
}
else
{
   return e.row.isEditing;
}

}
editorPreparing(e) {
  
  if (e.parentType === 'dataRow' && e.dataField === 'Position') {
    e.editorOptions.readOnly = "OSP";
  }
}

EditViaible(e) {
   
  
 if (this.authorizer==true)
  {
  return !e.row.isEditing;
}
  else
  {
    return e.row.isEditing;
  }
}

ReciewForApproval(e) {

   
 // var authorizerID =localStorage.getItem('authorizer');
  //  var tt= this.authorizer;
  var Insert_Allow =localStorage.getItem('InsertAllow');
  //  var tt= this.authorizer;
    if(Insert_Allow =="1")
    {
   if (e.row.data.approvalStatusId=="4" ||e.row.data.approvalStatusId=="2")
    {
    return !e.row.isEditing;
    
  }
    else
    {
      
      return e.row.isEditing;
    }
  }
  else
  {
     return e.row.isEditing;
  }
  
}



ManageVisit(e) {
   
  
  var manageAllowed =localStorage.getItem('manageAllowed');
//  var tt= this.authorizer;
  if(manageAllowed=='1')
  {
 if (e.row.data.approvalStatusId=="7")
  {
  return !e.row.isEditing;
  }

  else
  {
    
    return e.row.isEditing;
  }
}
else
{
   return e.row.isEditing;
}

}

OnManageVisit(e)
{

  this.router.navigateByUrl('/app/pages/sales/client-add-visit?'+"ProjectId="+ e.row.data.id +"&StandardId="+e.row.data.standardId );
}


ClientData(): void 
{
  if(this.Clientid>0)
  {
  this._ClientService.GeClientDatabyId(this.Clientid).subscribe((Response) => {

    this.clientinfo = Response;

    this.Multisite= Response.multisite;
    

  });
}}
}
