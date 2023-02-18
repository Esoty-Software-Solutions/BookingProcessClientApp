import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IBaseFilterRequest,
  ICreateNewDoctor,
} from '../../../core/models/request.interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ApiService } from '../../../core/services/apis/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.scss'],
})
@UntilDestroy()
export class CreateDoctorComponent implements OnInit {
  pageLoading = false;
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalRef: NzModalRef
  ) {}
  ngOnInit() {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      middleName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      birthdate: [null, [Validators.required]],
      specialty: [null, [Validators.required]],
      level: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.filterMedicalSpecialties({
      limit: 10,
      skip: 0,
    });
  }
  submitForm(): void {
    if (!this.validateForm.valid) {
      return Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.createDoctor({
      ...this.validateForm.value,
      birthdate: moment(this.validateForm.value.birthdate).format('YYYY-MM-DD'),
    });
  }
  medicalSpecialtiesOptions: any[] = [];
  isSpecialtiesOptionLoading = false;
  filterMedicalSpecialties(options: IBaseFilterRequest) {
    this.isSpecialtiesOptionLoading = true;
    this.apiService
      .filterMedicalSpecialties(options)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.isSpecialtiesOptionLoading = false;
          this.medicalSpecialtiesOptions = res?.data?.objectArray?.map(
            (item) => ({
              label: item?.medicalSpecialtyName,
              value: item?.medicalSpecialtyName,
            })
          );
        },
        error: (err) => (this.isSpecialtiesOptionLoading = false),
        complete: () => (this.isSpecialtiesOptionLoading = false),
      });
  }
  onSearchSpeciality(value: any) {
    this.filterMedicalSpecialties({
      limit: 10,
      searchQuery: value,
    });
  }
  selectedSpecialtiesOption: string = '';
  onChangeSpecialtiesOption(value: any) {}
  levelOptions: any[] = [
    { label: 'Intern', value: 'Intern' },
    { label: 'Junior', value: 'Junior' },
    { label: 'Senior', value: 'Senior' },
  ];
  createDoctor(payload: ICreateNewDoctor) {
    this.pageLoading = true;
    this.apiService.createDoctor(payload).subscribe({
      next: (res: any) => {
        this.pageLoading = false;
        this.nzMessageService.success('Doctor Created Successfully');
        this.nzModalRef.close(true);
      },
      error: (err) => {},
      complete: () => {},
    });
  }
  onCancel() {
    this.nzModalRef.close(false);
  }
}
