import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginConfirmPageComponent } from './admin-login-confirm-page.component';

describe('AdminLoginConfirmPageComponent', () => {
  let component: AdminLoginConfirmPageComponent;
  let fixture: ComponentFixture<AdminLoginConfirmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoginConfirmPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLoginConfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
