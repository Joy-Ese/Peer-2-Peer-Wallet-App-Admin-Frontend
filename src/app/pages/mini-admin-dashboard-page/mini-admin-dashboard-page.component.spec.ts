import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniAdminDashboardPageComponent } from './mini-admin-dashboard-page.component';

describe('MiniAdminDashboardPageComponent', () => {
  let component: MiniAdminDashboardPageComponent;
  let fixture: ComponentFixture<MiniAdminDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniAdminDashboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniAdminDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
