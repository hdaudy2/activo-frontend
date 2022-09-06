import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuditorComponent } from './user-auditor.component';

describe('UserAuditorComponent', () => {
  let component: UserAuditorComponent;
  let fixture: ComponentFixture<UserAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
