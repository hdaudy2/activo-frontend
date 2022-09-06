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
import { create, groupBy } from 'lodash-es';
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
import { QCCommentsModel } from '@shared/Dto/QC-Comments-model';
import { QcDocumentModel } from '@shared/Dto/Qc-Document-model';
import { SlcpComponent } from '../slcp/slcp.component';
import { timeStamp } from 'console';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-qc-master-list',
  templateUrl: './qc-master-list.component.html',
  styleUrls: ['./qc-master-list.component.css']
})
export class QCMasterListComponent implements OnInit {
  @ViewChild('dataGridVar', { static: false }) dataGrid: DxDataGridComponent;
  public QCCommentsModel: QCCommentsModel = new QCCommentsModel();
  public QcDocumentModel: QcDocumentModel = new QcDocumentModel();
  public UserName: string
  @Input() formName: string
  public NewComments: any
  @Input() qCDetail = []
  datePipe = new DatePipe("en-US");
  secRoleForm
  tableSizes = [3, 5, 10, 15, 20, 25];
  public totalCount: number
  public pagedDto: PagedRequestModel = new PagedRequestModel()
  public btnSave: boolean = false
  QcDocumentsForm = new FormGroup({

    Comment: new FormControl(''),
    QcStatusId: new FormControl(''),
    File: new FormControl('')

  })
  submitted = false;
  QcStatusList = [];
  public QcmasterList = [];
  public QcCommentsId: number
  pageNumber: number = 1
  pageSize: number = 10
  public isEditShown: boolean
  public isViewShown: boolean
  public isAddShown: boolean
  public IsInsertAllow: boolean = false
  public projectId: number
  public standardId: number
  //public ProjectId: number
  public AuditVisitId: number
  public ClientId: number
  public QCDetail = []
  public QcdocumentsListId: number
  public DocumentsList = [];
  public userId: number
  fileToUpload: File;

  FileName:string;
  FileType:string;

  constructor(private _UserStandardService: UserStandardService,
    private _SlcpService: SlcpService,
    private _ClientService: ClientService,
    private _ClientAuditVisitService: ClientAuditVisitService,
    private _toster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,
    public AuditReportService: AuditReportService,

    // private SlcpComponent:SlcpComponent

    //public StandardService: StandardService
  ) {
    this.addComments = this.addComments.bind(this)
    this.onRowPrepared = this.onRowPrepared.bind(this)
    this.inCompliance = this.inCompliance.bind(this)
    this.editButton = this.editButton.bind(this)
  }

  displayStyle = "none";

  addComments(e) {
    this.QcdocumentsListId = 0;
    this.QcdocumentsListId = e.row.data.id;

    this.displayStyle = "block";

    //this.router.navigateByUrl('/app/pages/stock-management/library?'+this.id);  
  }

