import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonDialogContentComponent } from './reason-dialog-content.component';

describe('ReasonDialogContentComponent', () => {
  let component: ReasonDialogContentComponent;
  let fixture: ComponentFixture<ReasonDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasonDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
