import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { AddNewMedicalCenterComponent } from './add-new-medical-center/add-new-medical-center.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DetailsWidgetComponent } from './details-widget/details-widget.component';
import { EditMedicalCenterComponent } from './edit-medical-center/edit-medical-center.component';
import { IconsProviderModule } from '../../icons-provider.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MedicalCenterComponent } from './medical-center.component';
import { MedicalCenterRoutes } from './medical-center.routing';
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
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ScheduleItemComponent } from './details-widget/schedule-item/schedule-item.component';

@NgModule({
  imports: [
    CommonModule,
    MedicalCenterRoutes,
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
    NzPopconfirmModule,
  ],
  declarations: [
    MedicalCenterComponent,
    AddNewMedicalCenterComponent,
    DetailsWidgetComponent,
    AddDoctorComponent,
    EditMedicalCenterComponent,
    ScheduleItemComponent,
  ],
})
export class MedicalCenterModule {}
