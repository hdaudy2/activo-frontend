import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EaCodeComponent } from './ea-code.component';

describe('EaCodeComponent', () => {
  let component: EaCodeComponent;
  let fixture: ComponentFixture<EaCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EaCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EaCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
