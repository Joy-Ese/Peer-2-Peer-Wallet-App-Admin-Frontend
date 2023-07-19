import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountingPageComponent } from './admin-accounting-page.component';

describe('AdminAccountingPageComponent', () => {
  let component: AdminAccountingPageComponent;
  let fixture: ComponentFixture<AdminAccountingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAccountingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAccountingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
