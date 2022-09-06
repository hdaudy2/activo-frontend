
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
import{ ClientAuditVisitModel} from'@shared/Dto/Client-Audit-Visit-model';
import{SlcpService} from'@shared/Services/project-slcp-service';
import { ClientService } from '@shared/Services/Client-Service';
import { ClientAuditVisitService } from '@shared/Services/Client-Audit-visit-service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";


import {  Injector, QueryList, ViewChildren } from '@angular/core';


import { animate, state, style, transition, trigger } from '@angular/animations';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-client-add-visit',
  templateUrl: './client-add-visit.component.html',
  styleUrls: ['./client-add-visit.component.css']
})
export class ClientAddVisitComponent implements OnInit {
  public VisitModel: ClientAuditVisitModel = new ClientAuditVisitModel();
  @Input() formName : string
  datePipe = new DatePipe("en-US");
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  pageNumber : number = 1
  pageSize : number = 10
  public isEditShown : boolean  
  public isViewShown : boolean  
  public isAddShown : boolean  
  public IsContract : boolean  
  public keyword : string = ''
  public savebtn : boolean = true
  public deletebtn: boolean=false
  public btnApproval: boolean = false
  public ApprovalList = [];
  public NaceCodeList=[];
  public savedownload: boolean = false
  public LeadAuditorList=[];
  public AuditorList=[];
  public VisitTypeList=[];
  public VisitStatusList=[];
  public VisitLevelList=[];
  public projyctcodelist=[];
  public AllVisitDataList = []
  public ReviewerList=[];
  public auditcompletebtn: boolean = true
  public OrganizationId: number
  Projectcode: string
  standardId:number
  projectId:number
  filePath:boolean
  public isShown:boolean=false
  public authorizer:boolean=false
  fileToUpload: any;
  clientinfo: any;
  submitted = false;
 public UserStatusList=[]
 public TechnicalExpertList=[]
 public DurationList= [{id: "1", code:"1"},{id: "1.5", code:"1.5"},{id: "2", code:"2"},{id: "2.5", code:"2.5"},{id: "3", code:"3"},{id: "3.5", code:"3.5"},{id: "4", code:"4"},{id: "4", code:"4.5"},{id: "5", code:"5"}];


 
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

  constructor(  private _UserStandardService: UserStandardService,
    private _SlcpService: SlcpService,
     private _ClientService: ClientService,
    private _ClientAuditVisitService: ClientAuditVisitService,
     private _toster: ToastrService,
     private router: Router,
     private route: ActivatedRoute,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    
     //public StandardService: StandardService
      ) {this.edit = this.edit.bind(this); 
        this.NewRecord=this.NewRecord.bind(this);
        this.delete=this.delete.bind(this); 
        this.deleteVisit=this.deleteVisit.bind(this); 
        this.recordEdit=this.recordEdit.bind(this); 
      
      }

  ngOnInit(): void {
    var  ur ;
    ur=window.location.href.split("/")[7];
    var com=[]=ur.split("?")[1];
    if(com!=undefined && com!=null)
    {
      var Parameter1=com.split("&")[0];
      var Parameter2=com.split("&")[1];

    
     if(Parameter1.split("=")[0]=="StandardId")
     {
        this.standardId =Parameter1.split("=")[1];
     }
     else if(Parameter1.split("=")[0]=="ProjectId")
     {
      this.projectId =Parameter1.split("=")[1];
     }
     
     if(Parameter2.split("=")[0]=="StandardId")
     {
        this.standardId =Parameter2.split("=")[1];
     }
     else if(Parameter2.split("=")[0]=="ProjectId")
     {
      this.projectId =Parameter2.split("=")[1];
     }
    }
    this.loadSecRoleForm();
   // this.loadVisitType();
    this.LoadProjectCode();
    this.LoadVisitStatus();
    this.LoadVisitLevel();
    this.ClientVisitForm.controls.VisitStatusId.setValue(6);
    this.ClientVisitForm.get('VisitStatusId').disable();
   // this.editVisit()
  } 
  ClientVisitForm = new FormGroup({
    ProjectCode: new FormControl(''),
    ProjectId: new FormControl(''),
    //VisitTypeId: new FormControl(''),
    VisitStatusId: new FormControl(''),
    VisitLevelId: new FormControl(''),
    JustifiedPersonId: new FormControl(''),
    TechnicalExpertId: new FormControl(''),
    Duration: new FormControl(''),
    VisitDate: new FormControl(''),
    StartDate: new FormControl(''),
    EndDate: new FormControl(''),
    LeadAuditorId: new FormControl(''),
    Auditor1Id: new FormControl(''),
    Auditor2Id: new FormControl(''),
    Auditor3Id: new FormControl(''),
    Auditor4Id: new FormControl(''),
    Auditor5Id: new FormControl(''),
    ReviewerId: new FormControl(''),
    VerificationLevel: new FormControl(''),
    ReviewDate: new FormControl(''),
    SubmisionDate: new FormControl(''),
  
    
  })


