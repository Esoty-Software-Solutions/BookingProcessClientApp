import * as moment from 'moment';

import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../../../core/services/apis/api.service';
import { ISchedulesEntity } from '../../../../core/models/entities.interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss'],
})
export class ScheduleItemComponent implements OnInit {
  @Input() data!: ISchedulesEntity;
  pageLoading = false;
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private nzMessageService: NzMessageService
  ) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      items: this.fb.array([]),
    });
    this.addItems();
    this.validateForm.disable();
  }
  get itemsCtrl(): FormArray<any> {
    return this.validateForm.get('items') as FormArray;
  }
  addItems(): void {
    this.itemsCtrl.push(
      this.fb.group({
        timeslot: ['morning', [Validators.required]],
        monday: [false, [Validators.required]],
        tuesday: [false, [Validators.required]],
        wednesday: [false, [Validators.required]],
        thursday: [false, [Validators.required]],
        friday: [false, [Validators.required]],
        saturday: [false, [Validators.required]],
        sunday: [false, [Validators.required]],
        price: [false, [Validators.required]],
        dateTime: ['', [Validators.required]],
      })
    );
  }
  removeItem(index: number): void {
    if (this.itemsCtrl.length > 1) {
      this.itemsCtrl.removeAt(index);
    }
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
    console.log(this.validateForm.value);
  }
}
