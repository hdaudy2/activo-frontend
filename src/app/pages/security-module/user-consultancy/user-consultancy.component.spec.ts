import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConsultancyComponent } from './user-consultancy.component';

describe('UserConsultancyComponent', () => {
  let component: UserConsultancyComponent;
  let fixture: ComponentFixture<UserConsultancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserConsultancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConsultancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