  ClientAuditPlanId: number
  ngAfterViewInit() : void {
    //this.editVisit();
    this.loadAuditor();
  this.loadLeadAuditor();
  this.loadReviewer();
  this.GetAllAdminList();
  
}
handlefileInput(e: any)
{

this.fileToUpload= <File>e?.target?.files[0];
//this.url=e.target.value; 


}

fileChange(event, item) {
  
  item.binary = event;
  var r = new FileReader();
  r.onload = function(e) { 
    item.binary = r.result
  }
  r.readAsArrayBuffer(event.target.files[0]);
}
loadSecRoleForm() {
    
  
    
  this.formName = "ClientAuditVisit"
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
  this.onSearch();
    
} 
loadVisitType(): void
{


 this._ClientAuditVisitService.GetALLVisitType().subscribe((Response)=>{
   this.VisitTypeList = Response
     
 })
}
LoadVisitStatus(): void
{


 this._ClientAuditVisitService.GetALLVisitStatus().subscribe((Response)=>{
   this.VisitStatusList = Response
     
 })
}
LoadVisitLevel(): void
{


 this._ClientAuditVisitService.GetALLVisitLevel().subscribe((Response)=>{
   this.VisitLevelList = Response
     
 })
}
GetAllAdminList(): void
{
  var  ur ;
    ur=window.location.href.split("/")[7];
    var com=[]=ur.split("?")[1];
    if(com!=undefined && com!=null)
    {
      var Parameter1=com.split("&")[0];
      var Parameter2=com.split("&")[1];

    
     if(Parameter1.split("=")[0]=="StandardId")
     {
        this.standardId =Parameter1.split("=")[1];
     }
     else if(Parameter1.split("=")[0]=="ProjectId")
     {
      this.projectId =Parameter1.split("=")[1];
     }
     
     if(Parameter2.split("=")[0]=="StandardId")
     {
        this.standardId =Parameter2.split("=")[1];
     }
     else if(Parameter2.split("=")[0]=="ProjectId")
     {
      this.projectId =Parameter2.split("=")[1];
     }
    }

 this._ClientAuditVisitService.GetAllTechnicalExpert(this.projectId).subscribe((Response)=>{
   this.TechnicalExpertList = Response
     
 })
}
// LoadProjectCode(): void
// {

// debugger
//  this._ClientAuditVisitService.GetAllProjectCode(this.projectId).subscribe((Response)=>{
//    this.projyctcodelist = Response
//    var pro=this.projyctcodelist.find(x => x.projectId == this.projectId)



     
//  })
// }

LoadProjectCode(): void
{


 this._ClientAuditVisitService.GetProjectCodeById(this.projectId).subscribe((Response)=>{
   //this.projyctcodelist = Response
     this.Projectcode=Response.projectCode
     this.ClientVisitForm.controls.ProjectCode.setValue(Response.projectCode);
     this.ClientVisitForm.get('ProjectCode').disable();
     //this.StandardName=Response.standardName
 })
}
  loadLeadAuditor(): void
   {
    this.OrganizationId =parseInt(localStorage.getItem('organizationId'));
    
    const UserModel=
    
    {
    
      id:this.standardId,
   
      OrganizationId :this.OrganizationId ,
    
      
    };
   
    this._SlcpService.GetLeadAllLeadAuditor(UserModel).subscribe((Response)=>{
      this.LeadAuditorList = Response
        
    })
  }
  loadAuditor(): void
  {
   this.OrganizationId =parseInt(localStorage.getItem('organizationId'));
   
   const UserModel=
   
   {
   
     id:this.standardId,
  
     OrganizationId :this.OrganizationId ,
   
     
   };
  
   this._SlcpService.GetAllLeadAuditor(UserModel).subscribe((Response)=>{
     this.AuditorList = Response
       
   })
 }
  loadReviewer(): void
   {
    
    const UserModel=
    
    {
    
      id:this.standardId,
   
   
    
      
    };
   
    this._SlcpService.GetReviewerByStandardId(UserModel).subscribe((Response)=>{
      this.ReviewerList = Response
        
    })
  }
//   editVisit()
//   {
//     this.projectId = this.route.snapshot.params.id;
     
//     var  ur ;
//     ur=window.location.href.split("/")[7];
//     var com=[]=ur.split("?")[1];
//     if(com!=undefined && com!=null)
//     {
//       var Parameter1=com.split("&")[0];
//       var Parameter2=com.split("&")[1];

    
//      if(Parameter1.split("=")[0]=="StandardId")
//      {
//         this.standardId =Parameter1.split("=")[1];
//      }
//      else if(Parameter1.split("=")[0]=="ProjectId")
//      {
//       this.projectId =Parameter1.split("=")[1];
//      }
     
//      if(Parameter2.split("=")[0]=="StandardId")
//      {
//         this.standardId =Parameter2.split("=")[1];
//      }
//      else if(Parameter2.split("=")[0]=="ProjectId")
//      {
//       this.projectId =Parameter2.split("=")[1];
//      }
//      this.ClientVisitForm.controls.ProjectId.setValue(this.projectId);
//      this.ClientVisitForm.get('ProjectId').disable();

//      this._ClientAuditVisitService.GetClientAuditVisitBYId(this.projectId).subscribe((Response)=>{
//       //this.VisitTypeList = Response
      
//       this.ClientAuditPlanId=Response.id;
//       //this.ClientVisitForm.controls.VisitTypeId.setValue(Response.visitTypeId);
//       this.ClientVisitForm.controls.VisitStatusId.setValue(Response.visitStatusId);
//       this.ClientVisitForm.controls.VisitLevelId.setValue(Response.visitLevelId);
      
//       this.ClientVisitForm.controls.JustifiedPersonId.setValue(Response.justifiedPersonId); 
//       this.ClientVisitForm.controls.TechnicalExpertId.setValue(Response.technicalExpertId);
//       this.ClientVisitForm.controls.Duration.setValue(Response.duration);
//       //this.ClientVisitForm.controls.Duration.setValue(Response.ReviewDate);

//       let reviewDate = new Date(this.datePipe.transform(Response.reviewDate, 'yyyy/MM/dd'))
    
//       this.ClientVisitForm.controls.ReviewDate.setValue(this.datePipe.transform(reviewDate, 'yyyy-MM-dd'))
     
//       let submisionDate = new Date(this.datePipe.transform(Response.submisionDate, 'yyyy/MM/dd'))
    
//       this.ClientVisitForm.controls.SubmisionDate.setValue(this.datePipe.transform(submisionDate, 'yyyy-MM-dd'))
     
      
//       //this.ClientVisitForm.controls.VisitDate.setValue(e.row.data.visitDate);
//       let VisitDate = new Date(this.datePipe.transform(Response.visitDate, 'yyyy/MM/dd'))
    
//       this.ClientVisitForm.controls.VisitDate.setValue(this.datePipe.transform(VisitDate, 'yyyy-MM-dd'))
    
//       let start_Date = new Date(this.datePipe.transform(Response.startDate, 'yyyy/MM/dd'))
    
//       this.ClientVisitForm.controls.StartDate.setValue(this.datePipe.transform(start_Date, 'yyyy-MM-dd'))
//      // this.ClientVisitForm.controls.StartDate.setValue(e.row.data.startDate); 
//       //this.ClientVisitForm.controls.EndDate.setValue(e.row.data.endDate);
//       let EndDate = new Date(this.datePipe.transform(Response.endDate, 'yyyy/MM/dd'))
    
//       this.ClientVisitForm.controls.EndDate.setValue(this.datePipe.transform(EndDate, 'yyyy-MM-dd'))
//       this.ClientVisitForm.controls.LeadAuditorId.setValue(Response.leadAuditorId);
//       this.ClientVisitForm.controls.Auditor1Id.setValue(Response.auditor1Id);
//       this.ClientVisitForm.controls.Auditor2Id.setValue(Response.auditor2Id); 
//       this.ClientVisitForm.controls.Auditor3Id.setValue(Response.auditor3Id); 
//       this.ClientVisitForm.controls.Auditor4Id.setValue(Response.auditor4Id);
//       this.ClientVisitForm.controls.Auditor5Id.setValue(Response.auditor5Id);
//       this.ClientVisitForm.controls.ReviewerId.setValue(Response.reviewerId);
      
//       this.ClientVisitForm.controls.VerificationLevel.setValue(Response.verificationLevel);
//       if(Response.auditPlanFilePath !=null && Response.auditPlanFilePath !="" && Response.auditPlanFilePath!=undefined && Response.auditPlanFilePath!='')
//       {

//        this.filePath=true
//       }
//       else{this.filePath=false}
//       this.ClientAuditPlanId=Response.id
//       //this.VisitDate=Response.visitDate
     
//       //this.EndDate=Response.endDate
//         var clientvisit= Response
//         this.projectId=Response.projectId
        


//         if(Response.visitStatusId==7)
//         {
        
 
 
        
//         //this.ClientVisitForm.controls.VisitTypeId.disable();
//      this.ClientVisitForm.controls.VisitLevelId.disable();
        
//       this.ClientVisitForm.controls.VisitStatusId.disable();
//       this.ClientVisitForm.controls.JustifiedPersonId.disable();
//       this.ClientVisitForm.controls.TechnicalExpertId.disable();
//       this.ClientVisitForm.controls.Duration.disable();
//       //this.ClientVisitForm.controls.VisitDate.setValue(e.row.data.visitDate);
     
    
//       this.ClientVisitForm.controls.VisitDate.disable();
    
      
    
//       this.ClientVisitForm.controls.StartDate.disable();
//      // this.ClientVisitForm.controls.StartDate.setValue(e.row.data.startDate); 
//       //this.ClientVisitForm.controls.EndDate.setValue(e.row.data.endDate);
     
    
//       this.ClientVisitForm.controls.EndDate.disable();
//       this.ClientVisitForm.controls.LeadAuditorId.disable();
//       this.ClientVisitForm.controls.Auditor1Id.disable();
//       this.ClientVisitForm.controls.Auditor2Id.disable();
//       this.ClientVisitForm.controls.Auditor3Id.disable();
//       this.ClientVisitForm.controls.Auditor4Id.disable();
//       this.ClientVisitForm.controls.Auditor5Id.disable();
//       this.ClientVisitForm.controls.ReviewerId.disable();
//       this.ClientVisitForm.controls.VerificationLevel.disable();
//       this.auditcompletebtn=false
//         }
//     })
//      this.onSearch();
//      //this.loadLeadAuditor();
  
//    // this.id=PId;


    
// //  this.onSearch(this.userUpdateId);
//     //  }

//     //    
//     //   var  ur ;
//     //   ur=window.location.href.split("/")[7];
//     //   var com=[]=ur.split("?")[1];
//     //   if(com!=undefined && com!=null)
//     //   {
//     //   var PId=com.split("=")[0];
//     //   var client=com.split("=")[1];
//     //   this.ClientId=client.split("&")[1];

//     //  // var PId=com.split("=")[0];
//     //   this.id=PId;



      
    
//     //localStorage.setVisitModel('clientId',JSON.stringify(this.Clientid))
    
//    // this.id=parseInt(localStorage.ClientVisitForm('projectId'));

//   //  this.onSearch(this.userUpdateId);
//   }
 
//   }
  edit(e) {  
     
// var List = [];
// List=this.Liststandard                                                                             ; 
// this.router.navigateByUrl('/app/pages/stock-management/library');
this.ClientAuditPlanId=e.row.data.id
// var updateDate =this.StandardList.find(x => x.id == this.id );

// this._StandardService.GetStandardById(this.id).subscribe((res) => 
// {

 // this.ModuleForm.controls.Code.setValue(e.row.data.code);
  //this.ClientVisitForm.controls.ProjectId.setValue(e.row.data.ProjectId);
 // this.ClientVisitForm.controls.VisitTypeId.setValue(e.row.data.visitTypeId);
 this.ClientVisitForm.controls.VisitLevelId.setValue(e.row.data.visitLevelId);
 
  this.ClientVisitForm.controls.VisitStatusId.setValue(e.row.data.visitStatusId);
  this.ClientVisitForm.controls.JustifiedPersonId.setValue(e.row.data.justifiedPersonId); 
  this.ClientVisitForm.controls.TechnicalExpertId.setValue(e.row.data.technicalExpertId);
  this.ClientVisitForm.controls.Duration.setValue(e.row.data.duration);
  //this.ClientVisitForm.controls.VisitDate.setValue(e.row.data.visitDate);
  let Visit_Date = new Date(this.datePipe.transform(e.row.data.visitDate, 'yyyy/MM/dd'))

  this.ClientVisitForm.controls.VisitDate.setValue(this.datePipe.transform(Visit_Date, 'yyyy-MM-dd'))

  let start_Date = new Date(this.datePipe.transform(e.row.data.startDate, 'yyyy/MM/dd'))

  this.ClientVisitForm.controls.StartDate.setValue(this.datePipe.transform(start_Date, 'yyyy-MM-dd'))
 // this.ClientVisitForm.controls.StartDate.setValue(e.row.data.startDate); 
  //this.ClientVisitForm.controls.EndDate.setValue(e.row.data.endDate);
  let End_Date = new Date(this.datePipe.transform(e.row.data.endDate, 'yyyy/MM/dd'))

  this.ClientVisitForm.controls.EndDate.setValue(this.datePipe.transform(End_Date, 'yyyy-MM-dd'))
  this.ClientVisitForm.controls.LeadAuditorId.setValue(e.row.data.leadAuditorId);
  this.ClientVisitForm.controls.Auditor1Id.setValue(e.row.data.auditor1Id);
  this.ClientVisitForm.controls.Auditor2Id.setValue(e.row.data.auditor2Id); 
  this.ClientVisitForm.controls.Auditor3Id.setValue(e.row.data.auditor3Id); 
  this.ClientVisitForm.controls.Auditor4Id.setValue(e.row.data.auditor4Id);
  this.ClientVisitForm.controls.Auditor5Id.setValue(e.row.data.auditor5Id);
  this.ClientVisitForm.controls.ReviewerId.setValue(e.row.data.reviewerId);
  this.ClientVisitForm.controls.VerificationLevel.setValue(e.row.data.verificationLevel);


          if(e.row.data.visitStatusId!=5 && e.row.data.visitStatusId !=6)
          {
          
   
   
          
          //this.ClientVisitForm.controls.VisitTypeId.disable();
       this.ClientVisitForm.controls.VisitLevelId.disable();
          
        this.ClientVisitForm.controls.VisitStatusId.disable();
        this.ClientVisitForm.controls.JustifiedPersonId.disable();
        this.ClientVisitForm.controls.TechnicalExpertId.disable();
        this.ClientVisitForm.controls.Duration.disable();
        //this.ClientVisitForm.controls.VisitDate.setValue(e.row.data.visitDate);
       
      
        this.ClientVisitForm.controls.VisitDate.disable();
      
        
      
        this.ClientVisitForm.controls.StartDate.disable();
       // this.ClientVisitForm.controls.StartDate.setValue(e.row.data.startDate); 
        //this.ClientVisitForm.controls.EndDate.setValue(e.row.data.endDate);
       
      
        this.ClientVisitForm.controls.EndDate.disable();
        this.ClientVisitForm.controls.LeadAuditorId.disable();
        this.ClientVisitForm.controls.Auditor1Id.disable();
        this.ClientVisitForm.controls.Auditor2Id.disable();
        this.ClientVisitForm.controls.Auditor3Id.disable();
        this.ClientVisitForm.controls.Auditor4Id.disable();
        this.ClientVisitForm.controls.Auditor5Id.disable();
        this.ClientVisitForm.controls.ReviewerId.disable();
        this.ClientVisitForm.controls.VerificationLevel.disable();
        this.auditcompletebtn=false
          }
          
  else
          {
          
   
   
          
            //this.ClientVisitForm.controls.VisitTypeId.disable();
         this.ClientVisitForm.controls.VisitLevelId.enable();
            
          this.ClientVisitForm.controls.VisitStatusId.enable();
          this.ClientVisitForm.controls.JustifiedPersonId.enable();
          this.ClientVisitForm.controls.TechnicalExpertId.enable();
          this.ClientVisitForm.controls.Duration.enable();
          //this.ClientVisitForm.controls.VisitDate.setValue(e.row.data.visitDate);
         
        
          this.ClientVisitForm.controls.VisitDate.enable();
        
          
        
          this.ClientVisitForm.controls.StartDate.enable();
         // this.ClientVisitForm.controls.StartDate.setValue(e.row.data.startDate); 
          //this.ClientVisitForm.controls.EndDate.setValue(e.row.data.endDate);
         
        
          this.ClientVisitForm.controls.EndDate.enable();
          this.ClientVisitForm.controls.LeadAuditorId.enable();
          this.ClientVisitForm.controls.Auditor1Id.enable();
          this.ClientVisitForm.controls.Auditor2Id.enable();
          this.ClientVisitForm.controls.Auditor3Id.enable();
          this.ClientVisitForm.controls.Auditor4Id.enable();
          this.ClientVisitForm.controls.Auditor5Id.enable();
          this.ClientVisitForm.controls.ReviewerId.enable();
          this.ClientVisitForm.controls.VerificationLevel.enable();
          this.auditcompletebtn=true
            }
// this.CertificateForm.controls.StartDate.setValue(e.row.data.startdate);
  //let req = new Date(this.datePipe.transform(e.row.data.startDate, 'yyyy/MM/dd'))

   //this.CertificateForm.controls.StartDate.setValue(this.datePipe.transform(req, 'yyyy/MM/dd'))

  // if(e.row.data.isActive==true){
  // this.ClientVisitForm.controls.IsActive.setValue(1);
  // }else{this.ClientVisitForm.controls.IsActive.setValue(0);}
  
  // });
  // this.router.navigate(['app/pages/stock-management/library']);
    //this.router.navigate(["account/login"]);
// this.router.navigateByUrl('/app/pages/certification-setups/Standard?'+this.id);  
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
  
    
  //this.pagedDto.keyword = this.projectId.toString()
  this.pagedDto.authAllowed = true
  localStorage.getItem('organizationId');
  //this.pagedDto.pageSize = 3
  this._ClientAuditVisitService.GetPagedClientAuditVisitResponse(this.projectId,this.pagedDto).subscribe((Response) => {
              
  
    this.totalCount = Response.totalCount
    this.AllVisitDataList = Response.clientAuditModel
  })
}
delete(e) {
  
    //  this._toster.confirm((""),
    //  undefined,
    //      (result: boolean) => {
    //          if (result) {
    //            // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //            //     this._toster.info("Deleted successfully", "Status", {});
 
    //                this._ClientAuditVisitService.Delete(e.row.data.id).subscribe((Response)=>{
  
    //                  this._toster.info(Response.message)
    //                  this.onSearch();
                    
    //                 })
                   
    //          }
    //        }
    //   )
    this._ClientAuditVisitService.Delete(e.row.data.id).subscribe((Response)=>{
  
      this._toster.info(Response.message)
      this.onSearch();
     
     })
  }
      get f() { return this.ClientVisitForm.controls; }

