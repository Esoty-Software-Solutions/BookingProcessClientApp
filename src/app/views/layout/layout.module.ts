import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzInputModule,
    NzIconModule,
    NzDropDownModule,
    NzResultModule,
    NzButtonModule,
    NzMessageModule,
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    UnderConstructionComponent,
  ],
})
export class LayoutModule {}
