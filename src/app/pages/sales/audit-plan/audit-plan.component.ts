
//T.S

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
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RoleFormService } from '@shared/Services/sec-role-service'
import { RoleFormModel } from '@shared/Dto/role-form-model';
import { Router } from '@angular/router';
import { SecRoleFormModel } from '@shared/Dto/sec-role-form-model';
import { MakerAuthorizerFormService } from '@shared/Services/maker-authorizer-form.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';


import { UserStandardService } from 'shared/Services/User-Standard-service';

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
import { ClientAuditVisitModel } from '@shared/Dto/Client-Audit-Visit-model';
import { SlcpService } from '@shared/Services/project-slcp-service';
import { ClientService } from '@shared/Services/Client-Service';
import { ClientAuditVisitService } from '@shared/Services/Client-Audit-visit-service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { AuditReportService } from '@shared/Services/Audit-report-service';

import { Injector, QueryList, ViewChildren } from '@angular/core';


import { animate, state, style, transition, trigger } from '@angular/animations';
import { max } from 'rxjs/operators';
import { ProjectSA8000Component } from '../project-sa8000/project-sa8000.component';
import { StateModel } from '@shared/Dto/state-model';
import { SlcpComponent } from '../slcp/slcp.component';
import { LibraryResourceService } from '@shared/Services/library-Resource_service';
// import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-audit-plan',
  templateUrl: './audit-plan.component.html',
  styleUrls: ['./audit-plan.component.css']
})
export class AuditPlanComponent implements OnInit {

  @ViewChild('tabset', { static: true }) tabset: TabsetComponent;
  @ViewChild(ProjectSA8000Component) child: ProjectSA8000Component;

  public VisitModel: ClientAuditVisitModel = new ClientAuditVisitModel();

  // beforeChange($event: NgbTabChangeEvent) {
  //   // dont do anything if id matches
  //   if ($event.nextId === 'tab-4') {
  //     $event.preventDefault();
  //   }
  // }
  @Input() formName: string
  datePipe = new DatePipe("en-US");
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  pageNumber: number = 1
  pageSize: number = 10
  public isEditShown: boolean
  public isViewShown: boolean
  public isAddShown: boolean
  public IsInsertAllow: boolean = false
  public btnSave: boolean = false
  public IsContract: boolean
  public Sa8000div: boolean = false
  public SLCPdiv: boolean = false
  public auditcompletebtn: boolean = true
  public auditpendingbtn: boolean = false
  public Higgdiv: boolean = false
  public keyword: string = ''
  public savebtn: boolean = true
  public deletebtn: boolean = false
  public btnApproval: boolean = false
  public ApprovalList = [];
  public NaceCodeList = [];
  public savedownload: boolean = false
  public ApprovalStatus: string
  public LibraryList = []
  public LeadAuditorList = [];
  public VisitTypeList = [];
  public VisitStatusList = [];
  public projyctcodelist = [];
  public AllVisitDataList = []
  public btnback: boolean = false
  AuditReportDetailId: number
  public OrganizationId: number
  public Revieweruser: boolean = false
  UserId:number
  id: number
  // standardId:number
  public standardId: number
  public ProjectId: number
  public ClientId: number
  public AuditVisitId: number
  public VisitStatusId: number
  projectUrl: string
  public projectId: number
  public isShown: boolean = false
  public authorizer: boolean = false
  fileToUpload: any;
  clientinfo: any;
  submitted = false;
  Projectcode: string
  visitstatus: string
  visitLevel: string
  Auditor1Name: string
  Auditor2Name: string
  Auditor3Name: string
  Auditor4Name: string
  Auditor5Name: string
  ReviewerName: string
  ReviewDate: string
  SubmisionDate: string
  TechnicalExpertName: string
  LeadAuditorName: string
  JustifiedPersonName: string

  Duration: string
  VisitDate: string
  StartDate: string
  EndDate: string
  VerificationLevel: string
  public filePath: boolean = false
  // public Clientid:number=10006;
  public UserStatusList = []
  public QCDetail = []
  public QcdocumentsListId: number



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