      onSubmit() {
        debugger
     var count=   this.AllVisitDataList.length;
     console.log(count);
     console.log(this.ClientAuditPlanId);
     console.log(this.standardId);
    if(this.standardId!=7 && this.AllVisitDataList.length > 0 && !(this.ClientAuditPlanId> 0))
    {
      this._toster.error("Audit Visit Already Booked");
      return;

    }
        this.submitted = true;
    
        // stop here if form is invalid
        if (this.ClientVisitForm.invalid) {
          this._toster.error("Some fields are required ");
          return;
        }
        if(this.fileToUpload ==null ||this.fileToUpload==undefined)
{  this._toster.error("Audit Plan  is Empty","Alert")
return
// MesseageError="Document File is Empty";
}
        this.onSubmit1();
       
      }
      onSubmit1(): void {
        debugger
        try{
          var fileName=this.fileToUpload.name.split("_")[0];
          let ProjectList = this.projyctcodelist.find(x => x.id == this.projectId)

      if(this.standardId==7){
       if(!(parseInt(this.ClientVisitForm.get('TechnicalExpertId').value)>0))
       {
        this._toster.error("Technical Expert Cant not be Empty!", "Please select Technical Expert");
        return;

       }
      }
       if(!(parseInt(this.ClientVisitForm.get('LeadAuditorId').value)>0))
       {
        this._toster.error("Lead Auditor Cant not be Empty!", "Please select Lead Auditor");
        return;

       }
        // var projectCode this.projyctcodelist.filter
          // if(fileName==ProjectList.projectCode)
          // {
            const foData: FormData = new FormData();

       
            var LoginUserId = localStorage.getItem('userId');
        
        
            if (this.ClientAuditPlanId > 0)
             {
              foData.append("Id", this.ClientAuditPlanId.toString());
            }
            // else {
            //   if (this.fileToUpload != null && this.fileToUpload != "" && this.fileToUpload != undefined && this.fileToUpload != undefined && this.fileToUpload != NaN) {
        
        
            //   }
            //   else {
        
            //     this._toster.error("Please Upload Application Form!", "Application Form is required");
            //     return;
            //   }
            //}
            foData.append('LastModifiedById', LoginUserId);
        
        
        
            foData.append('OrganizationId',localStorage.getItem('organizationId'));
            foData.append('CreatedById', LoginUserId);
            foData.append('ProjectId', this.projectId.toString());
            foData.append('File', this.fileToUpload);
            Object.keys(this.ClientVisitForm.controls).forEach(key => {
        
              if (this.ClientVisitForm.controls[key].value != null && this.ClientVisitForm.controls[key].value != "" && this.ClientVisitForm.controls[key].value != undefined && this.ClientVisitForm.controls[key].value != NaN) {
                var sname = key;
                //var sname= this.SLCPForm.controls[key].;
                var val = this.ClientVisitForm.controls[key].value;
        
                foData.append(sname, val);
              }
            });
        
              if(this.ClientAuditPlanId>0)
              {this.VisitModel.Id=this.ClientAuditPlanId}
              else{this.VisitModel.Id=0}
            
             
          
            //this.VisitModel.VisitTypeId=parseInt(this.ClientVisitForm.get('VisitTypeId').value)
            this.VisitModel.VisitLevelId=parseInt(this.ClientVisitForm.get('VisitLevelId').value)
            this.VisitModel.ProjectId=this.projectId;
            this.VisitModel.VisitStatusId=parseInt(this.ClientVisitForm.get('VisitStatusId').value)
           this.VisitModel.VisitStatusId=5;
            this.VisitModel.JustifiedPersonId=parseInt(this.ClientVisitForm.get('JustifiedPersonId').value)
            this.VisitModel.TechnicalExpertId=parseInt(this.ClientVisitForm.get('TechnicalExpertId').value)
            this.VisitModel.Duration=this.ClientVisitForm.get('Duration').value
            
              this.VisitModel.VisitDate=this.ClientVisitForm.get('VisitDate').value
            this.VisitModel.StartDate=this.ClientVisitForm.get('StartDate').value
            this.VisitModel.EndDate=this.ClientVisitForm.get('EndDate').value
        
            
            this.VisitModel.LeadAuditorId=parseInt(this.ClientVisitForm.get('LeadAuditorId').value)
            this.VisitModel.Auditor1Id=parseInt(this.ClientVisitForm.get('Auditor1Id').value)
            this.VisitModel.Auditor2Id=parseInt(this.ClientVisitForm.get('Auditor2Id').value)
        
            this.VisitModel.Auditor3Id=parseInt(this.ClientVisitForm.get('Auditor3Id').value)
            this.VisitModel.Auditor4Id=parseInt(this.ClientVisitForm.get('Auditor4Id').value)
            this.VisitModel.Auditor5Id=parseInt(this.ClientVisitForm.get('Auditor5Id').value)
            this.VisitModel.ReviewerId=parseInt(this.ClientVisitForm.get('ReviewerId').value)
            this.VisitModel.VerificationLevel=this.ClientVisitForm.get('VerificationLevel').value
            var userId =localStorage.getItem('userId');
            this.VisitModel.CreatedById=parseInt(userId);
            this.VisitModel.LastModifiedById=parseInt(userId);
            this.VisitModel.File=this.fileToUpload;
            
            
                  this._ClientAuditVisitService.CreateWithFile(foData).subscribe((Response)=>{
             if(Response.message=="1")
             {
                this._toster.info("Record Saved!")
                this.NewRecord();
                this.onSearch();
                //this.router.navigateByUrl('/app/pages/sales/audit-plan-list');

             }
             else if(Response.message=="0")
             {
              this._toster.info("Not Inserted!")
             }
             else
             {
              this._toster.error(Response.message)
             }
                //this.router.navigateByUrl('/app/pages/sales/all-projects?' + client.clientId);
                //this.reloadGrid();
                //this.NewRecord();
               
               })
    
          // }
        //   else{  
        //     //this.SLCPForm.controls.File.setValue("");
        //   this._toster.error("File Name Is Incorrect", "Please Upload Correct File")
        // }
          
        }
        catch(error)
        {
         // this.SLCPForm.controls.File.setValue("");
          this._toster.error("File Name Is Incorrect", "Please Upload Correct File")
         
        }
        
       
    }
    reloadGrid()
     
