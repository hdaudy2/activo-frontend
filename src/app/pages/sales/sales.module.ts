import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ApplicantFormComponent } from './applicant-form/applicant-form.component';
// import { ApplicantInfoComponent } from './applicant-form/applicant-info/applicant-info.component';

import { TaskBoardComponent } from './task-board/task-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '@app/app-routing.module';
import { ClientAddProjectComponent } from './client-add-project/client-add-project.component';
import { TaskBoardListComponent } from './task-board-list/task-board-list.component';
import { ClientSitesComponent } from './client-sites/client-sites.component';
import { ClientAddVisitComponent } from './client-add-visit/client-add-visit.component';
import { DxBulletModule, DxDataGridModule, DxSpeedDialActionModule, DxTemplateModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { HiggComponent } from './higg/higg.component';
import { SlcpComponent } from './slcp/slcp.component';
import { ProjectSA8000Component } from './project-sa8000/project-sa8000.component';

import { AllProjectsComponent } from './all-projects/all-projects.component';

import { ProjectRemarksComponent } from './project-remarks/project-remarks.component';
import { ISO14012015Component } from './iso14012015/iso14012015.component';
import { AuditPlanListComponent } from './audit-plan-list/audit-plan-list.component';
import { AuditPlanComponent } from './audit-plan/audit-plan.component';
import { AuditReportComponent } from './audit-report/audit-report.component';
import { AuditReportListComponent } from './audit-report-list/audit-report-list.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
//import { AuditPlanListComponent } from './pages/sales/audit-plan-list/audit-plan-list.component';
import dayGridPlugin from '@fullcalendar/daygrid';


import { QCDetailGridComponent } from './qc-detail-grid/qc-detail-grid.component';

import { QCMasterListComponent } from './qc-master-list/qc-master-list.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  //interactionPlugin
]);
@NgModule({
  declarations: [
    // ApplicantFormComponent,
    TaskBoardComponent,
    ClientAddProjectComponent,
    TaskBoardListComponent,
    ClientSitesComponent,
    ClientAddVisitComponent,
    HiggComponent,
    SlcpComponent,
    AllProjectsComponent,
    ProjectSA8000Component,
    ProjectRemarksComponent,
    ISO14012015Component,
    AuditPlanListComponent,
    AuditPlanComponent,
    AuditReportComponent,
    AuditReportListComponent,
    QCDetailGridComponent,
 
    QCMasterListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forChild(),
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxSpeedDialActionModule,
    NgxPaginationModule,
    FullCalendarModule,
    
  ]

})
export class SalesModule { }
