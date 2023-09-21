import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/reuseable-components/snack-bar/snack-bar.component';
import { AdminInformation } from 'src/app/reuseable-components/adminImformation';
import { ChatDialogContentComponent } from 'src/app/reuseable-components/chat-dialog-content/chat-dialog-content.component';
import { MatDialog } from '@angular/material/dialog';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-admin-dashboard-page',
  templateUrl: './admin-dashboard-page.component.html',
  styleUrls: ['./admin-dashboard-page.component.css']
})
export class AdminDashboardPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  adminDetails! : any;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private router: Router, 
    private observer: BreakpointObserver, 
    private matSnackBar: MatSnackBar,
    private bnIdle: BnNgIdleService,
    public dialog: MatDialog, 
    private http: HttpClient, 
    private signalrService : SignalrService,
    ){}

  ngOnInit() {
    this.signalrService.startConnection();
    this.adminDetails = AdminInformation();
    this.bnIdle.startWatching(1500).subscribe((res) => {
      if (res) {
        var username = localStorage.getItem("adminUsername");
        this.signalrService.hubConnection.invoke("onAdminLogOut", username);
        this.passDataToSnackComponent();
        this.router.navigate(['/adminlogin']);
        // this.onAdminLogout(this.adminDetails.adminUsername);
        localStorage.clear();
        this.bnIdle.stopTimer();
      }
    });
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

  onAdminLogout(value: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    const params = new URLSearchParams();
    params.append("adminUsername", value);

    this.http.put<any>(`${this.baseUrl}/api/Dashboard/AdminLogout?${params}`, {headers: headers})
    .subscribe({
      next: (res) => {
        console.log(res);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminLoginResponse");
        localStorage.clear();
        this.router.navigate(['/adminlogin']);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openChatDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ChatDialogContentComponent, {
      width: '800px',
      height: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
