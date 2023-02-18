import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  IDoctorEntity,
  IMedicalCenterEntity,
  ISchedulesEntity,
} from '../../../core/models/entities.interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AddCenterComponent } from '../add-center/add-center.component';
import { AddDoctorComponent } from '../../medical-center/add-doctor/add-doctor.component';
import { ApiService } from '../../../core/services/apis/api.service';
import { EditDoctorComponent } from '../edit-doctor/edit-doctor.component';
import { EditMedicalCenterComponent } from '../../medical-center/edit-medical-center/edit-medical-center.component';
import { IFilterSchedulesRequest } from '../../../core/models/request.interfaces';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounce } from '../../../core/decorators/debounce.decorator';

@Component({
  selector: 'app-doctor-details-widget',
  templateUrl: './doctor-details-widget.component.html',
  styleUrls: ['./doctor-details-widget.component.scss'],
})
@UntilDestroy()
export class DoctorDetailsWidgetComponent implements OnInit, OnChanges {
  pageLoading = false;
  @Input() data!: IDoctorEntity;
  constructor(
    private apiService: ApiService,
    private nzModalService: NzModalService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.data) {
      this.data = changes.data.currentValue;
      this.filterSchedules({
        doctorId: this.data?.doctorId,
        limit: 10,
      });
    }
  }
  ngOnInit() {}
  dateFormat = 'dd/MM/yyyy';
  schedulesList: ISchedulesEntity[] = [];
  filterSchedules(options: IFilterSchedulesRequest) {
    this.pageLoading = true;
    this.apiService
      .filterSchedules(options)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.pageLoading = false;
          this.schedulesList = res?.data?.objectArray;
        },
        error: (err) => (this.pageLoading = false),
        complete: () => (this.pageLoading = false),
      });
  }
  searchTerm: string = '';
  @debounce(500)
  onSearch(e: any) {
    this.filterSchedules({
      searchQuery: this.searchTerm,
      medicalCenterId: this.data?.doctorId,
      limit: 10,
    });
  }
  onAddCenter() {
    this.nzModalService
      .create<any>({
        nzContent: AddCenterComponent,
        nzWidth: '1200px',
        nzFooter: null,
        nzComponentParams: {
          doctorId: this.data?.doctorId,
        },
      })
      .afterClose.subscribe((res) => {
        if (!res) return;
        this.filterSchedules({
          doctorId: this.data?.doctorId,
          limit: 10,
        });
      });
  }
  onEditDoctor() {
    this.nzModalService.create({
      nzTitle: 'Update Doctor',
      nzContent: EditDoctorComponent,
      nzFooter: null,
      nzWidth: '1000px',
      nzComponentParams: {
        id: this.data?.doctorId,
      },
    });
  }
  hasMore = true;
  infiniteScrollLoading = false;
  onScroll() {
    console.log('scrolled!!');
    if (!this.hasMore) return;
    this.infiniteScrollLoading = true;
    this.apiService
      .filterSchedules({
        medicalCenterId: this.data?.doctorId,
        limit: 10,
        skip: this.schedulesList.length,
      })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.schedulesList = this.schedulesList.concat(
            res?.data?.objectArray
          );
          this.hasMore = res?.data?.hasMore;
          this.infiniteScrollLoading = false;
        },
        error: (err) => (this.infiniteScrollLoading = false),
        complete: () => (this.infiniteScrollLoading = false),
      });
  }
}
