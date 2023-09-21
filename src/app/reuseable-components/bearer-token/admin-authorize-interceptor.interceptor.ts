import { Injectable, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { AdminInformation } from '../adminImformation';
import { SignalrService } from 'src/app/services/signalr.service';

@Injectable()
export class AdminAuthorizeInterceptorInterceptor implements HttpInterceptor, OnInit{

  adminDetails! : any;

  constructor(private router: Router, private matSnackBar: MatSnackBar, private signalrService : SignalrService) {}

  ngOnInit() {
    this.adminDetails = AdminInformation();
  }

  passDataToSnackComponent() {
    this.matSnackBar.openFromComponent(SnackBarComponent, {
      data: `Hi Admin, You now have unauthorized access!`,
      duration: 5000,
      panelClass: ["snack-notification"],
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          if(event.status == 401) {
            this.passDataToSnackComponent();
          }
        }
        return event;
      },
      error: (error) => {
        if(error.status === 401) {
          this.signalrService.hubConnection.invoke("onAdminLogOut", this.adminDetails.adminUsername);
          this.passDataToSnackComponent();
          localStorage.clear();
          setTimeout(() => {this.router.navigate(['/adminlogin'])}, 4000);
        }
        else if(error.status === 404) {
          this.router.navigate(['/notfound']);
        }
      }
    }));
  }
}
