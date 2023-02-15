import { BaseStore } from '../../core/store/base.store';
import { ILayoutStore } from '../../core/models';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  layoutStore$: BaseStore<ILayoutStore> = new BaseStore({
    isSideBarOpen: false,
  });
}
