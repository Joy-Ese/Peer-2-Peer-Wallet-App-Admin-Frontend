import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/auth/admin-auth.service';
import { AdminInformation } from 'src/app/reuseable-components/adminImformation';

@Component({
  selector: 'app-admin-login-confirm-page',
  templateUrl: './admin-login-confirm-page.component.html',
  styleUrls: ['./admin-login-confirm-page.component.css']
})
export class AdminLoginConfirmPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  message! : string;
  status! : boolean;

  adminDetails! : any;

  constructor(private http: HttpClient, private router: Router, private adminAuthService: AdminAuthService) { }

  ngOnInit() { 
    this.adminDetails = AdminInformation();
  }

  onAdminChngPassword(chngPass: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.adminDetails.result}`
    });
    this.http.post<any>(`${this.baseUrl}/api/Auth/ChangeAdminPassword`, chngPass, {headers: headers})
    .subscribe({
      next: (res) => {
        this.status = res.status;
        this.message = res.message;

        if (this.status) {
          this.adminAuthService.setAdminUserLoggedIn(true);
          this.router.navigate(['/adminlogin']);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
