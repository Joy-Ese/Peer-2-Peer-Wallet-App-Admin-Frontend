import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDialogContentComponent } from './pdf-dialog-content.component';

describe('PdfDialogContentComponent', () => {
  let component: PdfDialogContentComponent;
  let fixture: ComponentFixture<PdfDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
