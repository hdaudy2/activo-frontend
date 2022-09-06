
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


import { Injector, QueryList, ViewChildren } from '@angular/core';


import { animate, state, style, transition, trigger } from '@angular/animations';
import { max } from 'rxjs/operators';
//import { daygr } from '@fullcalendar/daygrid'; // useful for typechecking
import { CalendarOptions } from '@fullcalendar/angular';
//import * as moment from 'moment-timezone';

@Component({
  selector: 'app-audit-plan-list',
  templateUrl: './audit-plan-list.component.html',
  styleUrls: ['./audit-plan-list.component.css']
})
export class AuditPlanListComponent implements OnInit {
  public calendar = []
  calendarOptions: CalendarOptions

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  public VisitModel: ClientAuditVisitModel = new ClientAuditVisitModel();
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
  public IsContract: boolean
  public keyword: string = ''
  public savebtn: boolean = true
  public deletebtn: boolean = false
  public btnApproval: boolean = false
  public ApprovalList = [];
  public NaceCodeList = [];
  public savedownload: boolean = false
  public LeadAuditorList = [];
  public VisitTypeList = [];
  public VisitStatusList = [];
  public projyctcodelist = [];
  public AllVisitDataList = []
  //public calendar=[]
  public OrganizationId: number
  standardId: number
  projectId: number
  public isShown: boolean = false
  public authorizer: boolean = false
  fileToUpload: any;
  clientinfo: any;
  submitted = false;
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

  constructor(private _UserStandardService: UserStandardService,
    private _SlcpService: SlcpService,
    private _ClientService: ClientService,
    private _ClientAuditVisitService: ClientAuditVisitService,
    private _toster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _makerAuthorizerFormService: MakerAuthorizerFormService,

    //public StandardService: StandardService
  ) {
    this.edit = this.edit.bind(this);
    this.review = this.review.bind(this);
    this.UploadReport = this.UploadReport.bind(this);
    //this.eventClick=this.eventClick.bind(this);


    //this.dateClick: this.handleDateClick.bind(this),
  }

  ngOnInit(): void {
    this.loadSecRoleForm();
    this.onSearch();

    // this.editVisit()
  }
  AuditPlanForm = new FormGroup({

  })


  ClientAuditPlanId: number
  ngAfterViewInit(): void {


  }

