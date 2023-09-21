import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-dialog-content',
  templateUrl: './pdf-dialog-content.component.html',
  styleUrls: ['./pdf-dialog-content.component.css']
})
export class PdfDialogContentComponent implements OnInit{

  pdfUrl!: any;

  constructor(public dialogRef: MatDialogRef<PdfDialogContentComponent>, @Inject(MAT_DIALOG_DATA) public data: MatDialogRef<PdfDialogContentComponent>) {
    this.pdfUrl = data;
    console.log(this.pdfUrl);
  }

  ngOnInit() {}

}
