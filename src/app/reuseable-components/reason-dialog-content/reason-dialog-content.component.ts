import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-reason-dialog-content',
  templateUrl: './reason-dialog-content.component.html',
  styleUrls: ['./reason-dialog-content.component.css']
})
export class ReasonDialogContentComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  obj!: any;

  respMsg! : string;
  status! : boolean;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ReasonDialogContentComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: MatDialogRef<ReasonDialogContentComponent>
    ) {
    this.obj = data;
    console.log(this.obj);
  }

  ngOnInit() {}

  rejectDoc(msgData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("userId", this.obj.removeImage.val1);
    params.append("filename", this.obj.removeImage.val2);
    params.append("filecode", this.obj.removeImage.val3);

    this.http.put<any>(`${this.baseUrl}/api/Dashboard/RemoveImage?${params}&${params}&${params}`, msgData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.respMsg = res.message;
        this.status = res.status;
        Swal.fire({
          text: this.respMsg,
          confirmButtonColor: "#003366",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
