import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  IMedicalCenterEntity,
  ISchedulesEntity,
} from '../../../core/models/entities.interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import { ApiService } from './../../../core/services/apis/api.service';
import { EditMedicalCenterComponent } from './../edit-medical-center/edit-medical-center.component';
import { IFilterSchedulesRequest } from '../../../core/models/request.interfaces';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounce } from '../../../core/decorators/debounce.decorator';
@Component({
  selector: 'app-details-widget',
  templateUrl: './details-widget.component.html',
  styleUrls: ['./details-widget.component.scss'],
})
@UntilDestroy()
export class DetailsWidgetComponent implements OnInit, OnChanges {
  pageLoading = false;
  @Input() data!: IMedicalCenterEntity;
  constructor(
    private apiService: ApiService,
    private nzModalService: NzModalService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.data = changes.data.currentValue;
      this.filterSchedules({
        medicalCenterId: this.data?.medicalCenterId,
        limit: 10,
        groupBy: 'doctor',
      });
    }
  }
  ngOnInit() {}
  dateFormat = 'dd/MM/yyyy';
  schedules: ISchedulesEntity[] = [];
  filterSchedules(options: IFilterSchedulesRequest) {
    this.pageLoading = true;
    this.apiService
      .filterSchedules(options)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.pageLoading = false;
          this.schedules = res?.data?.objectArray;
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
      medicalCenterId: this.data?.medicalCenterId,
      limit: 10,
    });
  }
  onAddDoctor() {
    this.nzModalService
      .create<any>({
        nzContent: AddDoctorComponent,
        nzWidth: '1200px',
        nzFooter: null,
        nzComponentParams: {
          medicalCenterId: this.data?.medicalCenterId,
        },
      })
      .afterClose.subscribe((res) => {
        if (!res) return;
        this.filterSchedules({
          medicalCenterId: this.data?.medicalCenterId,
          limit: 10,
          groupBy: 'doctor',
        });
      });
  }
  onEditMedicalCenter() {
    this.nzModalService.create({
      nzTitle: 'Update medical center',
      nzContent: EditMedicalCenterComponent,
      nzFooter: null,
      nzWidth: '1000px',
      nzComponentParams: {
        id: this.data?.medicalCenterId,
      },
    });
  }
  hasMore = true;
  infiniteScrollLoading = false;
  onScroll() {
    if (!this.hasMore) return;
    this.infiniteScrollLoading = true;
    this.apiService
      .filterSchedules({
        medicalCenterId: this.data?.medicalCenterId,
        limit: 10,
        skip: this.schedules.length,
        groupBy: 'doctor',
      })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.schedules = this.schedules.concat(res?.data?.objectArray);
          this.hasMore = res?.data?.hasMore;
          this.infiniteScrollLoading = false;
        },
        error: (err) => (this.infiniteScrollLoading = false),
        complete: () => (this.infiniteScrollLoading = false),
      });
  }
  afterUpdateSchedule() {
    this.filterSchedules({
      medicalCenterId: this.data?.medicalCenterId,
      limit: 10,
      groupBy: 'doctor',
    });
  }
}
