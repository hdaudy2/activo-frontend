import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudditorTypeComponent } from './audditor-type.component';

describe('AudditorTypeComponent', () => {
  let component: AudditorTypeComponent;
  let fixture: ComponentFixture<AudditorTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudditorTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudditorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
