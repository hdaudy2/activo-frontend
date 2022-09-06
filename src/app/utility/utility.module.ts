import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ModalModule } from "ngx-bootstrap/modal";
import {
  DxBulletModule,
  DxDataGridModule,
  DxSpeedDialActionModule,
  DxTemplateModule,
} from "devextreme-angular";
import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from "@app/app-routing.module";

import { ServiceTypeComponent } from "./service-type/service-type.component";

@NgModule({
  declarations: [ServiceTypeComponent],
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
export class UtilityModule {}
