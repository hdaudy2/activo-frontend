import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuditsComponent } from './user-audits.component';

describe('UserAuditsComponent', () => {
  let component: UserAuditsComponent;
  let fixture: ComponentFixture<UserAuditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
