import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sidebar-logo',
  templateUrl: './sidebar-logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarLogoComponent {}



function closeNav() {
  document.getElementById("sidebar-menu").style.width = "0";
  document.getElementById("app/home").style.marginLeft= "0";
}
