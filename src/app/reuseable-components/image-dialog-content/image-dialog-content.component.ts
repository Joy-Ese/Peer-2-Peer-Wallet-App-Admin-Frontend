import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog-content',
  templateUrl: './image-dialog-content.component.html',
  styleUrls: ['./image-dialog-content.component.css']
})
export class ImageDialogContentComponent implements OnInit{

  imageURL!: any;

  constructor(public dialogRef: MatDialogRef<ImageDialogContentComponent>, @Inject(MAT_DIALOG_DATA) public data: MatDialogRef<ImageDialogContentComponent>) {
    this.imageURL = data;
    console.log(this.imageURL);
  }

  ngOnInit() {}

}