  constructor(private _UserStandardService: UserStandardService,
    private _SlcpService: SlcpService,
    private _ClientService: ClientService,
    private _ClientAuditVisitService: ClientAuditVisitService,
    private _toster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    public AuditReportService: AuditReportService,
    public LibraryResourceService: LibraryResourceService
    // private SlcpComponent:SlcpComponent

    //public StandardService: StandardService
  ) {
    this.edit = this.edit.bind(this);
    this.NewRecord = this.NewRecord.bind(this);
    this.delete = this.delete.bind(this);
    this.Downloadfile = this.Downloadfile.bind(this);
    this.DownloadLibraryfile = this.DownloadLibraryfile.bind(this);
    // this.addComments=this.addComments.bind(this);
  }
  displayStyle = "none";
  userId: number
  //  addComments(e)
  //   {
  //     this.QcdocumentsListId=0;
  //     this.QcdocumentsListId=e.row.data.id;

  //    this.displayStyle = "block";

  //  //this.router.navigateByUrl('/app/pages/stock-management/library?'+this.id);  
  //  }
  ngOnInit(): void {

    this.loadSecRoleForm();
   // this.editVisit();
    this.GetAllDocumentsType();
    //this.AllLibraryDocuments();
    // this.loadVisitType();
    //this.LoadProjectCode();
    // this.LoadVisitStatus();

  }
  //displayStyle = "none";

  openPopup() {

    this.displayStyle = "block";

  }

  closePopup() {
    this.displayStyle = "none";
  }

