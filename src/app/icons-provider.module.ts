import {
  CloudUploadOutline,
  DashboardOutline,
  FormOutline,
  IeOutline,
  LockOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  PlusOutline,
  SmileTwoTone,
  UploadOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import { NgModule } from '@angular/core';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  UserOutline,
  LockOutline,
  UploadOutline,
  CloudUploadOutline,
  IeOutline,
  PlusOutline,
  SmileTwoTone,
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
