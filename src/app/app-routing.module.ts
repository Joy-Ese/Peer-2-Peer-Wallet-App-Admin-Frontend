import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { AdminAuthService } from './auth/admin-auth.service';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "notfound"
  },
  {
    path: "adminlogin",
    component: AdminLoginPageComponent
  },
  {
    path: "notfound",
    component: PageNotFoundComponent
  },
  {
    path: "admindashboard",
    canMatch: [() => inject(AdminAuthService).isAdminAuthenticated()],
    loadChildren: () => import("./pages/modules/admin-dashboard/admin-dashboard.module").then(d => d.AdminDashboardModule)
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
