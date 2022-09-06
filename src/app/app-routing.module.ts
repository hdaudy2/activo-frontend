import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { UsersComponent } from "./users/users.component";

import { RolesComponent } from "app/roles/roles.component";
import { ChangePasswordComponent } from "./users/change-password/change-password.component";
import { IndentingMakerListComponent } from "./pages/stock-management/indenting-maker-list/indenting-maker-list.component";

//sales
// import { ApplicantFormComponent } from './pages/sales/applicant-form/applicant-form.component';
// import { ApplicantInfoComponent } from './pages/sales/applicant-form/applicant-info/applicant-info.component';
import { TaskBoardComponent } from "./pages/sales/task-board/task-board.component";
import { TaskBoardListComponent } from "./pages/sales/task-board-list/task-board-list.component";

//Security Group
import { RolesWithPermissionComponent } from "./pages/security-module/roles-with-permission/roles-with-permission.component";
import { UserWithLocationsComponent } from "./pages/security-module/user-with-locations/user-with-locations.component";
import { RolesWithPermissionTaskBoardComponent } from "./pages/security-module/roles-with-permission-task-board/roles-with-permission-task-board.component";
import { RolesWithPermissionAuthorizerComponent } from "./pages/security-module/roles-with-permission-authorizer/roles-with-permission-authorizer.component";
import { UserWithLocationAuthorizerComponent } from "./pages/security-module/user-with-location-authorizer/user-with-location-authorizer.component";
import { UserWithLocationAuthorizerTaskBoardComponent } from "./pages/security-module/user-with-location-authorizer-task-board/user-with-location-authorizer-task-board.component";
import { RolesWithPermissionAuthorizerTaskBoardComponent } from "./pages/security-module/roles-with-permission-authorizer-task-board/roles-with-permission-authorizer-task-board.component";
import { UserWithLocationsTaskBoardComponent } from "./pages/security-module/user-with-locations-task-board/user-with-locations-task-board.component";
import { UserlocationTabComponent } from "./pages/security-module/userlocation-tab/userlocation-tab.component";
import { UserStandardsComponent } from "./pages/security-module/user-standards/user-standards.component";

import { LibraryComponent } from "./pages/stock-management/library/library.component";
import { CertificateComponent } from "./pages/certification-setups/certificate/certificate.component";
import { RolesMasterComponent } from "./pages/security-module/roles-master/roles-master.component";
import { RolesMasterTaskBoardComponent } from "./pages/security-module/roles-master-task-board/roles-master-task-board.component";
import { AgencyComponent } from "./pages/security-module/agency/agency.component";
import { AgencyTaskBoardComponent } from "./pages/security-module/agency-task-board/agency-task-board.component";
import { UserAcademicComponent } from "./pages/security-module/user-academic/user-academic.component";
import { UserProfessionalComponent } from "./pages/security-module/user-professional/user-professional.component";
import { UserEmploymentComponent } from "./pages/security-module/user-employment/user-employment.component";
import { UserCpdComponent } from "./pages/security-module/user-cpd/user-cpd.component";
import { UserConsultancyComponent } from "./pages/security-module/user-consultancy/user-consultancy.component";
import { UserAuditsComponent } from "./pages/security-module/user-audits/user-audits.component";
import { UserAuditorComponent } from "./pages/security-module/user-auditor/user-auditor.component";
import { ClientAddProjectComponent } from "./pages/sales/client-add-project/client-add-project.component";
import { UserDeclarationComponent } from "./pages/security-module/user-declaration/user-declaration.component";
import { ClientSitesComponent } from "./pages/sales/client-sites/client-sites.component";
import { ClientAddVisitComponent } from "./pages/sales/client-add-visit/client-add-visit.component";
import { EditLibraryComponent } from "./edit-library/edit-library.component";

import { ModuleComponent } from "./pages/certification-setups/module/module.component";
import { HiggComponent } from "./pages/sales/higg/higg.component";
import { SlcpComponent } from "./pages/sales/slcp/slcp.component";
import { AllProjectsComponent } from "./pages/sales/all-projects/all-projects.component";
import { UserReviewComponent } from "./pages/security-module/user-review/user-review.component";
import { UserRemarksComponent } from "./pages/security-module/user-remarks/user-remarks.component";
import { ProjectSA8000Component } from "./pages/sales/project-sa8000/project-sa8000.component";

