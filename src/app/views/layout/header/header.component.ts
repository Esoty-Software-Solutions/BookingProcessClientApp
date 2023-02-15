import { Component, EventEmitter, Output } from '@angular/core';

import { AuthService } from '../../../core/services/apis/auth.service';
import { LocalStorageService } from '../../../core/services/utiils/local-storage.service';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
@UntilDestroy()
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter();
  isSidebarOpen = true;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService
  ) {}
  onToggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggleSidebar.emit(this.isSidebarOpen);
  }
  onLogout() {
    this.authService.logout();
  }
}
