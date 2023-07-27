import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-kyc-validation-page',
  templateUrl: './kyc-validation-page.component.html',
  styleUrls: ['./kyc-validation-page.component.css']
})
export class KycValidationPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  userInfoKycs!: any[];

  kycs!: any[];
  userId! : number;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  order!: string;
  reverse: boolean = false;

  respMsg! : string;
  status! : boolean;

  scaImage: boolean = false;

  constructor(private http: HttpClient,) {}

  ngOnInit() {
    this.getKycValidations();
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

  getKycValidations() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Dashboard/GetKycUploadsForAdmin`,
    {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res)
        this.kycs = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  acceptImage(value1: string, value2: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("userId", value1);
    params.append("filename", value2);

    this.http.put<any>(`${this.baseUrl}/api/Dashboard/AcceptImage?${params}&${params}`, {headers: headers})
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

  removeImage(value1: string, value2: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("userId", value1);
    params.append("filename", value2);

    this.http.put<any>(`${this.baseUrl}/api/Dashboard/RemoveImage?${params}&${params}`, {headers: headers})
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

  scaleImage() {
    this.scaImage = !this.scaImage;
    if (this.scaImage == true) {
      var img = document.getElementById("imgKYC");
      // img.style.width = "60%";
      // img.style.height = "auto";
      // img.style.transition = "width 0.5s ease";
    }
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}
