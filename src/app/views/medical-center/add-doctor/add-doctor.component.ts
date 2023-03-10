import * as moment from 'moment';

import { Component, Input, OnInit } from '@angular/core';
import {
  IAddScheduleRequest,
  IBaseFilterRequest,
} from '../../../core/models/request.interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ApiService } from '../../../core/services/apis/api.service';
import { IDoctorEntity } from './../../../core/models/entities.interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { debounce } from '../../../core/decorators/debounce.decorator';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
})
@UntilDestroy()
export class AddDoctorComponent implements OnInit {
  @Input() medicalCenterId!: string;
  pageLoading = false;
  constructor(
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalRef: NzModalRef
  ) {}
  ngOnInit() {
    this.filterDoctors({
      limit: 10,
    });
  }
  searchTerm: string = '';
  @debounce(500)
  onSearch({ target: { value } }: any) {
    this.filterDoctors({
      searchQuery: value,
      limit: 10,
    });
  }
  onPageChange(page: number) {
    this.filterDoctors({
      skip: (page - 1) * 10,
      limit: 10,
    });
  }
  listOfData: IDoctorEntity[] = [];
  total = 1;
  currentPage = 1;
  filterDoctors(options: IBaseFilterRequest) {
    this.pageLoading = true;
    this.apiService
      .filterDoctors(options)
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
  onAddDoctor(data: IDoctorEntity) {
    this.pageLoading = true;
    const payload: IAddScheduleRequest = {
      medicalCenterId: this.medicalCenterId,
      doctorId: data.doctorId,
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
          this.nzMessageService.success('Doctor added successfully');
          this.nzModalRef.close(true);
        },
        error: (err) => (this.pageLoading = false),
        complete: () => (this.pageLoading = false),
      });
  }
}
