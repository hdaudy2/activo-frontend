import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ModalModule } from "ngx-bootstrap/modal";
import { DxBulletModule, DxDataGridModule, DxSpeedDialActionModule, DxTemplateModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from "@app/app-routing.module";

import { ServiceRequestComponent } from "./service-request/service-request.component";
import { ServiceRequestEditComponent } from "./service-request-edit/service-request-edit.component";
import { ServiceRequestListComponent } from "./service-request-list/service-request-list.component";

@NgModule({
  declarations: [ServiceRequestComponent, ServiceRequestListComponent, ServiceRequestEditComponent],
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
  ],
})
export class TenantServicesModule {}