    {
    
      this.pagedDto.page =1;
      this.onSearch();
    }

    NewRecord()
    
     
    {  
      this.ClientAuditPlanId=null;
     // this.ClientVisitForm.controls.VisitTypeId.setValue('');
      this.ClientVisitForm.controls.VisitStatusId.setValue('');
      this.ClientVisitForm.controls.VisitLevelId.setValue('');
      this.ClientVisitForm.controls.JustifiedPersonId.setValue(''); 
      this.ClientVisitForm.controls.TechnicalExpertId.setValue('');
      this.ClientVisitForm.controls.Duration.setValue('');
      //this.ClientVisitForm.controls.VisitDate.setValue(e.row.data.visitDate);
    
    
      this.ClientVisitForm.controls.VisitDate.setValue('')
    
   
    
      this.ClientVisitForm.controls.StartDate.setValue('')
     // this.ClientVisitForm.controls.StartDate.setValue(e.row.data.startDate); 
      //this.ClientVisitForm.controls.EndDate.setValue(e.row.data.endDate);
     
      this.ClientVisitForm.controls.EndDate.setValue('')
      this.ClientVisitForm.controls.LeadAuditorId.setValue('');
      this.ClientVisitForm.controls.Auditor1Id.setValue('');
      this.ClientVisitForm.controls.Auditor2Id.setValue(''); 
      this.ClientVisitForm.controls.Auditor3Id.setValue(''); 
      this.ClientVisitForm.controls.Auditor4Id.setValue('');
      this.ClientVisitForm.controls.Auditor5Id.setValue('');
      this.ClientVisitForm.controls.ReviewerId.setValue('');
      this.ClientVisitForm.controls.VisitLevelId.setValue('');
      //this.ClientVisitForm.controls.VerificationLevel.setValue('');
      this.ClientVisitForm.controls.VisitStatusId.setValue(6);
   
   }

