import { Component, Input, OnInit } from "@angular/core";
import { StateCardTabModel } from "./tab.interface";

@Component({
  selector: "state-card-tab",
  template: `
    <div class="state-card-tab">
      <div class="state-card-tab--label">{{ label }}</div>
      <div class="state-card-tab--tabs">
        <div class="tab" *ngFor="let tab of tabData">
          <div class="number">{{ tab.number }}</div>
          <div class="label">{{ tab.label }}</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./state-card-tab.component.css"],
})
export class StateCardTabComponent implements OnInit {
  @Input() label: string;
  @Input() tabData: StateCardTabModel[];

  constructor() {}

  ngOnInit(): void {}
}
