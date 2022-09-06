import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants

// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
// import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
// Pages Modules
import { StockManagementModule } from 'app/pages/stock-management/stock-management.module';
import { SalesModule } from './pages/sales/sales.module';
import { ReportsModule } from './pages/reports/reports.module';
import { SecurityModuleModule } from './pages/security-module/security-module.module';
import { CertificationSetupsModule } from './pages/certification-setups/certification-setups.module';
import { MasterSetupsModule } from './pages/master-setups/master-setups.module';
import { OperationsModule } from './pages/Operations/Operations.module';
import { CalendarModule } from './pages/calendar/calendar.module';
import { TenantServicesModule } from './tenant/tenant-services/tenant-services.module';

//import { LibraryResourcesListComponent } from './pages/stock-management/library-resources-list/library-resources-list.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
//Dx Button
import { DxBulletModule, DxButtonModule, DxContextMenuModule, DxTemplateModule, DxTreeListModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { DxListModule } from "devextreme-angular";
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { EditLibraryComponent } from './edit-library/edit-library.component';
import { RouterModule } from '@angular/router';
import { StandardTypeComponent } from './pages/master-setups/standard-type/standard-type.component';
import { CountryComponent } from './pages/master-setups/country/country.component';
import { StateComponent } from './pages/master-setups/state/state.component';
import { CityComponent } from './pages/master-setups/city/city.component';
//import { HiggComponent } from './pages/sales/higg/higg.component';
//import { SlcpComponent } from './pages/sales/slcp/slcp.component';
import { CertificationBodyComponent } from './pages/master-setups/certification-body/certification-body.component';
import { EaCodeComponent } from './pages/master-setups/ea-code/ea-code.component';
import { NaceCodeComponent } from './pages/master-setups/nace-code/nace-code.component';
import { CourseTypeComponent } from './pages/master-setups/course-type/course-type.component';
import { SectionComponent } from './pages/master-setups/section/section.component';
import { AudditorTypeComponent } from './pages/master-setups/audditor-type/audditor-type.component';
import { LegislationComponent } from './pages/master-setups/legislation/legislation.component';
import { AccreditationComponent } from './pages/master-setups/accreditation/accreditation.component';
import { ApplicationTypeComponent } from './pages/master-setups/application-type/application-type.component';
import { ProjectAmountComponent } from './pages/master-setups/project-amount/project-amount.component';

import { ProjectAmountReportsComponent } from './pages/reports/project-amount-reports/project-amount-reports.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
//import { AuditPlanListComponent } from './pages/sales/audit-plan-list/audit-plan-list.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { QcDocumentComponent } from './pages/master-setups/qc-document/qc-document.component';
import { DashboardComponent } from './pages/master-setups/dashboard/dashboard.component';
import { UIModule } from './UI/UI.module';
import { BuildingModule } from './tenant/building/building.module';
import { UtilityModule } from './utility/utility.module';
import { ClientModule } from './tenant/Client/Client.module'
import{UserManagementModule} from './tenant/User-Management/UserManagement.module'
// import { StateCardMiniComponent } from './UI/state-card-mini/state-card-mini.component';
// import { StateCardTabComponent } from './UI/state-card-tab/state-card-tab.component';
// import { TenantsRegistrationComponent } from '../account/tenants-registration/tenants-registration.component'; 

// import { HolidayCalendarComponent } from './pages/calendar/holiday-calendar/holiday-calendar.component';

//import {interactionPlugin} from '@fullcalendar/interaction'; // a plugin!
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  //interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // tenants


    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    // HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent,
    EditLibraryComponent,
    StandardTypeComponent,
    CountryComponent,
    StateComponent,
    CityComponent,
    // HiggComponent,
    // SlcpComponent,
    CertificationBodyComponent,
    EaCodeComponent,
    NaceCodeComponent,
    CourseTypeComponent,
    SectionComponent,
    AudditorTypeComponent,
    LegislationComponent,
    AccreditationComponent,
    ApplicationTypeComponent,
    ProjectAmountComponent,
    ProjectAmountReportsComponent,
    QcDocumentComponent,
    DashboardComponent,

    // TenantsRegistrationComponent


    //HolidayCalendarComponent,

    //AuditReportListComponent,

    //AuditPlanListComponent,


    // LibraryResourcesListComponent,


  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    DxListModule,
    RouterModule,
    NgxUiLoaderModule,
    NgIdleKeepaliveModule.forRoot(),
    //Dx Button
    DxButtonModule,
    DxDataGridModule,

    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxTreeListModule,
    DxContextMenuModule,
    //pages module
    StockManagementModule,
    SalesModule,
    SecurityModuleModule,
    MasterSetupsModule,
    FullCalendarModule,
    CalendarModule,
    SalesModule,
    OperationsModule,
    UIModule,
    TenantServicesModule,
    BuildingModule,
    ClientModule,
    UserManagementModule,
    UtilityModule
  ],
  providers: [],
  entryComponents: [
    // tenants

    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
  ],
})
export class AppModule { }
