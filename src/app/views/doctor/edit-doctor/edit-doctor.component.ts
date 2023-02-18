import * as moment from 'moment';

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss'],
})
@UntilDestroy()
export class EditDoctorComponent implements OnInit, OnChanges {
  @Input() id!: string;
  pageLoading = false;
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalRef: NzModalRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id) {
      this.id = changes.id.currentValue;
      this.doctorById(this.id);
    }
  }
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
    this.doctorById(this.id);
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
    this.updateDoctor({
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
          console.log(
            '🚀 ~ file: edit-doctor.component.ts:92 ~ EditDoctorComponent ~ filterMedicalSpecialties ~ res',
            res
          );
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
  updateDoctor(payload: ICreateNewDoctor) {
    this.pageLoading = true;
    this.apiService.updateDoctor(this.id, payload).subscribe({
      next: (res: any) => {
        this.pageLoading = false;
        this.nzMessageService.success('Doctor Updated Successfully');
        this.nzModalRef.close(true);
      },
      error: (err) => (this.pageLoading = false),
      complete: () => (this.pageLoading = false),
    });
  }
  onCancel() {
    this.nzModalRef.close(false);
  }
  doctorById(id: string) {
    this.pageLoading = true;
    this.apiService
      .doctorById(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.pageLoading = false;
          this.validateForm.patchValue({
            firstName: res[0]?.firstName,
            middleName: res[0]?.middleName,
            lastName: res[0]?.lastName,
            gender: res[0]?.gender,
            birthdate: new Date(res[0]?.birthDate),
            specialty: res[0]?.specialty,
            level: res[0]?.level,
            description: res[0]?.description,
          });
        },
        error: (err) => (this.pageLoading = false),
        complete: () => (this.pageLoading = false),
      });
  }
}
