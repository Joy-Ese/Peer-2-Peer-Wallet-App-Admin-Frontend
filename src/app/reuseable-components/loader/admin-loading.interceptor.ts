import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AdminLoaderService } from 'src/app/services/admin-loader.service';

@Injectable()
export class AdminLoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private adminLoaderService: AdminLoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.adminLoaderService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.adminLoaderService.setLoading(false);
        }
      })
    );
  }
}