   Back(): void {
     
    var client=this.projyctcodelist.find(x => x.id == this.projectId)
   // this.projyctcodelist.find()
    this.router.navigateByUrl('/app/pages/sales/all-projects?' + client.clientId);

  }

  ChangeAuditor(LeadAuditorId): void {
    debugger
    if( parseInt( this.ClientVisitForm.get('Auditor1Id').value)==parseInt(LeadAuditorId) || parseInt( this.ClientVisitForm.get('Auditor2Id').value)==parseInt(LeadAuditorId) || parseInt( this.ClientVisitForm.get('Auditor3Id').value)==parseInt(LeadAuditorId) || parseInt( this.ClientVisitForm.get('Auditor4Id').value)==parseInt(LeadAuditorId) || parseInt( this.ClientVisitForm.get('Auditor5Id').value)==parseInt(LeadAuditorId) || parseInt( this.ClientVisitForm.get('ReviewerId').value)==parseInt(LeadAuditorId)  )
   
    {
      if(parseInt(LeadAuditorId)>0)
      {
      this._toster.error("Auditor Already Exist")
      this.ClientVisitForm.controls.LeadAuditorId.setValue('');
      }
    }   
  
  
  
  }
  
  // this.ClientVisitForm.controls.Auditor2Id.setValue(''); 
  // this.ClientVisitForm.controls.Auditor3Id.setValue(''); 
  // this.ClientVisitForm.controls.Auditor4Id.setValue('');
  // this.ClientVisitForm.controls.Auditor5Id.setValue('');
  // this.ClientVisitForm.controls.ReviewerId.setValue('');
  
