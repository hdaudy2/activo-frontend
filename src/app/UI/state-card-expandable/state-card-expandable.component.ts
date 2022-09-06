import { Component, Input, OnInit } from "@angular/core";
import { StateCardTabModel } from "./tab.interface";

@Component({
  selector: "state-card-expandable",
  template: `
    <div class="state-card-expandable" [class.extended]="extended">
      <div class="state-card-expandable--main">
        <div class="label">{{ label }}</div>
        <div class="state">{{ value }}</div>
      </div>
      <div class="state-card-expandable--extended">
        <div class="state-card-expandable--tabs">
          <div class="tab" *ngFor="let tab of tabData">
            <div class="number">{{ tab.number }}</div>
            <div class="label">{{ tab.label }}</div>
          </div>
        </div>
      </div>
      <div class="state-card-expandable--arrow" (click)="toggle()">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>
  `,
  styleUrls: ["./state-card-expandable.component.css"],
})
export class StateCardExpandableComponent implements OnInit {
  @Input() label: string;
  @Input() value: number;
  @Input() tabData: StateCardTabModel[];

  public extended: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.extended = !this.extended;
  }
}
