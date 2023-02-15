import { RouterModule, Routes } from '@angular/router';

import { AuthorizedGuard } from './core/guards/authorized.guard';
import { LayoutComponent } from './views/layout/layout.component';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PageNotFoundComponent } from './shared/components';
import { UnAuthorizationGuard } from './core/guards/unAuthorized.guard';
import { UnderConstructionComponent } from './views/layout/under-construction/under-construction.component';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/views/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [UnAuthorizationGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthorizedGuard],
    children: [
      {
        path: '',
        redirectTo: 'medical-center',
        pathMatch: 'full',
      },
      {
        path: 'medical-center',
        loadChildren: () =>
          import('./views/medical-center/medical-center.module').then(
            (m) => m.MedicalCenterModule
          ),
      },
      {
        path: '**',
        component: UnderConstructionComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    NzButtonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
