import * as moment from 'moment';

import { Component, Input, OnInit } from '@angular/core';
import {
  IAddScheduleRequest,
  IBaseFilterRequest,
} from '../../../core/models/request.interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ApiService } from '../../../core/services/apis/api.service';
import { IDoctorEntity } from '../../../core/models/entities.interfaces';
import { IMedicalCenterEntity } from './../../../core/models/entities.interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { debounce } from '../../../core/decorators/debounce.decorator';

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.component.html',
  styleUrls: ['./add-center.component.scss'],
})
@UntilDestroy()
export class AddCenterComponent implements OnInit {
  @Input() doctorId!: string;
  pageLoading = false;
  constructor(
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalRef: NzModalRef
  ) {}
  ngOnInit() {
    this.filterMedicalCenters({
      limit: 10,
    });
  }
  searchTerm: string = '';
  @debounce(500)
  onSearch({ target: { value } }: any) {
    this.filterMedicalCenters({
      searchQuery: value,
      limit: 10,
    });
  }
  onPageChange(page: number) {
    this.filterMedicalCenters({
      skip: (page - 1) * 10,
      limit: 10,
    });
  }
  listOfData: IMedicalCenterEntity[] = [];
  total = 1;
  currentPage = 1;
  filterMedicalCenters(options: IBaseFilterRequest) {
    this.pageLoading = true;
    this.apiService
      .filterMedicalCenters(options)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.pageLoading = false;
          this.listOfData = res?.data?.objectArray;
          this.total = res?.data?.objectCount;
        },
        error: (err) => {},
        complete: () => {},
      });
  }
  onAddCenter(data: IMedicalCenterEntity) {
    console.log(
      '🚀 ~ file: add-center.component.ts:69 ~ AddCenterComponent ~ onAddCenter ~ data',
      data
    );
    this.pageLoading = true;
    const payload: IAddScheduleRequest = {
      doctorId: this.doctorId,
      medicalCenterId: data.medicalCenterId,
      timeslot: 'morning',
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      price: '0',
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    };
    this.apiService
      .createSchedule(payload)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.pageLoading = false;
          this.nzMessageService.success('Hospital added successfully');
          this.nzModalRef.close(true);
        },
        error: (err) => (this.pageLoading = false),
        complete: () => (this.pageLoading = false),
      });
  }
}