  loadSecRoleForm() {



    this.formName = "AuditReport"
    this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {

      let formName = (this.formName == undefined ? localStorage.getItem('formName') : this.formName)

      this.secRoleForm = data.find(x => x.formCode != null && x.formCode == this.formName)

      //this.isEditShown= this.secRoleForm.authAllowed
      // this.isViewShown = this.secRoleForm.authAllowed

      // var formName = "User"
      // this._makerAuthorizerFormService.getSecRoleForm().subscribe((data) => {
      //   this.secRoleForm = data.find(x => x.formName.toLocaleLowerCase() == formName.toLocaleLowerCase())
      if (this.secRoleForm.authAllowed == true) {
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
      }
      else {
        this.isViewShown = false
        this.isEditShown = false
      }
      //this.isViewShown = this.secRoleForm.authAllowed
    })

  }
  ngOnInit(): void {
    this.UploadList()
    this.AllQcStatus()
  }

  UploadList() {
    debugger
    var ur = window.location.href.split("/")[7];
    var com = [] = ur.split("?")[1];
    if (com != undefined && com != null) {
      var Parameter1 = com.split("&")[0];
      var Parameter2 = com.split("&")[1];
      var Parameter3 = com.split("&")[2];
      var Parameter4 = com.split("&")[3];


      if (Parameter1.split("=")[0] == "ProjectId") {
        this.projectId = parseInt(Parameter1.split("=")[1]);
      }
      else if (Parameter1.split("=")[0] == "StandardId") {
        this.standardId = parseInt(Parameter1.split("=")[1]);
      }
      else if (Parameter1.split("=")[0] == "ClientId") {
        this.ClientId = parseInt(Parameter1.split("=")[1]);
      }
      else if (Parameter1.split("=")[0] == "AuditVisitId") {
        this.AuditVisitId = parseInt(Parameter1.split("=")[1]);
      }



      if (Parameter2.split("=")[0] == "StandardId") {
        this.standardId = parseInt(Parameter2.split("=")[1]);
      }
      else if (Parameter2.split("=")[0] == "ProjectId") {
        this.projectId = parseInt(Parameter2.split("=")[1]);
      }
      else if (Parameter2.split("=")[0] == "ClientId") {
        this.ClientId = parseInt(Parameter2.split("=")[1]);
      }
      else if (Parameter2.split("=")[0] == "AuditVisitId") {
        this.AuditVisitId = parseInt(Parameter2.split("=")[1]);
      }



      if (Parameter3.split("=")[0] == "StandardId") {
        this.standardId = parseInt(Parameter2.split("=")[1]);
      }
      else if (Parameter3.split("=")[0] == "ProjectId") {
        this.projectId = parseInt(Parameter2.split("=")[1]);
      }
      else if (Parameter3.split("=")[0] == "ClientId") {
        this.ClientId = parseInt(Parameter3.split("=")[1]);
      }
      else if (Parameter3.split("=")[0] == "AuditVisitId") {
        this.AuditVisitId = parseInt(Parameter3.split("=")[1]);
      }


      if (Parameter4.split("=")[0] == "StandardId") {
        this.standardId = parseInt(Parameter4.split("=")[1]);
      }
      else if (Parameter4.split("=")[0] == "ProjectId") {
        this.projectId = parseInt(Parameter4.split("=")[1]);
      }
      else if (Parameter4.split("=")[0] == "ClientId") {
        this.ClientId = parseInt(Parameter4.split("=")[1]);
      }
      else if (Parameter4.split("=")[0] == "AuditVisitId") {
        this.AuditVisitId = parseInt(Parameter4.split("=")[1]);
      }
      // var  ur ;
      // ur=window.location.href.split("/")[7];
      // var com=[]=ur.split("?")[1];
      // if(com!=undefined && com!=null)
      // {
      //   this.projectId=com.split("=")[0];
      this.QCDocumentsList();



    }

    debugger
    this._ClientAuditVisitService.QCHistory(this.AuditVisitId).subscribe((Response) => {
      this.QCDetail = Response
      console.log(this.QCDetail)

    })
  }
  get f() { return this.QcDocumentsForm.controls; }
  saveComment(): void {


    this.submitted = true;

    // stop here if form is invalid
    if (this.QcDocumentsForm.invalid) {
      this._toster.error("Some fields are required ");
      return;
    }
   
    this.UserName = localStorage.getItem('userName').toString()
    var userStr = this.UserName.replace(/['"]+/g, '');
    //console.log(someStr.replace(/['"]+/g, ''));
    //this._toster.info(someStr.replace(/['"]+/g, ''))
    //let LoginUserId = parseInt(localStorage.getItem('userId'));
    const QCModel =

    {

      id: 0,
      isDeleted: false,
      projectId: this.projectId,
      qcStatusId: parseInt(this.QcDocumentsForm.get('QcStatusId').value),
      qcdocumentsListId: this.QcdocumentsListId,
      remarks: this.QcDocumentsForm.get('Comment').value,
      remarksBy: userStr,
      remarksById: parseInt(localStorage.getItem('userId')),
      remarksDate: new Date(),
      remarksUpdateById: null,
      renarksUpdateDate: null,
      clientAuditVisitId: this.AuditVisitId,
      qcRemarksFile:this.base64Output,
      documentName:this.FileName,
      documentContentType:this.FileType

      // id:0,
      // remarksById:parseInt(localStorage.getItem('userId')),
      // remarks: this.QcCommentsForm.get('Comment').value,
      // qcdocumentsListId: this.QcdocumentsListId.toString(),
      // projectId: this.projectId.toString(),


    }

    this.QCDetail.push(QCModel)
    debugger
    //this.QCDetail=this.qCDetail
    this.dataGrid.instance.refresh()
    this.displayStyle = "none";
    //this.QcmasterList=this.QcmasterList
    //this.QCDetail=this.QCDetail

    debugger
    debugger

    // if (this.QcDocumentsForm.get('Comment').value != this.QcDocumentsForm.get('Comment').value) {
    //   this._toster.error("Password doesn't match Confirm Password", "Alert")
    //   return
    // }

    // let LoginUserId = parseInt(localStorage.getItem('userId'));

    // if(this.QcCommentsId>0)
    // {  this.QCCommentsModel.Id=this.QcCommentsId}

    // this.QCCommentsModel.ProjectId=this.projectId
    // this.QCCommentsModel.Remarks=this.QcDocumentsForm.get('Comment').value,
    // this.QCCommentsModel.QcdocumentsListId=this.QcdocumentsListId
    // this.QCCommentsModel.RemarksById=LoginUserId;
    // this.QCCommentsModel.QcStatusId=parseInt(this.QcDocumentsForm.get('QcStatusId').value)

    // this._ClientAuditVisitService.AddComment(this.QCCommentsModel).subscribe((Response) => {

    //   this._toster.info(Response.message)
    //   this.UploadList();


    // })
  }

  openPopup() {
    this.displayStyle = "block";

  }

  closePopup() {
    this.displayStyle = "none";
  }

  QCDocumentsList(): void {
    this.pagedDto.projectId = this.projectId

    this.pagedDto.organizationId = parseInt(localStorage.getItem('organizationId'));
    this.userId = parseInt(localStorage.getItem('userId'))
    this.pagedDto.standardId = this.standardId;

    //let organizationId =parseInt(localStorage.getItem('organizationId'));
    this._ClientAuditVisitService.QCDocumentsList(this.AuditVisitId, this.pagedDto).subscribe((Response) => {
      this.QcmasterList = Response.qcDocumentsListModel
      var ClientAuditVisitModel = Response.clientAuditVisitModel
      if (Response.clientAuditVisitModel.reviewerId == this.userId) {
        this.btnSave = true

      }

    })
  }

  editRecord(e) {

    // var userId=item;
    var urlink = e;
    this.router.navigateByUrl(e + "ProjectId=" + this.projectId + "&StandardId=" + this.standardId + "&ClientId=" + this.ClientId + "&AuditVisitId=" + this.AuditVisitId)

  }
  onRowPrepared(e) {
    debugger
    if (e.rowType === "data") {
      if (e.data.statusName === "Pending") {
        e.rowElement.style.backgroundColor = "#099299";
        e.rowElement.style.color = "white";
      }
      else if (e.data.statusName === "Major") {
        e.rowElement.style.backgroundColor = "#e62727";
        e.rowElement.style.color = "white";
      }
      else if (e.data.statusName === "Minor") {
        e.rowElement.style.backgroundColor = "#d6730f";
        e.rowElement.style.color = "white";
      }
      else if (e.data.statusName === "In Compliance") {
        e.rowElement.style.backgroundColor = "#358736";
        e.rowElement.style.color = "white";
      }
      else if (e.data.statusName === "Critical") {
        e.rowElement.style.backgroundColor = "#48489c";
        e.rowElement.style.color = "white";
      }


    }
  }
  AllQcStatus(): void {


    this._ClientAuditVisitService.AllQcStatus().subscribe((Response) => {
      this.QcStatusList = Response

    })
  }
  onCellPrepared(e) {
    debugger
    if (e.rowType == 'data') {
      if (e.row.Cells[2]) {
        e.cellElement.css("color", "orange");
        //e.row.Cells[2].e.cellElement.css("color", "white");

      }

      // e.cellElement.css("color", "orange"); // pending
    }
  }



  inCompliance(e) {

    //  this.documents.forEach( (item, index) => {
    //      if(item === doc) this.documents.splice(index,1);
    //    });

    this.QcdocumentsListId = 0;
    this.QcdocumentsListId = e.row.data.id;
    this.UserName = localStorage.getItem('userName').toString()
    var userStr = this.UserName.replace(/['"]+/g, '');

    const QCModel =

    {

      id: 0,
      isDeleted: false,
      projectId: this.projectId,
      qcStatusId: 1,
      qcdocumentsListId: this.QcdocumentsListId,
      remarks: "In Compliance",
      remarksBy: userStr,
      remarksById: parseInt(localStorage.getItem('userId')),
      remarksDate: new Date(),
      remarksUpdateById: null,
      renarksUpdateDate: null,
      clientAuditVisitId: this.AuditVisitId
      // id:0,
      // remarksById:parseInt(localStorage.getItem('userId')),
      // remarks: this.QcCommentsForm.get('Comment').value,
      // qcdocumentsListId: this.QcdocumentsListId.toString(),
      // projectId: this.projectId.toString(),


    }

    this.QCDetail.push(QCModel)
    debugger
    //this.QCDetail=this.qCDetail
    this.dataGrid.instance.refresh()

    let LoginUserId = parseInt(localStorage.getItem('userId'));
    // const QCModel =

    // {
    //   Id:0,
    //   RemarksById:this.userId.toString(),
    //   Remarks: this.QcDocumentsForm.get('Comment').value,
    //   QcdocumentsListId: this.QcdocumentsListId.toString(),
    //   ProjectId: this.projectId.toString(),


    // }
    // if(this.QcCommentsId>0)
    // {  this.QCCommentsModel.Id=this.QcCommentsId}

    // this.QCCommentsModel.ProjectId=this.projectId
    // this.QCCommentsModel.Remarks="",
    // this.QCCommentsModel.QcdocumentsListId=this.QcdocumentsListId
    // this.QCCommentsModel.RemarksById=LoginUserId;
    // this.QCCommentsModel.QcStatusId=1;

    // this._ClientAuditVisitService.AddComment(this.QCCommentsModel).subscribe((Response) => {

    //   this._toster.info(Response.message)
    //   this.UploadList();
    //   // this.router.navigateByUrl('/app/pages/security-module/agency')

    // })

    //this.router.navigateByUrl('/app/pages/stock-management/library?'+this.id);  
  }
  // eventHandler(event:string[]){
  //   debugger
  //   this.QCDetail = event;
  // }
  addItem(newItem: []) {
    debugger
    this.QCDetail = newItem;
    this.dataGrid.instance.refresh()

  }

  SaveAllComments(): void {
    debugger
    //this.QcmasterList.length ;
    //var grouped = groupBy(this.QCDetail, pet => pet.qcdocumentsListId);

    // var count= grouped.count;
    // const ids = this.QCDetail.map((obj) => {
    //   return obj.qcdocumentsListId;
    // });



    var result = [];
    this.QCDetail.reduce(function (res, value) {
      if (!res[value.qcdocumentsListId]) {

        res[value.qcdocumentsListId] = { qcdocumentsListId: value.qcdocumentsListId };
        result.push(res[value.qcdocumentsListId])
      }
      //res[value.qcdocumentsListId].qty += value.qty;
      return res;
    }, {});

    console.log(result)
    result.length
    //  var test= groupBy(ids);
    //  var test1= groupBy(ids).length;
    //  var test2= groupBy(ids).count;
    //var grou = groupBy(ids, pet => pet.qcdocumentsListId);
    if (result.length != this.QcmasterList.length) {
      console.log(result.length);
      console.log(this.QcmasterList.length);

      this._toster.error("Please fill all Questions", "Alert");
      return;
    }
    //console.log(grouped)
    //  id: 0,
    //  isDeleted: false,
    //  projectId: this.projectId,
    //  qcStatusId: parseInt(this.QcDocumentsForm.get('QcStatusId').value),
    //  qcdocumentsListId: this.QcdocumentsListId,
    //  remarks:this.QcDocumentsForm.get('Comment').value,
    //  remarksBy:userStr,
    //  remarksById: parseInt(localStorage.getItem('userId')),
    //  remarksDate:new Date(),
    //  remarksUpdateById: null,
    //  renarksUpdateDate: null,
    //  qcRemarksFile:this.fileToUpload
    this.NewComments = this.QCDetail.filter(item => item.id === 0);
    // console.log("SaveAll");
    // console.log(this.NewComments);
    const formData = new FormData();


    formData.append("QCHistoryModel[]", this.NewComments);




    //this._ClientAuditVisitService.AddCommentList(formData).subscribe((Response) => {
    this._ClientAuditVisitService.AddCommentList(this.NewComments).subscribe((Response) => {

      this._toster.info(Response.message)
      this.UploadList();
      this.closePopup()
      // this.router.navigateByUrl('/app/pages/security-module/agency')

    })

  }
  handlefileInput(e: any) {
debugger
    this.fileToUpload = <File>e?.target?.files[0];
  this.FileName=this.fileToUpload.name
    this.FileType=this.fileToUpload.type
    console.log(this.FileName);
    console.log(this.FileType);

    //this.url=e.target.value; 
    // this.convertFile(e.target.files[0]).subscribe(base64 => {
    //   this.base64Output = base64;
    //   debugger
    //   //const source = `data:application/pdf;base64,${this.base64Output}`;
    //   const source = "data:"+this.FileType+";base64,"+this.base64Output;

    //   // console.log("ttttt");
    //   // console.log(source);
    //   // console.log(source2);
    //   const link = document.createElement("a");
    //   link.href = source;
    //   //link.download = `${this.FileName}.pdf`
    //   link.download = this.FileName
    //   link.click();

      
    // });
    // const source = `data:application/pdf;base64,${this.base64Output}`;
    // //const source = "`data:"+this.FileType+";base64,${base64}`";
    // const link = document.createElement("a");
    // link.href = source;
    // //link.download = `${this.FileName}.pdf`
    // link.download = `${"farooq"}.pdf`
    // link.click();
  }
  editButton(e) {

    debugger
    // if(this.btnSave==true)
    // {
    //   return !e.row.isEditing;

    // }
    var detaildata = this.QCDetail.filter((obj) => obj.qcdocumentsListId === e.row.data.id)
    let count = detaildata.filter((obj) => obj.id === 0).length;
    if (count > 0 || e.row.data.statusId == "1") {
      // console.log(count)
      //  if (e.row.data.statusId=="1")
      //   {
      return e.row.isEditing;
    }

    else {
      if (this.btnSave == true) {
        return !e.row.isEditing;

      }
      else {
        return e.row.isEditing;
      }
    }


  }



   base64Output : string;

  onFileSelected(event) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
     // this.base64Output = base64;
      const source = `data:application/pdf;base64,${base64}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${"Test File"}.pdf`
      link.click();
  
    });
 
      
  }
  convertFile(file : File) : Observable<string> {
    debugger
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
}
