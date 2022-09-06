import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "state-card-mini",
  template: `
    <div class="state-card-mini">
      <div class="state-card-mini--label">{{ label }}</div>
      <div class="state-card-mini--state">
        <div class="number" *ngIf="state">{{ state }}</div>
        <div class="name" *ngIf="name">{{ name }}</div>
        <div class="link" [routerLink]="link" *ngIf="link">
          <i class="fas fa-angle-right"></i>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./state-card-mini.component.css"],
})
export class StateCardMiniComponent implements OnInit {
  @Input() label: string;
  @Input() state: number;
  @Input() name: string;
  @Input() link?: string;

  constructor() {}

  ngOnInit(): void {}
}
