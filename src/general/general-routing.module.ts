import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralComponent } from './general.component';
import { TenantsRegistrationComponent } from './tenants-registration/tenants-registration.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: GeneralComponent,
                children: [
                    { path: 'TenantsRegistration', component: TenantsRegistrationComponent }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class GeneralRoutingModule { }