//Calendar
import { HolidayCalendarComponent } from "./pages/calendar/holiday-calendar/holiday-calendar.component";

//Master Setups
import { DocumentTypeComponent } from "./pages/master-setups/document-type/document-type.component";
import { StandardTypeComponent } from "./pages/master-setups/standard-type/standard-type.component";
import { CountryComponent } from "./pages/master-setups/country/country.component";
import { CertificationBodyComponent } from "./pages/master-setups/certification-body/certification-body.component";
import { EaCodeComponent } from "./pages/master-setups/ea-code/ea-code.component";
import { NaceCodeComponent } from "./pages/master-setups/nace-code/nace-code.component";
import { CourseTypeComponent } from "./pages/master-setups/course-type/course-type.component";
import { SectionComponent } from "./pages/master-setups/section/section.component";
import { AudditorTypeComponent } from "./pages/master-setups/audditor-type/audditor-type.component";
import { LegislationComponent } from "./pages/master-setups/legislation/legislation.component";
import { AccreditationComponent } from "./pages/master-setups/accreditation/accreditation.component";
import { ApplicationTypeComponent } from "./pages/master-setups/application-type/application-type.component";
import { StateComponent } from "./pages/master-setups/state/state.component";
import { CityComponent } from "./pages/master-setups/city/city.component";
import { ProjectRemarksComponent } from "./pages/sales/project-remarks/project-remarks.component";
import { ISO14012015Component } from "./pages/sales/iso14012015/iso14012015.component";
import { AuditPlanListComponent } from "./pages/sales/audit-plan-list/audit-plan-list.component";
import { AuditPlanComponent } from "./pages/sales/audit-plan/audit-plan.component";
import { AuditReportComponent } from "./pages/sales/audit-report/audit-report.component";
import { ProjectAmountComponent } from "./pages/master-setups/project-amount/project-amount.component";
import { AuditReportListComponent } from "./pages/sales/audit-report-list/audit-report-list.component";
import { ProjectAmountReportsComponent } from "./pages/reports/project-amount-reports/project-amount-reports.component";
import { QCDetailGridComponent } from "./pages/sales/qc-detail-grid/qc-detail-grid.component";

import { QCMasterListComponent } from "./pages/sales/qc-master-list/qc-master-list.component";
import { QcDocumentComponent } from "./pages/master-setups/qc-document/qc-document.component";

import { ConsultantComponent } from "./pages/Operations/consultant/consultant.component";
import { DashboardComponent } from "./pages/master-setups/dashboard/dashboard.component";

import { ServiceRequestComponent } from "./tenant/tenant-services/service-request/service-request.component";
import { ServiceRequestEditComponent } from "./tenant/tenant-services/service-request-edit/service-request-edit.component";
import { ServiceRequestListComponent } from "./tenant/tenant-services/service-request-list/service-request-list.component";
import { BuildingComponent } from "./tenant/building/building/building.component";
import { BuildingListComponent } from "./tenant/building/building-list/building-list.component";
import { BuildingEditComponent } from "./tenant/building/building-edit/building-edit.component";
import { FloorListComponent } from "./tenant/building/floor-list/floor-list.component";
import { FlatListComponent } from "./tenant/building/flat-list/flat-list.component";
import { ParkingSlotListComponent } from "./tenant/building/parkingSlot-list/parkingSlot-list.component";
import { ServiceTypeComponent } from "./utility/service-type/service-type.component";
import { ClientListComponent } from "./tenant/Client/Client-list/Client-list.component";
import { ClientComponent } from "./tenant/Client/Client/Client.component";
import { ClientEditComponent } from "./tenant/Client/Client-edit/Client-edit.component";
import { UserManagementListComponent } from "./tenant/User-Management/User-Management-list/User-Management-list.component";
import { UserManagementComponent } from "./tenant/User-Management/User-Management/User-Management.component";
import { UserManagementEditComponent } from "./tenant/User-Management/User-Management-edit/User-Managemnet-edit.component";