  ChangeAuditor1(Auditor1Id): void {
    debugger
    if( parseInt( this.ClientVisitForm.get('LeadAuditorId').value)==parseInt(Auditor1Id) || parseInt( this.ClientVisitForm.get('Auditor2Id').value)==parseInt(Auditor1Id) || parseInt( this.ClientVisitForm.get('Auditor3Id').value)==parseInt(Auditor1Id) || parseInt( this.ClientVisitForm.get('Auditor4Id').value)==parseInt(Auditor1Id) || parseInt( this.ClientVisitForm.get('Auditor5Id').value)==parseInt(Auditor1Id) || parseInt( this.ClientVisitForm.get('ReviewerId').value)==parseInt(Auditor1Id) )
    {
     if( parseInt(Auditor1Id)>0){
      this._toster.error("Auditor Already Exist")
    this.ClientVisitForm.controls.Auditor1Id.setValue(''); 
  }  }
    
  
  }
  
  ChangeAuditor2(Auditor2Id): void {
    debugger
    if( parseInt( this.ClientVisitForm.get('LeadAuditorId').value)==parseInt(Auditor2Id) || parseInt( this.ClientVisitForm.get('Auditor1Id').value)==parseInt(Auditor2Id) || parseInt( this.ClientVisitForm.get('Auditor3Id').value)==parseInt(Auditor2Id) || parseInt( this.ClientVisitForm.get('Auditor4Id').value)==parseInt(Auditor2Id) || parseInt( this.ClientVisitForm.get('Auditor5Id').value)==parseInt(Auditor2Id) || parseInt( this.ClientVisitForm.get('ReviewerId').value)==parseInt(Auditor2Id) )
    {
      if( parseInt(Auditor2Id)>0){this._toster.error("Auditor Already Exist")
    this.ClientVisitForm.controls.Auditor2Id.setValue(''); }   
    }
    
  
  }
  
