import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminAuthService } from 'src/app/auth/admin-auth.service';
import { SnackBarComponent } from 'src/app/reuseable-components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.css']
})
export class AdminDashboardPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  adminUsername! : string;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private router: Router, 
    public adminAuthService: AdminAuthService,
    private observer: BreakpointObserver, 
    private matSnackBar: MatSnackBar,
    private bnIdle: BnNgIdleService,
    private http: HttpClient, 
    ){}

  ngOnInit() {
    this.bnIdle.startWatching(1500).subscribe((res) => {
      if (res) {
        this.passDataToSnackComponent();
        localStorage.clear();
        this.router.navigate(['/adminlogin']);
      }
    });
    this.getAdminUsername();
  }

  passDataToSnackComponent() {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      data: `You have been idle!!! You were automatically logged out`,
      duration: 5000,
      panelClass: ["snack-notification"],
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  getAdminUsername() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    this.http.get<any>(`${this.baseUrl}/api/Dashboard/GetAdminUsername`, {headers: headers})
    .subscribe({
      next: (res) => {
        this.adminUsername = res.username;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


}
