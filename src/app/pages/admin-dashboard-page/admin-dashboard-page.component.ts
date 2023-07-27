import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminAuthService } from 'src/app/auth/admin-auth.service';
import { SnackBarComponent } from 'src/app/reuseable-components/snack-bar/snack-bar.component';
import { AdminInformation } from 'src/app/reuseable-components/adminImformation';

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.css']
})
export class AdminDashboardPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  adminUsername! : string;

  adminDetails! : any;

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
    this.adminDetails = AdminInformation();
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


}
