import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ModalModule } from "ngx-bootstrap/modal";
import { DxBulletModule, DxDataGridModule, DxSpeedDialActionModule, DxTemplateModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from "@app/app-routing.module";

import { UIModule } from "@app/UI/UI.module";

import { BuildingComponent } from "./building/building.component";
import { BuildingListComponent } from "./building-list/building-list.component";
import { BuildingEditComponent } from "./building-edit/building-edit.component";
import { FloorListComponent } from "./floor-list/floor-list.component";
import { FlatListComponent } from "./flat-list/flat-list.component";
import { ParkingSlotListComponent } from "./parkingSlot-list/parkingSlot-list.component";

@NgModule({
  declarations: [BuildingListComponent, FloorListComponent, FlatListComponent, ParkingSlotListComponent, BuildingComponent, BuildingEditComponent],
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
export class BuildingModule {}
