import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-mini-admin-dashboard-page',
  templateUrl: './mini-admin-dashboard-page.component.html',
  styleUrls: ['./mini-admin-dashboard-page.component.css']
})
export class MiniAdminDashboardPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  adminCount: number = 0;
  users:any;

  searchText!: string;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  order!: string;
  reverse: boolean = false;

  status! : boolean;
  verified : number = 0;
  unVerified : number = 0;
  locked : number = 0;
  unLocked : number = 0;

  public pieChart: any;
  public barChart: any;

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private signalrService: SignalrService
    ){}

  ngOnInit() {
    this.GetAdminIsLoggedIn();
    this.getUserDataForAdmin();
    this.signalrService.startConnection();
    this.signalrService.onUpdateAdmin(() => {
      this.GetAdminIsLoggedIn();
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

  GetAdminIsLoggedIn() {
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


}
