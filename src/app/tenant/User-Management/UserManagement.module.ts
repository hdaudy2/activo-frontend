import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ModalModule } from "ngx-bootstrap/modal";
import { DxBulletModule, DxDataGridModule, DxSpeedDialActionModule, DxTemplateModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from "@app/app-routing.module";

import { UIModule } from "@app/UI/UI.module";
import { UserManagementListComponent } from "./User-Management-list/User-Management-list.component";
import { UserManagementEditComponent } from "./User-Management-edit/User-Managemnet-edit.component";
import { UserManagementComponent } from "./User-Management/User-Management.component";


@NgModule({
  declarations: [UserManagementComponent, UserManagementListComponent, UserManagementEditComponent],
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
    UIModule
  ],
})
export class UserManagementModule { }
