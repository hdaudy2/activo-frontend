import { Component, HostListener, Injector, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { SignalRAspNetCoreHelper } from '@shared/helpers/SignalRAspNetCoreHelper';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import {  DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AppAuthService } from '@shared/auth/app-auth.service';
@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('0, void', style({
          opacity: 0
      })),
      state('1, *', style({
          opacity: 1
      })),
      transition('1 => 0', animate('300ms ease-out')),
      transition('0 => 1', animate('300ms ease-in')),
      transition('void <=> *', animate('300ms ease-in'))
  ]),
  ]

})
export class AppComponent extends AppComponentBase implements OnInit {
  sidebarExpanded: boolean;
  public idleCounter:number;
  public idleState: boolean;
  constructor(
    private _router: Router,
    private _idle: Idle, 
    injector: Injector,
    private renderer: Renderer2,
    private _layoutStore: LayoutStoreService,
    private _authService: AppAuthService,
    public route : Router,
  ) {
    super(injector);
    this.renderer.removeClass(document.body, 'login-page');
  }

  ngOnInit(): void {
    
    this.renderer.addClass(document.body, 'sidebar-mini');
    this._idle.setIdle(900);
    this._idle.setTimeout(15);

    this._idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.startIdleOrResume();
    this._idle.onIdleEnd.subscribe(()=> this._idle.clearInterrupts());
    this._idle.onTimeout.subscribe(() => {
        this.logout()
    
    });
    this._idle.onIdleStart.subscribe(() => this.idleState = true);
    this._idle.onTimeoutWarning.subscribe((countdown: number) => this.idleCounter = countdown);
    

    // SignalRAspNetCoreHelper.initSignalR();

    // abp.event.on('abp.notifications.received', (userNotification) => {
    //   abp.notifications.showUiNotifyForUserNotification(userNotification);

    //   // Desktop notification
    //   Push.create('AbpZeroTemplate', {
    //     body: userNotification.notification.data.message,
    //     icon: abp.appPath + 'assets/app-logo-small.png',
    //     timeout: 6000,
    //     onClick: function () {
    //       window.focus();
    //       this.close();
    //     }
    //   });
    // });

    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
    });


   
  }

  
  ngOnDestroy(): void {
    localStorage.clear();
  }
  startIdleOrResume(){
    this.idleState = false;
    this._idle.stop();
    this._idle.watch();
  }
  logout(): void{
    this.idleState = false
    localStorage.clear();

    localStorage.removeItem('secRoleForm')
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userSbpAllowed')
    localStorage.removeItem('authAllowed')
    localStorage.removeItem('insertAllowed')
    localStorage.removeItem('organizationId')
    localStorage.removeItem('userTypeId')
    localStorage.removeItem('roleId')
    localStorage.removeItem('token')
    localStorage.removeItem('clientId');
    localStorage.removeItem('stanardId')
    this._router.navigate(['account/login']);
  }
  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
  }
//   constructor(
//     private authService: AuthService
//  ) {
//     console.log(tabCount.tabsCount());
//  }
 
 // Handle session on browser tab close . . .
//  @HostListener('window:beforeunload', ['$event'])
//  public beforeunloadHandler($event) {
   
   
//       
       

   
//     // this._authService.logout();
//     // this.route.navigate(['src/login']);
//     localStorage.removeItem('secRoleForm')
//     localStorage.removeItem('userId')
//     localStorage.removeItem('userName')
//     localStorage.removeItem('userSbpAllowed')
//     localStorage.removeItem('authAllowed')
//     localStorage.removeItem('insertAllowed')
//     localStorage.removeItem('organizationId')
//     localStorage.removeItem('userTypeId')
//     localStorage.removeItem('roleId')
//     localStorage.removeItem('token')
//     localStorage.removeItem('clientId');
//     this.route.navigate(['account/login']);
  
       
    
//  }

// window.onbeforeunload = function(event) {
//   //if you return anything but null, it will warn the user.
//   //optionally you can return a string which most browsers show to the user as the warning message.
//   return true;
// }


 lougout() {
   
   
      
      
    localStorage.removeItem('secRoleForm')
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userSbpAllowed')
    localStorage.removeItem('authAllowed')
    localStorage.removeItem('insertAllowed')
    localStorage.removeItem('organizationId')
    localStorage.removeItem('userTypeId')
    localStorage.removeItem('roleId')
    localStorage.removeItem('token')
    localStorage.removeItem('clientId');
    localStorage.removeItem('stanardId')
    this.route.navigate(['account/login']);
  
       
    
 }
}
// function DEFAULT_INTERRUPTSOURCES(DEFAULT_INTERRUPTSOURCES: any) {
//   throw new Error('Function not implemented.');
// }

