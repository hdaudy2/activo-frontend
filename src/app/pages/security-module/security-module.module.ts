import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserWithLocationsComponent } from './user-with-locations/user-with-locations.component';
import { RolesWithPermissionComponent } from './roles-with-permission/roles-with-permission.component';
import { RouterModule } from '@angular/router';
import { UserlocationTabComponent } from './userlocation-tab/userlocation-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from '@app/app-routing.module';
import { RolesWithPermissionTaskBoardComponent } from './roles-with-permission-task-board/roles-with-permission-task-board.component';
import { RolesWithPermissionAuthorizerTaskBoardComponent } from './roles-with-permission-authorizer-task-board/roles-with-permission-authorizer-task-board.component';
import { RolesWithPermissionAuthorizerComponent } from './roles-with-permission-authorizer/roles-with-permission-authorizer.component';
import { UserWithLocationAuthorizerComponent } from './user-with-location-authorizer/user-with-location-authorizer.component';
import { UserWithLocationAuthorizerTaskBoardComponent } from './user-with-location-authorizer-task-board/user-with-location-authorizer-task-board.component';
import { RolesMasterTaskBoardComponent } from './roles-master-task-board/roles-master-task-board.component';
import { UserWithLocationsTaskBoardComponent } from './user-with-locations-task-board/user-with-locations-task-board.component';
import { AgencyComponent } from './agency/agency.component';
import { AgencyTaskBoardComponent } from './agency-task-board/agency-task-board.component';
import { UserStandardsComponent } from './user-standards/user-standards.component';
import { UserAcademicComponent } from './user-academic/user-academic.component';
import { UserProfessionalComponent } from './user-professional/user-professional.component';
import { UserEmploymentComponent } from './user-employment/user-employment.component';
import { UserCpdComponent } from './user-cpd/user-cpd.component';
import { UserConsultancyComponent } from './user-consultancy/user-consultancy.component';
import { UserAuditsComponent } from './user-audits/user-audits.component';
import { UserAuditorComponent } from './user-auditor/user-auditor.component';
import { UserDeclarationComponent } from './user-declaration/user-declaration.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DxBulletModule, DxDataGridModule, DxSpeedDialActionModule, DxTemplateModule } from 'devextreme-angular';








import { AbpModalHeaderComponent } from '@shared/components/modal/abp-modal-header.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { UserRemarksComponent } from './user-remarks/user-remarks.component';






@NgModule({
  declarations: [

    UserWithLocationsComponent,
    RolesWithPermissionComponent,
    RolesMasterTaskBoardComponent,
    RolesWithPermissionTaskBoardComponent,
    RolesWithPermissionAuthorizerTaskBoardComponent,
    RolesWithPermissionAuthorizerComponent,
    UserWithLocationAuthorizerComponent,
    UserWithLocationAuthorizerTaskBoardComponent,
    UserWithLocationsTaskBoardComponent,
    UserlocationTabComponent,
    AgencyComponent,
    AgencyTaskBoardComponent,
    UserStandardsComponent,
    UserAcademicComponent,
    UserProfessionalComponent,
    UserEmploymentComponent,
    UserCpdComponent,
    UserConsultancyComponent,
    UserAuditsComponent,
    UserAuditorComponent,
    UserDeclarationComponent,
    UserReviewComponent,
    UserRemarksComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forChild(),
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DxTemplateModule,
    DxBulletModule,
    DxSpeedDialActionModule,
    NgxPaginationModule,
    DxDataGridModule,


  ]
})
export class SecurityModuleModule { }