  loadSecRoleForm() {



    this.formName = "AuditPlanList"
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
          this.isAddShown = true
        }
        else {
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

  edit() {
    this.projectId = this.route.snapshot.params.id;

    var ur;
    ur = window.location.href.split("/")[7];
    var com = [] = ur.split("?")[1];
    if (com != undefined && com != null) {
      var Parameter1 = com.split("&")[0];
      var Parameter2 = com.split("&")[1];


      if (Parameter1.split("=")[0] == "StandardId") {
        this.standardId = Parameter1.split("=")[1];
      }
      else if (Parameter1.split("=")[0] == "ProjectId") {
        this.projectId = Parameter1.split("=")[1];
      }

      if (Parameter2.split("=")[0] == "StandardId") {
        this.standardId = Parameter2.split("=")[1];
      }
      else if (Parameter2.split("=")[0] == "ProjectId") {
        this.projectId = Parameter2.split("=")[1];
      }

      this.onSearch();

    }

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

    var userId = localStorage.getItem('userId');
    this.pagedDto.keyword = userId.toString();
    this.pagedDto.authAllowed = true
    //this.pagedDto.pageSize = 3
    this.pagedDto.ViewAllRecord = this.secRoleForm.viewRecordAllowed;
    this._ClientAuditVisitService.AuditPlan(parseInt(userId), this.pagedDto).subscribe((Response) => {


      this.totalCount = Response.totalCount
      this.AllVisitDataList = Response.clientAuditModel
      for (var _i = 0; _i < this.AllVisitDataList.length; _i++) {
        var num = this.AllVisitDataList[_i].startDate;
        let from_Date = new Date(this.datePipe.transform(this.AllVisitDataList[_i].startDate, 'yyyy/MM/dd'))

        var startdate = this.datePipe.transform(from_Date, 'yyyy-MM-dd')


        let EndDate = new Date(this.datePipe.transform(this.AllVisitDataList[_i].endDate, 'yyyy/MM/dd'))

        var endDate = this.datePipe.transform(EndDate, 'yyyy-MM-dd')
        var bndate = this.AllVisitDataList[_i].endDate + 1;
        var yy = parseInt(endDate.split("-")[0]);
        var mm = parseInt(endDate.split("-")[1]);
        var dd = parseInt(endDate.split("-")[2]);
        var newdd;
        var newmth = mm.toString();
        if (dd < 10) {
          dd = dd + 1;
          newdd = "0" + dd.toString()

        }
        else {
          dd = dd + 1;
          newdd = dd.toString()
        }
        if (mm < 10) {

          newmth = "0" + mm.toString();
        }
        var color = "blue"
        if (this.AllVisitDataList[_i].visitStatusId == 7) {
          color = "green"
          // color="red"

        }
        var stdate = new Date(this.AllVisitDataList[_i].startDate);
        var date1 = new Date(this.AllVisitDataList[_i].endDate);
        var currentDate = new Date();
        if (date1.getTime() < currentDate.getTime()) {

          if (this.AllVisitDataList[_i].visitStatusId != 7) {
            //color="blue"
            color = "red"
          }
        }

        if (stdate.getTime() <= currentDate.getTime() && date1.getTime() >= currentDate.getTime()) {

          if (this.AllVisitDataList[_i].visitStatusId != 7) {

            color = "#ff9999"
          }
        }
        var newdate = (yy + "-" + newmth + "-" + newdd).toString();


        var endate = new Date();

        const item2 = {

          title: this.AllVisitDataList[_i].standardName + "            (" + this.AllVisitDataList[_i].projectCode + ")",
          //date: startdate,
          // default: "100%"
          start: startdate,
          end: newdate,
          backgroundColor: color,
          url: '/#/app/pages/sales/audit-plan?ProjectId=' + this.AllVisitDataList[_i].projectId + "&StandardId=" + this.AllVisitDataList[_i].standardId + "&ClientId=" + this.AllVisitDataList[_i].clientId + "&AuditVisitId=" + this.AllVisitDataList[_i].id,

          //innerWidth:'200px',
          // title: 'my name is farooq my father name is fayyaz',
          // date: '2022-01-05',
          //textColor: 'yellow',


        };
        this.calendar.push(item2);


      }
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        navLinks: true,
        editable: true,

        //weekends: true,
        displayEventEnd: true,
        //this.eventClick= this.eventClick.bind(this),
        eventClick: function (arg) {

          //arg.jsEvent.preventDefault();
          //window.open(arg.event.url);
          this.router.navigateByUrl(arg.event.url);
          // alert(arg.event.title)
          // alert(arg.event.start)
        },
        //eventLimit : true,
        //height: '100%',
        // fixedWeekCount: false,

        // // allDaySlot: false,
        // displayEventTime: true,
        // editable: true,
        // // eventLimit: true,
        // lazyFetching: false,
        // nowIndicator: true,
        // refetchResourcesOnNavigate: true,
        events:
          this.calendar

      };

    })


  }
  // eventClick(event) {
  //   
  //   this.router.navigateByUrl('/app/pages/sales/audit-plan?'+94);
  // }


  reloadGrid() {

    this.pagedDto.page = 1;
    this.onSearch();
  }

  review(e) {


    this.router.navigateByUrl('/app/pages/sales/audit-plan?' + e.row.data.projectId);


  }
  UploadReport(e) {
    this.router.navigateByUrl('/app/pages/sales/audit-report?' + "ProjectId=" + e.row.data.projectId + "&AuditVisitId=" + e.row.data.id);

    //  this.router.navigateByUrl('/app/pages/sales/audit-report?'+e.row.data.id);


  }

}

