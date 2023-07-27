import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycValidationPageComponent } from './kyc-validation-page.component';

describe('KycValidationPageComponent', () => {
  let component: KycValidationPageComponent;
  let fixture: ComponentFixture<KycValidationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycValidationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycValidationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
