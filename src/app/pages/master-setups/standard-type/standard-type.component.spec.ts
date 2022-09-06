import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardTypeComponent } from './standard-type.component';

describe('StandardTypeComponent', () => {
  let component: StandardTypeComponent;
  let fixture: ComponentFixture<StandardTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
