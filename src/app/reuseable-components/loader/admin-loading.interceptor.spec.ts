import { TestBed } from '@angular/core/testing';

import { AdminLoadingInterceptor } from './admin-loading.interceptor';

describe('AdminLoadingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminLoadingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AdminLoadingInterceptor = TestBed.inject(AdminLoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
