import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddProjectComponent } from './client-add-project.component';

describe('ClientAddProjectComponent', () => {
  let component: ClientAddProjectComponent;
  let fixture: ComponentFixture<ClientAddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAddProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
