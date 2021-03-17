import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const auth = this.injector.get(AuthService);
    request = request.clone({
      setHeaders: {
        'x-auth-token': `${auth.getToken()}`,
      },
    });

    return next.handle(request);
  }
}
