import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { WidgetPanelComponent } from "./widget-panel/widget-panel.component";
import { StateCardMiniComponent } from "./state-card-mini/state-card-mini.component";
import { StateCardTabComponent } from "./state-card-tab/state-card-tab.component";
import { StateCardExpandableComponent } from "./state-card-expandable/state-card-expandable.component";

@NgModule({
  declarations: [
    WidgetPanelComponent,
    StateCardMiniComponent,
    StateCardExpandableComponent,
    StateCardTabComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    WidgetPanelComponent,
    StateCardMiniComponent,
    StateCardExpandableComponent,
    StateCardTabComponent,
  ],
})
export class UIModule {}
