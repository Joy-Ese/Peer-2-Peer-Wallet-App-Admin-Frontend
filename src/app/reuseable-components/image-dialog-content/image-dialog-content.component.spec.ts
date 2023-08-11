import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogContentComponent } from './image-dialog-content.component';

describe('ImageDialogContentComponent', () => {
  let component: ImageDialogContentComponent;
  let fixture: ComponentFixture<ImageDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
