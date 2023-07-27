import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminInformation } from 'src/app/reuseable-components/adminImformation';
import Swal from 'sweetalert2/dist/sweetalert2.js';

type activeTab = "createAdmin" | "lockedUsers" | "lock/unlock" | "allAdmins";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  switchTabs: string = "lockedUsers";

  Role: string = "";
  adminDetails! : any;

  adminCreateRespMsg! : string;
  adminCreateStatus! : boolean;

  lockedUnlockedRespMsg! : string;
  lockedUnlockedStatus! : boolean;

  Action: string = "";
  Code: string = "";
  Reason: string = "";

  lockedUsers! : any[];

  allAdmins! : any[];

  searchAdminText!: string;
  searchText!: string;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  order!: string;
  reverse: boolean = false;

  status! : boolean;
  message! : string;

  constructor(private http: HttpClient,) {}

  ngOnInit() {
    this.getLockedUsersList();
    this.getAllAdminsLists();
    this.adminDetails = AdminInformation();
  }

  setOrder(value: string) { 
    if (this.order === value) { 
      this.reverse = !this.reverse; 
    } 
    this.order = value; 
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  changeContent(content: activeTab) {
    this.switchTabs = content;
  }

  onAdminCreate(adminCreateData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.post<any>(`${this.baseUrl}/api/Auth/CreateAdmin`, adminCreateData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.adminCreateRespMsg = res.message;
        this.adminCreateStatus = res.status;
        if (this.adminCreateStatus == true) {
          Swal.fire({
            text: this.adminCreateRespMsg,
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
            text: this.adminCreateRespMsg,
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
        }, 4500);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onLockedUnlocked(lockedUnlockedData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.put<any>(`${this.baseUrl}/api/Account/LockOrUnlockUsers`, lockedUnlockedData, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.lockedUnlockedRespMsg = res.message;
        this.lockedUnlockedStatus = res.status;
        if (this.lockedUnlockedStatus == true) {
          Swal.fire({
            text: this.lockedUnlockedRespMsg,
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
            text: this.lockedUnlockedRespMsg,
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

  getLockedUsersList() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Account/GetLockedUsersList`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.lockedUsers = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllAdminsLists() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/AllAdminsLists`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.allAdmins = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDisableEnableAdmin(id: [key: number]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.put<any>(`${this.baseUrl}/api/Dashboard/DisableEnableAdmin`, {id: id}, {headers: headers})
    .subscribe({
      next: (res) => {
        this.status = res.status;
        this.message = res.message;
        if (this.status == true) {
          Swal.fire({
            text: this.message,
            confirmButtonColor: "#003366",
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
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
