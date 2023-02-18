import { RouterModule, Routes } from '@angular/router';

import { DoctorComponent } from './doctor.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorComponent,
  },
];
export const DoctorRoutes = RouterModule.forChild(routes);