  ClientVisitForm = new FormGroup({
    // ProjectCode: new FormControl(''),
    ProjectId: new FormControl(''),
    VisitTypeId: new FormControl(''),
    VisitStatusId: new FormControl(''),
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
  ngAfterViewInit(): void {
    //this.QCHistory()
    //this.SlcpComponent.btnback=false
    this.editVisit();
    this.btnback = false;
    //this.loadLeadAuditor();

  }

  loadSecRoleForm() {



    this.formName = "AuditReport"
    this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {

      let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)

      this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)
      if (this.secRoleForm == undefined || this.secRoleForm == "" || this.secRoleForm == null) {

        this._toster.error("Not Access", "Alert")
        this.router.navigateByUrl('/app/home')
      }
      //this.isEditShown= this.secRoleForm.authAllowed
      // this.isViewShown = this.secRoleForm.authAllowed

      // var formName = "User"
      // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      //   this.secRoleForm = data.find(x => x.formName.toLocaleLowerCase() == formName.toLocaleLowerCase())

      this.isViewShown = true
      if (this.secRoleForm.updateAllowed == true) {
        this.isEditShown = true
      }
      else {
        this.isEditShown = false
      }
      if (this.secRoleForm.insertAllowed == true) {
        this.IsInsertAllow = true;
        this.isAddShown = true
      }
      else {
        this.IsInsertAllow = false;
        this.isAddShown = false
      }

//this.editVisit();
      //this.isViewShown = this.secRoleForm.authAllowed
    })

  }
  loadVisitType(): void {


    this._ClientAuditVisitService.GetALLVisitType().subscribe((Response) => {
      this.VisitTypeList = Response

    })
  }
  LoadVisitStatus(): void {


    this._ClientAuditVisitService.GetALLVisitStatus().subscribe((Response) => {
      this.VisitStatusList = Response

    })
  }
  // LoadProjectCode(): void
  // {


  //  this._ClientAuditVisitService.GetAllProjectCode().subscribe((Response)=>{
  //    this.projyctcodelist = Response

  //  })
  // }
  loadLeadAuditor(): void {
    this.OrganizationId = parseInt(localStorage.getItem('organizationId'));

    const UserModel =

    {

      id: this.standardId,

      OrganizationId: this.OrganizationId,


    };

    this._SlcpService.GetAllLeadAuditor(UserModel).subscribe((Response) => {
      this.LeadAuditorList = Response

    })
  }
  editVisit() {


    
    var ur;
    ur = window.location.href.split("/")[7];
    var com = [] = ur.split("?")[1];
    if (com != undefined && com != null) {
      var Parameter1 = com.split("&")[0];
      var Parameter2 = com.split("&")[1];
      var Parameter3 = com.split("&")[2];
      var Parameter4 = com.split("&")[3];


      if (Parameter1.split("=")[0] == "ProjectId") {
        this.ProjectId = Parameter1.split("=")[1];
      }
      else if (Parameter1.split("=")[0] == "StandardId") {
        this.standardId = Parameter1.split("=")[1];
      }
      else if (Parameter1.split("=")[0] == "ClientId") {
        this.ClientId = Parameter1.split("=")[1];
      }

      else if (Parameter1.split("=")[0] == "AuditVisitId") {
        this.AuditVisitId = Parameter1.split("=")[1];
      }

      if (Parameter2.split("=")[0] == "StandardId") {
        this.standardId = Parameter2.split("=")[1];
      }
      else if (Parameter2.split("=")[0] == "ProjectId") {
        this.ProjectId = Parameter2.split("=")[1];
      }
      else if (Parameter2.split("=")[0] == "ClientId") {
        this.ClientId = Parameter2.split("=")[1];
      }
      else if (Parameter2.split("=")[0] == "AuditVisitId") {
        this.AuditVisitId = Parameter2.split("=")[1];
      }



      if (Parameter3.split("=")[0] == "StandardId") {
        this.standardId = Parameter3.split("=")[1];
      }
      else if (Parameter3.split("=")[0] == "ProjectId") {
        this.ProjectId = Parameter3.split("=")[1];
      }
      else if (Parameter3.split("=")[0] == "ClientId") {
        this.ClientId = Parameter3.split("=")[1];
      }
      else if (Parameter3.split("=")[0] == "AuditVisitId") {
        this.AuditVisitId = Parameter3.split("=")[1];
      }

      // AuditVisitId

      if (Parameter4.split("=")[0] == "StandardId") {
        this.standardId = Parameter4.split("=")[1];
      }
      else if (Parameter4.split("=")[0] == "ProjectId") {
        this.ProjectId = Parameter4.split("=")[1];
      }
      else if (Parameter4.split("=")[0] == "ClientId") {
        this.ClientId = Parameter4.split("=")[1];
      }
      else if (Parameter4.split("=")[0] == "AuditVisitId") {
        this.AuditVisitId = Parameter4.split("=")[1];
      }
      // var  ur ;
      // ur=window.location.href.split("/")[7];
      // var com=[]=ur.split("?")[1];
      // if(com!=undefined && com!=null)
      // {
      //   this.ClientAuditPlanId=com.split("=")[0];



      //this.ClientVisitForm.controls.ProjectId.setValue(this.projectId);
      //this.ClientVisitForm.get('ProjectId').disable();

      this._ClientAuditVisitService.GetClientAuditVisitBYId(this.AuditVisitId).subscribe((Response) => {
        //this.VisitTypeList = Response

        this.id = Response.id
        if (parseInt(Response.standardId) == 7) {

          this.Sa8000div = true
        }
        else if (parseInt(Response.standardId) == 6) {
          this.SLCPdiv = true
        }
        else if (parseInt(Response.standardId) == 3) {
          this.Higgdiv = true
        }
        if (Response.visitStatusId == 7) {
          this.auditcompletebtn = false



        }
      if(parseInt(Response.standardId) != 7 &&parseInt(Response.visitStatusId)==7 || parseInt(Response.visitStatusId)==3)
      {

        if(this.IsInsertAllow==true)
        {
          if(parseInt(localStorage.getItem('roleId')) == 12)
          {
            this.UserId= parseInt(localStorage.getItem('userId'));
            if(parseInt(Response.leadAuditorId)==this.UserId || parseInt(Response.auditor1Id)==this.UserId || parseInt(Response.auditor2Id)==this.UserId || parseInt(Response.auditor3Id)==this.UserId || parseInt(Response.auditor4Id)==this.UserId || parseInt(Response.auditor5Id)==this.UserId)
           {
            this.btnSave=true

           }
           else
           {
            this.btnSave=false
           }
          } 
          else if(parseInt(localStorage.getItem('roleId')) == 6 ||parseInt(localStorage.getItem('roleId')) == 20)  
          {
            this.btnSave=true

          }
          else
          {
           this.btnSave=false
          }

          
          
          //this.btnSave=true
        }
        else{ this.btnSave=false}
      }
     else if(parseInt(Response.standardId) == 7 && parseInt(Response.visitStatusId)==5 || parseInt(Response.visitStatusId)==3)
      {

        if(this.IsInsertAllow==true)
        {

          this.btnSave=true
        }
        else{ this.btnSave=false}
      }
      else
      {
        this.btnSave=false
      }
        this.standardId = Response.standardId
        this.Projectcode = Response.projectCode
        this.visitstatus = Response.visitStatusName
        this.visitLevel = Response.visitLevelName
        this.Auditor1Name = Response.auditor1Name
        this.Auditor2Name = Response.auditor2Name
        this.Auditor3Name = Response.auditor3Name
        this.Auditor4Name = Response.auditor4Name
        this.Auditor5Name = Response.auditor5Name
        this.ReviewerName = Response.reviewerName
        this.ReviewDate = Response.reviewDate
        this.SubmisionDate = Response.submisionDate
        this.LeadAuditorName = Response.leadAuditorName
        this.JustifiedPersonName = Response.justifiedPersonName
        this.TechnicalExpertName = Response.technicalExpertName
        this.Duration = Response.duration
        this.VerificationLevel = Response.verificationLevel

        if (Response.auditPlanFilePath != null && Response.auditPlanFilePath != "" && Response.auditPlanFilePath != undefined && Response.auditPlanFilePath != '') {

          this.filePath = true
        }
        else { this.filePath = false }

        //this.VisitDate=Response.visitDate
        let Visit_Date = new Date(this.datePipe.transform(Response.visitDate, 'yyyy/MM/dd'))

        this.VisitDate = this.datePipe.transform(Visit_Date, 'yyyy-MM-dd')

        let Review_Date = new Date(this.datePipe.transform(Response.reviewDate, 'yyyy/MM/dd'))

        this.ReviewDate = this.datePipe.transform(Review_Date, 'yyyy-MM-dd')

        let Submision_Date = new Date(this.datePipe.transform(Response.submisionDate, 'yyyy/MM/dd'))

        this.SubmisionDate = this.datePipe.transform(Submision_Date, 'yyyy-MM-dd')

        let Start_Date = new Date(this.datePipe.transform(Response.startDate, 'yyyy/MM/dd'))

        this.StartDate = this.datePipe.transform(Start_Date, 'yyyy-MM-dd')


       
        
      
        //this.StartDate=Response.startDate
        var date = new Date();
        let latest_date = this.datePipe.transform(date, 'yyyy-MM-dd');
        
        if (this.StartDate <= latest_date) {
          this.auditcompletebtn = true;
          this.auditpendingbtn = false;
        }
        else if (latest_date < this.StartDate) {
          this.auditpendingbtn = true;
          this.auditcompletebtn = false;
          this.btnSave=false;

        }
        else {
          this.auditcompletebtn = false;
          this.auditpendingbtn = false;

        }
        if (this.auditcompletebtn ==true && parseInt(Response.visitStatusId) == 5 ) {
          this.auditcompletebtn = true


        }
        else
        {
          this.auditcompletebtn = false
        }
      

    if(parseInt(Response.standardId) == 7)
      {
       this.auditcompletebtn = false;
       this.auditpendingbtn = false;
      
      }
        let End_Date = new Date(this.datePipe.transform(Response.endDate, 'yyyy/MM/dd'))

        this.EndDate = this.datePipe.transform(End_Date, 'yyyy-MM-dd')
        //this.EndDate=Response.endDate
        var clientvisit = Response
        this.projectId = Response.projectId
        this.projectUrl = "ProjectId=" + Response.projectId
        
        this.onSearch();
        // this.QCDocumentsList();
        //this.QCHistory();
        this.AllLibraryDocuments(this.standardId)
      })
      //this.loadLeadAuditor();

      // this.id=PId;



      //  this.onSearch(this.userUpdateId);
      //  }

      //    
      //   var  ur ;
      //   ur=window.location.href.split("/")[7];
      //   var com=[]=ur.split("?")[1];
      //   if(com!=undefined && com!=null)
      //   {
      //   var PId=com.split("=")[0];
      //   var client=com.split("=")[1];
      //   this.ClientId=client.split("&")[1];

      //  // var PId=com.split("=")[0];
      //   this.id=PId;





      //localStorage.setVisitModel('clientId',JSON.stringify(this.Clientid))

      // this.id=parseInt(localStorage.ClientVisitForm('projectId'));

      //  this.onSearch(this.userUpdateId);
    }

  }




  //get f() { return this.ClientVisitForm.controls; }






  Back(): void {

    var client = this.projyctcodelist.find(x => x.id == this.projectId)
    // this.projyctcodelist.find()
    this.router.navigateByUrl('/app/pages/sales/all-projects?' + client.clientId);

  }

  // recieveTabIndex($event) {
  //   if($event.form == "Project")
  //   {
  //     if($event.selectedReportIds.length > 0)
  //       this.tabset.tabs[$event.tabIndex].active = true;

  //   }

  // }
  recieveTabIndex($event) {

    this.tabset.tabs[$event.tabIndex].active = true;



  }
  DownloadAuditPlan(): void {

    if (this.filePath == true) {
      //this.id=this.id;
      // var fillename=e.row.data.title;
      var fillename = "Document File";
      this._ClientAuditVisitService.DownloadAuditPlan(this.AuditVisitId).subscribe((result: Blob) => {
        const Blb = new Blob([result], { type: result.type });
        // const url=window.URL.createObjectURL(Blb);
        // window.open(url);
        // console.log("success");


        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = fillename;
        // const fileName =

        //="farooq";
        a.href = URL.createObjectURL(Blb);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);

        // const Blb =new Blob([result], { type: result.type });
        // // const url=window.URL.createObjectURL(Blb);
        // // window.open(url);
        // // console.log("success");

        // 
        // const a = document.createElement('a');
        //   a.setAttribute('style', 'display:none;');
        //   document.body.appendChild(a);
        // // a.download =fillename;  
        //  // const fileName =

        //   //="farooq";
        //   a.href = URL.createObjectURL(Blb);
        //   a.target = '_blank';
        //   a.click();
        //   document.body.removeChild(a);

      })
    }
    else { this._toster.error("File Not Exsit", "Alert") }

  }


  //For Audit Report

  public SubmitReview: boolean = false
  public qcbtn: boolean = false
  public ProjectCompleted: boolean = false
  ReportMasterid: number
  public ReportMasterList = []
  public DocumentsList = []
  public DocumentsTypeList = []
  public item: StateModel = new StateModel();
  AuditReportForm = new FormGroup({
    // Id: new FormControl(''),
    AuditDocumentTypeId: new FormControl(''),
    File: new FormControl(''),
    Comment: new FormControl('')


  })

  GetAllDocumentsType(): void {

    this.AuditReportService.GetAllDocumentsType().subscribe((Response) => {

      this.DocumentsTypeList = Response

    })
  }

  onSearch() {


    this.pagedDto.keyword = this.keyword
    this.pagedDto.authAllowed = true
    //this.pagedDto.pageSize = 3
    //this.AuditReportService.GetPagedAuditReport(this.pagedDto).subscribe((Response) => {
    this.AuditReportService.GetPagedAuditReportById(this.AuditVisitId, this.pagedDto).subscribe((Response) => {
      if (Response.totalCount > 0) {
        this.totalCount = Response.totalCount
        this.DocumentsList = Response.auditVisitReportMasterModel


        
        this.ReportMasterList = Response.auditVisitReportModel
        this.ApprovalStatus = Response.auditVisitReportModel.approvalStatusName
        if (Response.auditVisitReportModel.approvalStatusId == 2) {
          this.ProjectCompleted = true
          this.ApprovalStatus = "Project Completed"
        }
        this.ReportMasterid = Response.auditVisitReportModel.id
        if (this.ReportMasterid > 0) {
          this.SubmitReview = true

        }

        if (Response.auditVisitReportModel.approvalStatusId != null && Response.auditVisitReportModel.approvalStatusId != undefined && Response.auditVisitReportModel.approvalStatusId != "" && Response.auditVisitReportModel.approvalStatusId > 0) { this.qcbtn = true }
      }
    })
  }

  edit(e) {

    // var List = [];
    // List=this.Liststandard                                                                             ; 
    // this.router.navigateByUrl('/app/pages/stock-management/library');
    this.AuditReportDetailId = e.row.data.id
    // var updateDate =this.StandardList.find(x => x.id == this.id );

    // this._StandardService.GetStandardById(this.id).subscribe((res) => 
    // {

    // this.ModuleForm.controls.Code.setValue(e.row.data.code);
    this.AuditReportForm.controls.AuditDocumentTypeId.setValue(e.row.data.auditDocumentTypeId);
    this.ReportMasterid = e.row.data.auditReportMasterId;




  }
  NewRecord() {



    this.AuditReportDetailId = 0;
    this.AuditReportForm.controls.AuditDocumentTypeId.setValue('');
    this.AuditReportForm.controls.File.setValue('');
    this.fileToUpload = null;
  }

  handlefileInput(e: any) {

    this.fileToUpload = <File>e?.target?.files[0];
    //this.url=e.target.value; 


  }
  Downloadfile(e): void {


    //this.id=e.row.data.id;
    // var fillename=e.row.data.title;
    var fillename = e.row.data.auditDocumentName;
    this.AuditReportService.downloadFile(parseInt(e.row.data.id)).subscribe((result: Blob) => {
      const Blb = new Blob([result], { type: result.type });
      // const url=window.URL.createObjectURL(Blb);

      // window.open(url);
      // console.log("success");


      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.download = fillename;
      // const fileName =

      //="farooq";
      a.href = URL.createObjectURL(Blb);
      a.target = '_blank';
      a.click();
      document.body.removeChild(a);

    })
  }
  get f() { return this.AuditReportForm.controls; }
  onSubmit(): void {

    try {
      var fileName = this.fileToUpload.name.split("_")[0];

      // if (fileName == this.Projectcode) {

        this.submitted = true;

        // stop here if form is invalid
        if (this.AuditReportForm.invalid) {
          this._toster.error("Some fields are required ");
          return;
        }
        var LoginUserId = localStorage.getItem('userId');
        const foData: FormData = new FormData();

        if (this.AuditReportDetailId != undefined && this.AuditReportDetailId != null && this.AuditReportDetailId > 0) {
          //foData.append('CreatedById',LoginUserId);
          foData.append("Id", this.AuditReportDetailId.toString());
        }
        // else
        //  {
        //   if (this.fileToUpload != null && this.fileToUpload != "" && this.fileToUpload != undefined && this.fileToUpload != undefined && this.fileToUpload != NaN) {


        //   }
        //   else
        //    {

        //     this._toster.error("Please Upload Document File!", "Document File required");
        //     return;
        //   }
        // }
        foData.append('File', this.fileToUpload);
        foData.append('AuditDocumentTypeId', this.AuditReportForm.get('AuditDocumentTypeId').value);
        foData.append('ClientAuditVisitId', this.AuditVisitId.toString());
        foData.append('ProjectId', this.ProjectId.toString());
        if (this.ReportMasterid != undefined && this.ReportMasterid != null && this.ReportMasterid > 0) {
          foData.append('CreatedById', LoginUserId);
          foData.append('AuditReportMasterId', this.ReportMasterid.toString());

        }
        else { foData.append('LastModifiedById', LoginUserId); }





        this.AuditReportService.CreateWithFile(foData).subscribe((Response) => {

          this._toster.info(Response.message)
         this.reloadGrid();
          this.NewRecord();

        })

      //}
      // else {
      //   //this.SLCPForm.controls.File.setValue("");
      //   this._toster.error("File Name Is Incorrect", "Please Upload Correct File")
      // }

    }
    catch (error) {
      // this.SLCPForm.controls.File.setValue("");
      this._toster.error("File Name Is Incorrect", "Please Upload Correct File")

    }

    console.log(this.fileToUpload.name)


    //let auditvisitid= this.AuditVisitId;

    // window.location.reload();
    // this.LibraryResourceService.create(this.item).subscribe((Response)=>{

    // //  this._toster.info(Response.message)

    //  })




    //this.LibraryResourceService.create(this.item).subscribe((Response)=>{

  }
  //   onSubmit(): void 
  //   {



  //     this.submitted = true;


  //     if (this.AuditReportForm.invalid) {
  //       this._toster.error("Some fields are required ");
  //       return;
  //     }
  //     var LoginUserId =localStorage.getItem('userId');
  //   const foData:FormData = new FormData();

  //   if (this.id != undefined && this.id != null && this.id>0 ) 
  //   {

  //     foData.append("Id",this.id.toString());
  //   }
  //   else
  //    {
  //     if (this.fileToUpload != null && this.fileToUpload != "" && this.fileToUpload != undefined && this.fileToUpload != undefined && this.fileToUpload != NaN) {


  //     }
  //     else
  //      {

  //       this._toster.error("Please Upload Document File!", "Document File required");
  //       return;
  //     }
  //   }
  //   foData.append('File',this.fileToUpload);
  //   foData.append('AuditDocumentTypeId',this.AuditReportForm.get('AuditDocumentTypeId').value);
  //   foData.append('ClientAuditVisitId',this.id.toString());
  //   foData.append('ProjectId',this.ClientAuditPlanId.toString());
  //   if (this.ReportMasterid != undefined && this.ReportMasterid != null && this.ReportMasterid>0 ) 
  //   {
  //     foData.append('CreatedById',LoginUserId);
  //     foData.append('AuditReportMasterId',this.ReportMasterid.toString());

  //   }
  //   else{ foData.append('LastModifiedById',LoginUserId);}









  // this.AuditReportService.CreateWithFile(foData).subscribe((Response)=>{

  //      this._toster.info(Response.message)
  //      this.reloadGrid();
  //      this.NewRecord();

  //     })


  //  }
  reloadGrid() {

    this.pagedDto.page = 1;
    this.onSearch();
  }
  delete(e) {

    // this._toster.confirm((""),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {
    //       // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //       //     this._toster.info("Deleted successfully", "Status", {});

    //       this.AuditReportService.AuditReportDeleteById(e.row.data.id).subscribe((Response) => {

    //         this._toster.info(Response.message)
    //         this.onSearch();

    //       })

    //     }
    //   }
    // )
    this.AuditReportService.AuditReportDeleteById(e.row.data.id).subscribe((Response) => {

      this._toster.info(Response.message)
      this.onSearch();

    })
  }

  onTableDataChange(event) {
    this.pagedDto.page = event;
    this.onSearch();
  }
  onTableSizeChange(event): void {
    this.pagedDto.pageSize = event.target.value;
    this.onSearch();

  }
  onSubmitForReview(): void {


    // this._toster.confirm(("Please make sure all the required information is entered. Are you sure to submit your application for review?"),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {
    //       // this.SecUserService.Deleteuser(e.row.data.id).subscribe() 
    //       //     this._toster.info("Deleted successfully", "Status", {});

    //       this.AuditReportService.SubmitForReview(this.ReportMasterid).subscribe((Response) => {
    //         if(Response.message=="1")
    //         {this._toster.info( "Successfully Reports Send For QC !")
    //         window.location.reload();
    //       }
           
    //         else{this._toster.error("Not Submited!")}
    //         this.reloadGrid();
    //         this.onSearch();

    //       })

    //     }
    //   }
    // )
    this.AuditReportService.SubmitForReview(this.ReportMasterid).subscribe((Response) => {
      if(Response.message=="1")
      {this._toster.info( "Successfully Reports Send For QC !")
      window.location.reload();
    }
     
      else{this._toster.error("Not Submited!")}
      this.reloadGrid();
      this.onSearch();

    })
  }

  AuditComplete(): void {


    // this._toster.confirm(("Please make sure all the required information is got. Are you sure to  your Audit Completed"),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {

    //       this.VisitModel.OrganizationId = parseInt(localStorage.getItem('organizationId'));
    //       this.VisitModel.StandardId = this.standardId;
    //       this.VisitModel.Id = this.AuditVisitId;
    //       this.VisitModel.CreatedById = parseInt(localStorage.getItem('userId'));


    //       this.AuditReportService.AuditComplete(this.VisitModel).subscribe((Response) => {

    //         //this._toster.info(Response.message)
    //         //this.router.navigateByUrl('/app/pages/sales/audit-plan-list?');
    //         if (Response.message == '1') {
    //           this._toster.info("Successfully Completed!")
    //           this.router.navigateByUrl('/app/pages/sales/audit-plan-list?');

    //         }
    //         else if (Response.message == '2') {
    //           this._toster.info("Project amount not set in Project Amount form for this Standard!")

    //         }
    //         else if (Response.message == '0') {
    //           this._toster.error("Audit Not Exists!")
    //         }

    //       })

    //     }
    //   }
    // )
    this.VisitModel.OrganizationId = parseInt(localStorage.getItem('organizationId'));
    this.VisitModel.StandardId = this.standardId;
    this.VisitModel.Id = this.AuditVisitId;
    this.VisitModel.CreatedById = parseInt(localStorage.getItem('userId'));


    this.AuditReportService.AuditComplete(this.VisitModel).subscribe((Response) => {

      //this._toster.info(Response.message)
      //this.router.navigateByUrl('/app/pages/sales/audit-plan-list?');
      if (Response.message == '1') {
        this._toster.info("Successfully Completed!")
        this.router.navigateByUrl('/app/pages/sales/audit-plan-list?');

      }
      else if (Response.message == '2') {
        this._toster.info("Project amount not set in Project Amount form for this Standard!")

      }
      else if (Response.message == '0') {
        this._toster.error("Audit Not Exists!")
      }

    })
  }


  //public employees = [];
  //  public employees = [{
  //   ID: 1,
  //   Prefix: 'Mr.',
  //   FirstName: 'John',
  //   LastName: 'Heart',
  //   Position: 'CEO',
  //   State: 'California',
  //   BirthDate: '1964/03/16',
  // },
  // {
  //   ID: 2,
  //   Prefix: 'Mrs.',
  //   FirstName: 'Olivia',
  //   LastName: 'Peyton',
  //   Position: 'Sales Assistant',
  //   State: 'California',
  //   BirthDate: '1981/06/03',
  // },
  // {
  //   ID: 3,
  //   Prefix: 'Mr.',
  //   FirstName: 'Robert',
  //   LastName: 'Reagan',
  //   Position: 'CMO',
  //   State: 'Arkansas',
  //   BirthDate: '1974/09/07',
  // },
  // {
  //   ID: 4,
  //   Prefix: 'Ms.',
  //   FirstName: 'Greta',
  //   LastName: 'Sims',
  //   Position: 'HR Manager',
  //   State: 'Georgia',
  //   BirthDate: '1977/11/22',
  // },
  // {
  //   ID: 5,
  //   Prefix: 'Mr.',
  //   FirstName: 'Brett',
  //   LastName: 'Wade',
  //   Position: 'IT Manager',
  //   State: 'Idaho',
  //   BirthDate: '1968/12/01',
  // },
  // {
  //   ID: 6,
  //   Prefix: 'Mrs.',
  //   FirstName: 'Sandra',
  //   LastName: 'Johnson',
  //   Position: 'Controller',
  //   State: 'Utah',
  //   BirthDate: '1974/11/15',
  // },
  // {
  //   ID: 7,
  //   Prefix: 'Mr.',
  //   FirstName: 'Kevin',
  //   LastName: 'Carter',
  //   Position: 'Shipping Manager',
  //   State: 'California',
  //   BirthDate: '1978/01/09',
  // },
  // {
  //   ID: 8,
  //   Prefix: 'Ms.',
  //   FirstName: 'Cynthia',
  //   LastName: 'Stanwick',
  //   Position: 'HR Assistant',
  //   State: 'Arkansas',
  //   BirthDate: '1985/06/05',
  // },
  // {
  //   ID: 9,
  //   Prefix: 'Dr.',
  //   FirstName: 'Kent',
  //   LastName: 'Samuelson',
  //   Position: 'Ombudsman',
  //   State: 'Missouri',
  //   BirthDate: '1972/09/11',
  // }];


  // QCDocumentsList(): void {
  //   let organizationId = parseInt(localStorage.getItem('organizationId'));

  //   this._ClientAuditVisitService.QCDocumentsList(organizationId).subscribe((Response) => {
  //     this.employees = Response

  //   })
  // }
  // QCHistory(): void {
  //   //let organizationId =parseInt(localStorage.getItem('organizationId'));
  //   
  //   this._ClientAuditVisitService.QCHistory(this.projectId).subscribe((Response) => {
  //     this.QCDetail = Response

  //   })
  // }



  editRecord(e) {

    // var userId=item;
    var urlink = e;
    this.router.navigateByUrl(e + "ProjectId=" + this.projectId + "&StandardId=" + this.standardId + "&ClientId=" + this.ClientId+ "&AuditVisitId=" + this.AuditVisitId)

  }
  AllLibraryDocuments(Id) {

    this.pagedDto.keyword = this.keyword
    this.pagedDto.authAllowed = this.secRoleForm.authAllowed
    //this.pagedDto.pageSize = 3
    this.LibraryResourceService.GetDocumentsByStandardId(Id, this.pagedDto).subscribe((Response) => {


      this.totalCount = Response.totalCount
      this.LibraryList = Response.libraryModel
      // console.log(this.LibraryList)
      //
    })
  }
  DownloadLibraryfile(e): void {


    //this.id=e.row.data.id;
    var fillename = e.row.data.title;
    //this.LibraryResourceService.PostItemReturnListPagination().subscribe((result:Blob)=>
    // const downloadedFile = new Blob([data.body], { type: data.body.type });
    this.LibraryResourceService.downloadFile(parseFloat(e.row.data.id)).subscribe((result: Blob) => {
      const Blb = new Blob([result], { type: result.type });
      // const url=window.URL.createObjectURL(Blb);
      // window.open(url);
      // console.log("success");


      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.download = fillename;
      // const fileName =

      //="farooq";
      a.href = URL.createObjectURL(Blb);
      a.target = '_blank';
      a.click();
      document.body.removeChild(a);

    })
  }

  CheckReviewer() {
    
    const UserModel =

    {
      StandardId: this.standardId,
      UserId: parseInt(localStorage.getItem('userId'))






    };

    this._SlcpService.GetReviewerByStandard(UserModel).subscribe((Response) => {
      
      var reviwerData = Response
      if (reviwerData == null || reviwerData == undefined || reviwerData == "" || reviwerData == '' || reviwerData == NaN) {
        this.Revieweruser = false
      }
      else if (parseInt(reviwerData.userId) == parseInt(localStorage.getItem('userId'))) {

        this.Revieweruser = true
      }
      else { this.Revieweruser = false }
      this.loadSecRoleForm();
    })

  }
}
