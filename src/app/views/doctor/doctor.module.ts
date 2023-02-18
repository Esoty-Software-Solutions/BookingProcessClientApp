import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddCenterComponent } from './add-center/add-center.component';
import { CommonModule } from '@angular/common';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { DoctorComponent } from './doctor.component';
import { DoctorDetailsWidgetComponent } from './doctor-details-widget/doctor-details-widget.component';
import { DoctorRoutes } from './doctor.routing';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { IconsProviderModule } from '../../icons-provider.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ScheduleItemComponent } from './doctor-details-widget/schedule-item/schedule-item.component';
@NgModule({
  imports: [
    CommonModule,
    DoctorRoutes,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzSelectModule,
    NzIconModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    IconsProviderModule,
    NzDropDownModule,
    NzSpinModule,
    IconsProviderModule,
    NzDatePickerModule,
    NzTypographyModule,
    NzPopoverModule,
    InfiniteScrollModule,
    NzAffixModule,
    NzRadioModule,
    NzCheckboxModule,
  ],
  declarations: [
    DoctorComponent,
    DoctorDetailsWidgetComponent,
    CreateDoctorComponent,
    ScheduleItemComponent,
    EditDoctorComponent,
    AddCenterComponent,
  ],
})
export class DoctorModule {}