  ChangeAuditor3(Auditor3Id): void {
    debugger
    if( parseInt( this.ClientVisitForm.get('LeadAuditorId').value)==parseInt(Auditor3Id) || parseInt( this.ClientVisitForm.get('Auditor1Id').value)==parseInt(Auditor3Id) || parseInt( this.ClientVisitForm.get('Auditor2Id').value)==parseInt(Auditor3Id) || parseInt( this.ClientVisitForm.get('Auditor4Id').value)==parseInt(Auditor3Id) || parseInt( this.ClientVisitForm.get('Auditor5Id').value)==parseInt(Auditor3Id) || parseInt( this.ClientVisitForm.get('ReviewerId').value)==parseInt(Auditor3Id) )
    {
      if( parseInt(Auditor3Id)>0){
      this._toster.error("Auditor Already Exist")
    this.ClientVisitForm.controls.Auditor3Id.setValue('');}   
      }
  
  }
  
  ChangeAuditor4(Auditor4Id): void {
    debugger
    if( parseInt( this.ClientVisitForm.get('LeadAuditorId').value)==parseInt(Auditor4Id) || parseInt( this.ClientVisitForm.get('Auditor1Id').value)==parseInt(Auditor4Id) || parseInt( this.ClientVisitForm.get('Auditor2Id').value)==parseInt(Auditor4Id) || parseInt( this.ClientVisitForm.get('Auditor3Id').value)==parseInt(Auditor4Id) || parseInt( this.ClientVisitForm.get('Auditor5Id').value)==parseInt(Auditor4Id) || parseInt( this.ClientVisitForm.get('ReviewerId').value)==parseInt(Auditor4Id) )
    {
      if( parseInt(Auditor4Id)>0){
      this._toster.error("Auditor Already Exist")
    this.ClientVisitForm.controls.Auditor4Id.setValue('');}  
    
      }
  }
  
