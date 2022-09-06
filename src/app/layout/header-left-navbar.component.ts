import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service';

@Component({
  selector: 'header-left-navbar',
  templateUrl: './header-left-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLeftNavbarComponent implements OnInit {
  sidebarExpanded: boolean;
  events: string[] = [];
  opened: boolean;
  organizationName: any;
  userName: any;
  constructor(private _layoutStore: LayoutStoreService) {}

  ngOnInit(): void {
    var someStr=localStorage.getItem('organizationName');
     //console.log(someStr.replace(/['"]+/g, ''));
    this.organizationName=  someStr.replace(/['"]+/g, '').toUpperCase();
  
    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
      this.userName =  "Farooqkhan";

      //organizationName
    });
  }

  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
  }
}
