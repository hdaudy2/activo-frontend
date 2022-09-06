import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IndentingMakerListComponent } from './indenting-maker-list/indenting-maker-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from '@app/app-routing.module';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AbpModalHeaderComponent } from '@shared/components/modal/abp-modal-header.component';

import {LibraryComponent } from './library/library.component';
import { DxBulletModule, DxDataGridModule, DxSpeedDialActionModule, DxTemplateModule } from 'devextreme-angular';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    IndentingMakerListComponent,
    LibraryComponent
    
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

    
  ], 
//   exports: [
//     // AbpPaginationControlsComponent,
//     // AbpValidationSummaryComponent,
//     // AbpModalHeaderComponent,
//     // AbpModalFooterComponent,
//     // LocalizePipe,
//     // BusyDirective,
//     // EqualValidator
// ],
// providers: [DatePipe]
 })
export class StockManagementModule { }
