
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { GeneralRoutingModule } from './general-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { GeneralComponent } from './general.component';
import { TenantsRegistrationComponent } from './tenants-registration/tenants-registration.component';
@NgModule({
    imports: [

        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        ServiceProxyModule,
        GeneralRoutingModule,
        ModalModule.forChild()
    ],
    declarations: [
        GeneralComponent,
        TenantsRegistrationComponent
    ],
    entryComponents: []
})
export class GeneralModule {

}