//RolesWithPermissionAuthorizerTaskBoardComponent
//Transfer
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AppComponent,
        children: [
          //Stock Management
          {
            path: "pages/stock-management/indenting-maker-list",
            component: IndentingMakerListComponent,
          },
          // { path: 'pages/stock-management/indenting-maker/new-indenting-maker-dialog', component: NewIndentingMakerDialogComponent, canActivate: [AppRouteGuard] },

          //Stock-management => branch

          {
            path: "pages/stock-management/library",
            component: LibraryComponent,
          },
          { path: "edit-library/:id", component: EditLibraryComponent },

          //Certification-Setups
          {
            path: "pages/certification-setups/certificate",
            component: CertificateComponent,
          },
          {
            path: "pages/certification-setups/module",
            component: ModuleComponent,
          },

          //Sales
          { path: "pages/sales/task-board", component: TaskBoardComponent },
          // { path: 'pages/sales/applicant-form', component: ApplicantFormComponent},
          // { path: 'pages/sales/applicant-form/applicant-info', component: ApplicantInfoComponent },
          {
            path: "pages/sales/task-board-list",
            component: TaskBoardListComponent,
          },
          //{ path: 'pages/sales/client-add-project', component: ClientAddProjectComponent },
          { path: "pages/sales/client-sites", component: ClientSitesComponent },
          {
            path: "pages/sales/client-add-visit",
            component: ClientAddVisitComponent,
          },
          { path: "pages/sales/higg", component: HiggComponent },
          { path: "pages/sales/slcp", component: SlcpComponent },
          { path: "pages/sales/all-projects", component: AllProjectsComponent },
          {
            path: "pages/sales/project-sa8000",
            component: ProjectSA8000Component,
          },
          {
            path: "pages/sales/project-remarks",
            component: ProjectRemarksComponent,
          },
          { path: "pages/sales/iso14012015", component: ISO14012015Component },
          {
            path: "pages/sales/audit-plan-list",
            component: AuditPlanListComponent,
          },
          { path: "pages/sales/audit-plan", component: AuditPlanComponent },
          { path: "pages/sales/audit-report", component: AuditReportComponent },
          {
            path: "pages/sales/audit-reportList",
            component: AuditReportListComponent,
          },
          {
            path: "pages/sales/qc-detail-grid",
            component: QCDetailGridComponent,
          },

          {
            path: "pages/sales/qc-master-list",
            component: QCMasterListComponent,
          },

          //Encashment

          //Security Group
          {
            path: "pages/security-module/roles-with-permission",
            component: RolesWithPermissionComponent,
          },
          {
            path: "pages/security-module/user-with-locations",
            component: UserWithLocationsComponent,
          },
          {
            path: "pages/security-module/roles-with-permission-task-board",
            component: RolesWithPermissionTaskBoardComponent,
          },
          {
            path: "pages/security-module/roles-with-permission-authorizer",
            component: RolesWithPermissionAuthorizerComponent,
          },
          {
            path: "pages/security-module/roles-with-permission-authorizer-task-board",
            component: RolesWithPermissionAuthorizerTaskBoardComponent,
          },
          {
            path: "pages/security-module/user-with-location-authorizer",
            component: UserWithLocationAuthorizerComponent,
          },
          {
            path: "pages/security-module/user-with-location-authorizer-task-board",
            component: UserWithLocationAuthorizerTaskBoardComponent,
          },
          {
            path: "pages/security-module/user-with-locations-task-board",
            component: UserWithLocationsTaskBoardComponent,
          },
          {
            path: "pages/security-module/userlocation-tab",
            component: UserlocationTabComponent,
          },
          {
            path: "pages/security-module/roles-master",
            component: RolesMasterComponent,
          },
          {
            path: "pages/security-module/roles-master-task-board",
            component: RolesMasterTaskBoardComponent,
          },
          { path: "pages/security-module/agency", component: AgencyComponent },
          {
            path: "pages/security-module/agency-task-board",
            component: AgencyTaskBoardComponent,
          },
          {
            path: "pages/security-module/user-standards",
            component: UserStandardsComponent,
          },
          {
            path: "pages/security-module/user-academic",
            component: UserAcademicComponent,
          },
          {
            path: "pages/security-module/user-professional",
            component: UserProfessionalComponent,
          },
          {
            path: "pages/security-module/user-employment",
            component: UserEmploymentComponent,
          },
          {
            path: "pages/security-module/user-cpd",
            component: UserCpdComponent,
          },
          {
            path: "pages/security-module/user-consultancy",
            component: UserConsultancyComponent,
          },
          {
            path: "pages/security-module/user-audits",
            component: UserAuditsComponent,
          },
          {
            path: "pages/security-module/user-auditor",
            component: UserAuditorComponent,
          },
          {
            path: "pages/security-module/user-declaration",
            component: UserDeclarationComponent,
          },
          {
            path: "pages/security-module/user-review",
            component: UserReviewComponent,
          },
          {
            path: "pages/security-module/user-remarks",
            component: UserRemarksComponent,
          },

          //reports

          {
            path: "pages/reports/project-amount-reports",
            component: ProjectAmountReportsComponent,
          },
          //Transfer
          {
            path: "pages/security-module/userlocation-tab",
            component: UserlocationTabComponent,
          },

          //Calendar
          {
            path: "pages/calendar/holiday-calendar",
            component: HolidayCalendarComponent,
          },

          //Master Setups
          {
            path: "pages/master-setups/document-type",
            component: DocumentTypeComponent,
          },
          {
            path: "pages/master-setups/standard-type",
            component: StandardTypeComponent,
          },
          { path: "pages/master-setups/country", component: CountryComponent },
          { path: "pages/master-setups/state", component: StateComponent },
          { path: "pages/master-setups/city", component: CityComponent },
          {
            path: "pages/master-setups/certification-body",
            component: CertificationBodyComponent,
          },
          { path: "pages/master-setups/ea-code", component: EaCodeComponent },
          {
            path: "pages/master-setups/nace-code",
            component: NaceCodeComponent,
          },
          {
            path: "pages/master-setups/course-type",
            component: CourseTypeComponent,
          },
          { path: "pages/master-setups/section", component: SectionComponent },
          {
            path: "pages/master-setups/audditor-type",
            component: AudditorTypeComponent,
          },
          {
            path: "pages/master-setups/legislation",
            component: LegislationComponent,
          },
          {
            path: "pages/master-setups/accreditation",
            component: AccreditationComponent,
          },
          {
            path: "pages/master-setups/application-type",
            component: ApplicationTypeComponent,
          },
          {
            path: "pages/master-setups/project-amount",
            component: ProjectAmountComponent,
          },
          {
            path: "pages/master-setups/qc-document",
            component: QcDocumentComponent,
          },
          {
            path: "pages/master-setups/dashboard",
            component: DashboardComponent,
          },
          //Opeartions

          {
            path: "pages/Operations/consultant",
            component: ConsultantComponent,
          },

          //Tenant Services Path
          // { path: 'services/service-request', component: ServiceRequestComponent },
          // { path: 'services/service-request-list', component: ServiceRequestListComponent },
          // { path: 'services/service-request-edit/:id', component: ServiceRequestEditComponent },

          {
            path: "services",
            children: [
              {
                path: "service-request-list",
                component: ServiceRequestListComponent,
              },
              { path: "service-request", component: ServiceRequestComponent },
              {
                path: "service-request-edit/:id",
                component: ServiceRequestEditComponent,
              },
            ],
          },
          {
            path: "buildings",
            children: [
              { path: "", component: BuildingListComponent },
              { path: "create", component: BuildingComponent },
              { path: "edit/:id", component: BuildingEditComponent },
              { path: "manage", component: BuildingEditComponent },
              {
                path: ":buildingId/floors",
                children: [{ path: "", component: FloorListComponent }],
              },
              {
                path: ":buildingId/flats",
                children: [{ path: "", component: FlatListComponent }],
              },
              {
                path: ":buildingId/parkingSlots",
                children: [{ path: "", component: ParkingSlotListComponent }],
              },
            ],
          },
          {
            path: "clients",
            children: [
              { path: "", component: ClientListComponent },
              { path: "create", component: ClientComponent },
              { path: "edit/:id", component: ClientEditComponent },

            ],
          },
          {
            path: "userManagement",
            children: [
              { path: "", component: UserManagementListComponent },
              { path: "create", component: UserManagementComponent },
              { path: "edit/:id", component: UserManagementEditComponent },

            ],
          },
          {
            path: "utility",
            children: [
              { path: "serviceType", component: ServiceTypeComponent },
            ],
          },

          { path: "home", component: HomeComponent },
          //{ path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }},
          //{ path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }},
          //{ path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }},
          { path: "about", component: AboutComponent },
          { path: "update-password", component: ChangePasswordComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
