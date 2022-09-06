import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ModalModule } from "ngx-bootstrap/modal";
import { DxBulletModule, DxDataGridModule, DxSpeedDialActionModule, DxTemplateModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from "@app/app-routing.module";

import { UIModule } from "@app/UI/UI.module";

import { ClientComponent } from "./Client/Client.component";
import { ClientListComponent } from "./Client-list/Client-list.component";
import { ClientEditComponent } from "./Client-edit/Client-edit.component";


@NgModule({
  declarations: [ClientComponent, ClientListComponent, ClientEditComponent],
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
export class ClientModule { }
