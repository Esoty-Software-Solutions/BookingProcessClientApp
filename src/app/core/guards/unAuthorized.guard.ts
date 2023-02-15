import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/utiils/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class UnAuthorizationGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  canActivate() {
    const hasAuth = Boolean(this.localStorageService.getToken());
    if (!hasAuth) {
      return true;
    } else {
      this.router.navigate(['medical-center']);
      return false;
    }
  }
}
