import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
export const AuthRoutes = RouterModule.forChild(routes);
