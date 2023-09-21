import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageDialogContentComponent } from 'src/app/reuseable-components/image-dialog-content/image-dialog-content.component';
import { PdfDialogContentComponent } from 'src/app/reuseable-components/pdf-dialog-content/pdf-dialog-content.component';
import { ReasonDialogContentComponent } from 'src/app/reuseable-components/reason-dialog-content/reason-dialog-content.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-kyc-validation-page',
  templateUrl: './kyc-validation-page.component.html',
  styleUrls: ['./kyc-validation-page.component.css']
})
export class KycValidationPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  userInfoKycs!: any[];

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  order!: string;
  reverse: boolean = false;

  respMsg! : string;
  status! : boolean;

  scaImage: boolean = false;

  constructor(private http: HttpClient, public dialog: MatDialog, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getUserInfoOnKycUploadsForAdmin();
  }

  setOrder(value: string) { 
    if (this.order === value) { 
      this.reverse = !this.reverse; 
    } 
    this.order = value; 
  }

  getUserInfoOnKycUploadsForAdmin() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Dashboard/GetUserInfoOnKycUploadsForAdmin`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res)
        this.userInfoKycs = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  acceptImage(value1: string, value2: string, value3: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("userId", value1);
    params.append("filename", value2);
    params.append("filecode", value3);

    this.http.put<any>(`${this.baseUrl}/api/Dashboard/AcceptImage?${params}&${params}&${params}`, {headers: headers})
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

  removeImage(value1: string, value2: string, value3: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("userId", value1);
    params.append("filename", value2);
    params.append("filecode", value3);

    this.http.put<any>(`${this.baseUrl}/api/Dashboard/RemoveImage?${params}&${params}&${params}`, {headers: headers})
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

  openReasonDialog(enterAnimationDuration: string, exitAnimationDuration: string, value1: string, value2: string, value3: string): void {
    this.dialog.open(ReasonDialogContentComponent, {
      data: {
        removeImage: {
          val1: value1,
          val2: value2,
          val3: value3
        }
      }, 
      width: '630px',
      height: '480px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openPdfDialog(enterAnimationDuration: string, exitAnimationDuration: string, pdfUrl: string): void {
    this.dialog.open(PdfDialogContentComponent, {
      data: pdfUrl,
      width: '650px',
      height: '480px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openImageDialog(enterAnimationDuration: string, exitAnimationDuration: string, imageUrl: string): void {
    this.dialog.open(ImageDialogContentComponent, {
      data: imageUrl,
      width: '650px',
      height: '480px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}
