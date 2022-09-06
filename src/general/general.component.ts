import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injector,
  Renderer2
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
  templateUrl: './general.component.html',
  encapsulation: ViewEncapsulation.None
})
export class GeneralComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector, private renderer: Renderer2) {
    super(injector);
  }

  // showTenantChange(): boolean {
  //   return abp.multiTenancy.isEnabled;
  // }

  ngOnInit(): void { }
}
