import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SignalrService } from 'src/app/services/signalr.service';
import { ChatDialogContentComponent } from 'src/app/reuseable-components/chat-dialog-content/chat-dialog-content.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mini-admin-dashboard-page',
  templateUrl: './mini-admin-dashboard-page.component.html',
  styleUrls: ['./mini-admin-dashboard-page.component.css']
})
export class MiniAdminDashboardPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  chatCount : number = 0;

  adminCount: number = 0;
  users:any;
  searchText!: string;
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  order!: string;
  reverse: boolean = false;

  status! : boolean;
  verified : number = 0;
  unVerified : number = 0;
  locked : number = 0;
  unLocked : number = 0;

  usersInApp!: any[];
  searchText1!: string;
  page1: number = 1;
  count1: number = 0;
  tableSize1: number = 2;
  order1!: string;
  reverse1: boolean = false;

  public pieChart: any;
  public barChart: any;

  constructor(
    private router: Router, 
    private http: HttpClient, 
    public dialog: MatDialog, 
    private signalrService: SignalrService
    ){}

  ngOnInit() {
    this.getAdminIsLoggedIn();
    this.getUserDataForAdmin();
    this.getAllUnreadChatsCount();
    this.getUsersInSysAdmin();
    this.signalrService.startConnection();
    this.signalrService.onUpdateAdmin(() => {
      this.getAdminIsLoggedIn();
    });
    // this.signalrService.onUpdateChatCount(() => {
    //   this.getAllUnreadChatsCount();
    // });
  }

  getUsersInSysAdmin() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any[]>(`${this.baseUrl}/api/Dashboard/GetUsersInSysAdmin`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        this.usersInApp = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllUnreadChatsCount() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const params = new URLSearchParams();
    params.append("userOrAdmin", "Admin");

    this.http.get<any>(`${this.baseUrl}/api/Chat/GetAllUnreadChatsCount?${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.chatCount = res.allChats;
      },
      error: (err) => {
        console.log(err);
      }
    });
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


  setOrder1(value: string) { 
    if (this.order1 === value) { 
      this.reverse1 = !this.reverse1; 
    } 
    this.order1 = value; 
  }
  onTableDataChange1(event: any) {
    this.page1 = event;
  }
  onTableSizeChange1(event: any): void {
    this.tableSize1 = event.target.value;
    this.page1 = 1;
  }


  getUserDataForAdmin() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Account/GetUserDataForAdmin`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.status = res.status;
        this.verified = res.verified;
        this.unVerified = res.unVerified;
        this.locked = res.locked;
        this.unLocked = res.unLocked;
        if (this.status == true) {
          this.createPieChart();
          this.createBarChart();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAdminIsLoggedIn() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Account/GetAdminIsLoggedIn`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.adminCount = res.count;
        this.users = res.returneds;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createBarChart() {
    this.barChart = new Chart("MyBarChart", {
      type: 'bar',
      data : {
        labels: ['Locked', 'Unlocked', ],
        datasets: [{
          label: 'Locked/Unlocked Users',
          data: [this.locked, this.unLocked],
          backgroundColor: [
            '#003366',
            '#FF0033',
          ],
          borderColor: [
            '#FF0033',
            '#003366',
          ],
          borderWidth: 1
        }]
      }
    });
  }

  createPieChart(){
    this.pieChart = new Chart("MyPieChart", {
      type: 'doughnut',
      data: {
        labels: ['Verified', 'Unverified', ],
        datasets: [
          {
            label: 'Verified/Unverified Users',
            data: [this.verified, this.unVerified,],
            backgroundColor: [
              '#003366',
              '#FF0033',		
            ],
            hoverOffset: 2
          }
        ],
      },
      options: {
        aspectRatio:2.5
      }
    });
  }

  openChatDialog(enterAnimationDuration: string, exitAnimationDuration: string, userNAME: string): void {
    this.dialog.open(ChatDialogContentComponent, {
      data: userNAME,
      width: '800px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}