  ChangeAuditor5(Auditor5Id): void {
    debugger
    if( parseInt( this.ClientVisitForm.get('LeadAuditorId').value)==parseInt(Auditor5Id) || parseInt( this.ClientVisitForm.get('Auditor1Id').value)==parseInt(Auditor5Id) || parseInt( this.ClientVisitForm.get('Auditor2Id').value)==parseInt(Auditor5Id) || parseInt( this.ClientVisitForm.get('Auditor3Id').value)==parseInt(Auditor5Id) || parseInt( this.ClientVisitForm.get('Auditor4Id').value)==parseInt(Auditor5Id) || parseInt( this.ClientVisitForm.get('ReviewerId').value)==parseInt(Auditor5Id) )
    {
      if( parseInt(Auditor5Id)>0){
      this._toster.error("Auditor Already Exist") 
    this.ClientVisitForm.controls.Auditor5Id.setValue('');}   
      }
  
  }
  
  ChangeReviewerId(ReviewerId): void {
    debugger
    if(parseInt( this.ClientVisitForm.get('LeadAuditorId').value)==parseInt(ReviewerId) || parseInt( this.ClientVisitForm.get('Auditor1Id').value)==parseInt(ReviewerId) || parseInt( this.ClientVisitForm.get('Auditor2Id').value)==parseInt(ReviewerId) || parseInt( this.ClientVisitForm.get('Auditor3Id').value)==parseInt(ReviewerId) || parseInt( this.ClientVisitForm.get('Auditor4Id').value)==parseInt(ReviewerId) || parseInt( this.ClientVisitForm.get('Auditor5Id').value)==parseInt(ReviewerId) )
    {
      if(parseInt(ReviewerId) >0)
      {
      this._toster.error("Auditor Already Exist") 
    this.ClientVisitForm.controls.ReviewerId.setValue('');
      }  
}
  
  }
  deleteVisit(e) {
   debugger
  
    
   if (e.row.data.visitStatusId=="5" || e.row.data.visitStatusId=="6")
    {
    return !e.row.isEditing;
    }
  
    else
    {
      
      return e.row.isEditing;
    }
 
  
  }
  recordEdit(e) {
    debugger
   
     
    if (e.row.data.visitStatusId=="5" || e.row.data.visitStatusId=="6")
     {
     return !e.row.isEditing;
     }
   
     else
     {
       
       return e.row.isEditing;
     }
  
   
   }

}
