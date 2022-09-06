
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from '@app/app-routing.module';
import { RouterModule } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AbpModalHeaderComponent } from '@shared/components/modal/abp-modal-header.component';
import { CertificateComponent } from './certificate/certificate.component';
import { ModuleComponent } from './module/module.component';
import { DxBulletModule, DxDataGridModule, DxSpeedDialActionModule, DxTemplateModule } from 'devextreme-angular';


import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    CertificateComponent,
    ModuleComponent,
    

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
   
    NgxPaginationModule
   
  ]
})
export class CertificationSetupsModule { }
