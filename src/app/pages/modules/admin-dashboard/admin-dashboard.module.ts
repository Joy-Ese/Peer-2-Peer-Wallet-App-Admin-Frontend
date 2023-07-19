import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatDialogModule } from '@angular/material/dialog';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoadingInterceptor } from 'src/app/reuseable-components/loader/admin-loading.interceptor';
import { AdminAuthorizeInterceptorInterceptor } from 'src/app/reuseable-components/bearer-token/admin-authorize-interceptor.interceptor';
import { AdminTokenInterceptorInterceptor } from 'src/app/reuseable-components/bearer-token/admin-token-interceptor.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminDashboardPageComponent } from '../../admin-dashboard-page/admin-dashboard-page.component';
import { MiniAdminDashboardPageComponent } from '../../mini-admin-dashboard-page/mini-admin-dashboard-page.component';
import { AdminAccountingPageComponent } from '../../admin-accounting-page/admin-accounting-page.component';
import { AdminSpinnerComponent } from 'src/app/reuseable-components/admin-spinner/admin-spinner.component';
import { FilterByPipe } from 'src/app/models/filter-by.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { SnackBarComponent } from 'src/app/reuseable-components/snack-bar/snack-bar.component';
import { TransactionPageComponent } from '../../transaction-page/transaction-page.component';


const routes: Routes = [
  {
    path: "",
    component: AdminDashboardPageComponent, children: [
      {
        path: "",
        redirectTo: "miniadmindashboard",
        pathMatch: "full"
      },
      {
        path: "miniadmindashboard",
        component: MiniAdminDashboardPageComponent
      },
      {
        path: "adminaccounting",
        component: AdminAccountingPageComponent
      },
      {
        path: "transactions",
        component: TransactionPageComponent
      },
    ]
  }
];


@NgModule({
  declarations: [
    AdminDashboardPageComponent,
    MiniAdminDashboardPageComponent,
    AdminAccountingPageComponent,
    AdminSpinnerComponent,
    FilterByPipe,
    SnackBarComponent,
    TransactionPageComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    SweetAlert2Module,
    CanvasJSAngularChartsModule,
    MatTabsModule,
    NgxPaginationModule,
    // OrderModule,
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AdminTokenInterceptorInterceptor, 
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AdminAuthorizeInterceptorInterceptor, 
      multi: true
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AdminLoadingInterceptor, 
      multi: true
    },
    BnNgIdleService,
  ],
  exports: [RouterModule]
})
export class AdminDashboardModule { }
