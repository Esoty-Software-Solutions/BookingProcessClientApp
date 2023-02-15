import { RouterModule, Routes } from '@angular/router';

import { MedicalCenterComponent } from './medical-center.component';

const routes: Routes = [
  {
    path: '',
    component: MedicalCenterComponent,
  },
];

export const MedicalCenterRoutes = RouterModule.forChild(routes);
