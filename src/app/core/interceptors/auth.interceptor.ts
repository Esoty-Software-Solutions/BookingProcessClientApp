import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { isArray, isEmpty } from 'lodash';
import { isJwtExpired, jwtDecodeFunction } from '../utils/jwtDecoder';

import { AuthService } from '../services/apis/auth.service';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/utiils/local-storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService
  ) {}
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken: any = this.localStorageService.getToken();
    ``;
    console.log(
      '🚀 ~ file: auth.interceptor.ts:31 ~ AuthInterceptor ~ accessToken',
      accessToken
    );
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `${accessToken}`,
          'Target-URL': environment.baseApiUrl,
        },
      });
    } else {
      req = req.clone({
        setHeaders: {
          'Target-URL': environment.baseApiUrl,
        },
      });
    }
    return next.handle(req);
  }
}
