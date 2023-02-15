import { AuthRoutes } from './auth.routing';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from '../../icons-provider.module';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzIconModule,
    IconsProviderModule,
    NzSpinModule,
  ],
  declarations: [LoginComponent],
})
export class AuthModule {}
