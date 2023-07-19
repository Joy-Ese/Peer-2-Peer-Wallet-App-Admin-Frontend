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
        this.responseMsg = this.adminLoginResponseFromBackEnd.result;
        console.log(this.adminLoginResponseFromBackEnd);
        this.key = localStorage.setItem("adminLoginResponse", JSON.stringify(this.adminLoginResponseFromBackEnd));
        localStorage.setItem("adminToken", this.adminLoginResponseFromBackEnd.result);
        const headers2 = new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.adminLoginResponseFromBackEnd.result}`
        });

        if (this.status == true) {
          this.adminAuthService.setAdminUserLoggedIn(true);
          this.router.navigate(['/admindashboard']);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
