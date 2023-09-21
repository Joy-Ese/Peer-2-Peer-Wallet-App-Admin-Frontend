import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PreSpinnerComponent } from './reuseable-components/pre-spinner/pre-spinner.component';
import { PreLoadingInterceptor } from './reuseable-components/loader/pre-loading.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminLoginConfirmPageComponent } from './pages/admin-login-confirm-page/admin-login-confirm-page.component';
import { ChatDialogContentComponent } from './reuseable-components/chat-dialog-content/chat-dialog-content.component';
import { ImageDialogContentComponent } from './reuseable-components/image-dialog-content/image-dialog-content.component';
import { SignalrService } from './services/signalr.service';
import { PdfDialogContentComponent } from './reuseable-components/pdf-dialog-content/pdf-dialog-content.component';
import { ReasonDialogContentComponent } from './reuseable-components/reason-dialog-content/reason-dialog-content.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginPageComponent,
    PageNotFoundComponent,
    PreSpinnerComponent,
    AdminLoginConfirmPageComponent,
    ChatDialogContentComponent,
    ImageDialogContentComponent,
    PdfDialogContentComponent,
    ReasonDialogContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: PreLoadingInterceptor, 
      multi: true
    },
    SignalrService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
