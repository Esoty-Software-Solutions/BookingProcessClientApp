import * as moment from 'moment';

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../../../core/services/apis/api.service';
import { ICreateScheduleRequest } from './../../../../core/models/request.interfaces';
import { ISchedulesEntity } from '../../../../core/models/entities.interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss'],
})
export class ScheduleItemComponent implements OnChanges {
  @Input() data!: ISchedulesEntity;
  @Output() afterUpdateSchedule: EventEmitter<any> = new EventEmitter();
  pageLoading = false;
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private nzMessageService: NzMessageService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.validateForm = this.fb.group({
      items: this.fb.array([]),
    });
    if (changes.data.currentValue) {
      changes.data.currentValue?.scheduleList?.forEach((slot) => {
        this.itemsCtrl.push(
          this.fb.group({
            id: [slot?.scheduleId],
            timeslot: [slot?.timeslot, [Validators.required]],
            monday: [slot?.monday, [Validators.required]],
            tuesday: [slot?.tuesday, [Validators.required]],
            wednesday: [slot?.wednesday, [Validators.required]],
            thursday: [slot?.thursday, [Validators.required]],
            friday: [slot?.friday, [Validators.required]],
            saturday: [slot?.saturday, [Validators.required]],
            sunday: [slot?.sunday, [Validators.required]],
            price: [slot?.price, [Validators.required]],
            dateTime: [
              [new Date(slot?.startDate), new Date(slot?.endDate)],
              [Validators.required],
            ],
          })
        );
      });
      this.validateForm.disable();
    }
  }
  get itemsCtrl(): FormArray<any> {
    return this.validateForm.get('items') as FormArray;
  }
  addSlotFormItem() {
    this.itemsCtrl.push(
      this.fb.group({
        id: [null],
        timeslot: ['morning', [Validators.required]],
        monday: [false, [Validators.required]],
        tuesday: [false, [Validators.required]],
        wednesday: [false, [Validators.required]],
        thursday: [false, [Validators.required]],
        friday: [false, [Validators.required]],
        saturday: [false, [Validators.required]],
        sunday: [false, [Validators.required]],
        price: [false, [Validators.required]],
        dateTime: [[new Date(), new Date()], [Validators.required]],
      })
    );
  }
  removeSlotFormItem(index: number): void {
    this.itemsCtrl.removeAt(index);
  }
  isEditMode: boolean = false;
  onEnableEdit() {
    this.isEditMode = true;
    this.validateForm.enable();
  }
  onDiscard() {
    this.isEditMode = false;
    this.validateForm.disable();
  }
  onApply() {
    // Update existing schedules
    this.validateForm.controls.items?.['controls']
      ?.filter((item) => item.dirty && item?.value?.id)
      .forEach((item) => {
        const payload = {
          ...item.value,
          startDate: moment(item?.value?.dateTime[0]).format('YYYY-MM-DD'),
          endDate: moment(item?.value?.dateTime[1]).format('YYYY-MM-DD'),
        };
        delete payload?.dateTime;
        delete payload?.id;
        this.updateSchedules(item?.value?.id, payload);
      });
    // Create new schedules
    this.validateForm.controls.items?.['controls']
      .filter((item) => !item?.value?.id)
      .forEach((item) => {
        const payload = {
          ...item.value,
          startDate: moment(item?.value?.dateTime[0]).format('YYYY-MM-DD'),
          endDate: moment(item?.value?.dateTime[1]).format('YYYY-MM-DD'),
          doctorId: this.data?.doctorObject?.doctorId,
          medicalCenterId: this.data?.scheduleList[0]?.medicalCenterId,
        };
        delete payload?.dateTime;
        delete payload?.id;
        this.createSchedules(payload);
      });
  }
  updateSchedules(id: string, data: ICreateScheduleRequest) {
    this.pageLoading = true;
    this.apiService.updateSchedule(id, data).subscribe({
      next: (res: any) => {
        this.pageLoading = false;
        this.nzMessageService.success('Schedule updated successfully');
        this.onDiscard();
        this.afterUpdateSchedule.emit();
      },
      error: (err) => (this.pageLoading = false),
      complete: () => (this.pageLoading = false),
    });
  }
  createSchedules(data: any) {
    this.pageLoading = true;
    this.apiService.createSchedule(data).subscribe({
      next: (res: any) => {
        this.pageLoading = false;
        this.nzMessageService.success('Schedule created successfully');
        this.onDiscard();
        this.afterUpdateSchedule.emit();
      },
      error: (err) => (this.pageLoading = false),
      complete: () => (this.pageLoading = false),
    });
  }
  deleteSchedules(id: string, index: number) {
    this.pageLoading = true;
    this.apiService.deleteSchedules(id).subscribe({
      next: (res: any) => {
        this.pageLoading = false;
        this.nzMessageService.success('Schedule deleted successfully');
        this.onDiscard();
        this.itemsCtrl.removeAt(index);
        this.afterUpdateSchedule.emit();
      },
      error: (err) => (this.pageLoading = false),
      complete: () => (this.pageLoading = false),
    });
  }
  deleteAllSchedules() {
    this.pageLoading = true;
    this.validateForm.controls.items?.['controls'].forEach((item) => {
      if (!item?.value?.id) return;
      this.apiService.deleteSchedules(item?.value?.id).subscribe({
        next: (res: any) => {
          this.pageLoading = false;
          this.nzMessageService.success('Schedule deleted successfully');
          this.onDiscard();
          this.itemsCtrl.removeAt(0);
          this.afterUpdateSchedule.emit();
        },
        error: (err) => (this.pageLoading = false),
        complete: () => (this.pageLoading = false),
      });
    });
  }
}
