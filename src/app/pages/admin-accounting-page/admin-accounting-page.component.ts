import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

type activeTab = "systemAcct" | "updateCurrencyAndConversion" | "systemBalances";

@Component({
  selector: 'app-admin-accounting-page',
  templateUrl: './admin-accounting-page.component.html',
  styleUrls: ['./admin-accounting-page.component.css']
})
export class AdminAccountingPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  switchTabs: string = "systemBalances";

  fCurrency: string = "";
  fAction: string = "";

  sysAcctCreateRespMsg! : string;
  sysAcctCreateStatus! : boolean;

  seededCurrencies! : any[];

  currencyChargeOrRateUpdateRespMsg! : string;
  currencyChargeOrRateUpdateStatus! : boolean;

  sysAcctDetails! : any[];

  constructor(private http: HttpClient, private router: Router,) {}

  ngOnInit() {
    this.getSeededCurrencies();
    this.getSystemAccountDetails();
  }

  changeContent(content: activeTab) {
    this.switchTabs = content;
  }

  

  onSysAcctCreate(sysAcctCreateData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Account/CreateSystemAccount`, sysAcctCreateData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.sysAcctCreateRespMsg = res.message;
        this.sysAcctCreateStatus = res.status;
        if (this.sysAcctCreateStatus == true) {
          Swal.fire({
            text: this.sysAcctCreateRespMsg,
            confirmButtonColor: "#003366",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        else {
          Swal.fire({
            text: this.sysAcctCreateRespMsg,
            confirmButtonColor: "#FF0033",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getSeededCurrencies() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Account/CurrenciesSeededInDb`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.seededCurrencies = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onRateChargeUpdate(currencyChargeData: {[key: string] : string | number}) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.put<any>(`${this.baseUrl}/api/Account/UpdateChargeOrRate`, currencyChargeData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.currencyChargeOrRateUpdateRespMsg = res.message;
        this.currencyChargeOrRateUpdateStatus = res.status;
        if (this.currencyChargeOrRateUpdateStatus == true) {
          Swal.fire({
            text: this.currencyChargeOrRateUpdateRespMsg,
            confirmButtonColor: "#003366",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        else {
          Swal.fire({
            text: this.currencyChargeOrRateUpdateRespMsg,
            confirmButtonColor: "#FF0033",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getSystemAccountDetails() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Account/SystemAccountDetails`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.sysAcctDetails = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
