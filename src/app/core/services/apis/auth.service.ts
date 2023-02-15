import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../utiils/local-storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private apiService: ApiService,
    private nzMessageService: NzMessageService
  ) {}
  logout() {
    const id = this.nzMessageService.loading('Logging out...');
    this.localStorageService.clearAll();
    console.log('logout');
    this.apiService.logoutRequest().subscribe({
      next: (res) => {
        this.nzMessageService.success('Logout successfully');
        this.router.navigate(['auth']);
        this.nzMessageService.remove(id.messageId);
      },
      error: (err) => {
        this.nzMessageService.error('Logout failed');
        this.nzMessageService.remove(id.messageId);
      },
      complete: () => {
        this.nzMessageService.remove(id.messageId);
      },
    });
  }
}
