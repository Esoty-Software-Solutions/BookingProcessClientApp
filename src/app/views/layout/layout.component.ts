import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
@UntilDestroy()
export class LayoutComponent {
  isSidebarOpen = true;
  onToggleSidebar(e: any) {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen, 'sssss');
  }
}
