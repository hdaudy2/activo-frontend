import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard, PageGuard } from '@shared/auth/auth-route-guard';

const routes: Routes = [
    { path: '', redirectTo: '/account/login', pathMatch: 'full' },
    { path: '', redirectTo: '/general/TenantsRegistration', pathMatch: 'full' },
    {
        path: 'general',
        loadChildren: () => import('general/general.module').then(m => m.GeneralModule), // Lazy load account module
        canActivate: [AppRouteGuard],
        canActivateChild: [AppRouteGuard],
        data: { preload: true }
    },
    {
        path: 'account',
        loadChildren: () => import('account/account.module').then(m => m.AccountModule), // Lazy load account module
        canActivate: [AppRouteGuard],
        canActivateChild: [AppRouteGuard],
        data: { preload: true }
    },
    {
        path: 'app',
        loadChildren: () => import('app/app.module').then(m => m.AppModule), // Lazy load account module
        canActivate: [PageGuard],
        canActivateChild: [PageGuard],
        data: { preload: true }
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }
