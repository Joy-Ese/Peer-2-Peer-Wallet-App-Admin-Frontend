import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminLoginResponseFromBackEnd } from 'src/app/models/response-from-backend/admin-login-response';
import { AdminAuthService } from 'src/app/auth/admin-auth.service';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.css']
})
export class AdminLoginPageComponent implements OnInit{

  baseUrl : string = "http://localhost:7236";

  responseMsg! : string;
  status! : boolean;
  isSecure! : boolean;

  showPassword: boolean = false;

  adminLoginResponseFromBackEnd! : AdminLoginResponseFromBackEnd;

  key! : any;

  constructor(private http: HttpClient, private router: Router, private adminAuthService: AdminAuthService) { }

  ngOnInit(): void { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onAdminLogin(adminLoginData: [key: string]) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.http.post<any>(`${this.baseUrl}/api/Auth/AdminLogin`, adminLoginData, {headers: headers})
    .subscribe({
      next: (res) => {
        this.adminLoginResponseFromBackEnd = res as AdminLoginResponseFromBackEnd;
        this.status = this.adminLoginResponseFromBackEnd.status;
        this.isSecure = this.adminLoginResponseFromBackEnd.isSecure;
        this.responseMsg = this.adminLoginResponseFromBackEnd.result;
        console.log(this.adminLoginResponseFromBackEnd);
        this.key = localStorage.setItem("adminLoginResponse", JSON.stringify(this.adminLoginResponseFromBackEnd));
        localStorage.setItem("adminToken", this.adminLoginResponseFromBackEnd.result);

        if (this.status == true && this.isSecure == true) {
          this.adminAuthService.setAdminUserLoggedIn(true);
          this.router.navigate(['/admindashboard']);
        }

        if (this.status == true && this.isSecure == false) {
          this.adminAuthService.setAdminUserLoggedIn(false);
          this.router.navigate(['/adminconfirmlogin']);
        }

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
