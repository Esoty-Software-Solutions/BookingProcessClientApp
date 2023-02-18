import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ApiService } from '../../../core/services/apis/api.service';
import { ICreateAMedicalCenter } from './../../../core/models/request.interfaces';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { getBase64 } from '../../../core/utils/util-functions';
@Component({
  selector: 'app-edit-medical-center',
  templateUrl: './edit-medical-center.component.html',
  styleUrls: ['./edit-medical-center.component.scss'],
})
@UntilDestroy()
export class EditMedicalCenterComponent implements OnInit {
  @Input() id!: string;
  pageLoading = false;
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private nzMessageService: NzMessageService,
    private nzModalRef: NzModalRef
  ) {}
  ngOnInit(): void {
    this.filterCities();
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      city: [null, [Validators.required]],
      district: [null, [Validators.required]],
      description: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phoneNumber: this.fb.array([]),
      email: [null, [Validators.required]],
      facebookLink: ['', [Validators.required]],
      googleMapLink: [null, [Validators.required]],
      website: [null, [Validators.required]],
    });
    this.addPhoneNumber();
    if (!this.id) return;
    this.medicalCenterById(this.id);
  }
  get phoneNumbersCtrl(): FormArray<any> {
    return this.validateForm.get('phoneNumber') as FormArray;
  }
  addPhoneNumber() {
    const newPhoneNumber = this.fb.group({
      number: [null, [Validators.required]],
    });
    this.phoneNumbersCtrl.push(newPhoneNumber);
  }
  removePhoneNumber(index: number) {
    if (this.phoneNumbersCtrl.length === 1) {
      return this.nzMessageService.error(
        'You must have at least one phone number'
      );
    }
    this.phoneNumbersCtrl.removeAt(index);
  }
  images: any[] = [];
  imagesUrls: any[] = [];
  async handleImageChange(event: any) {
    for (let index = 0; index < event.target?.files?.length; index++) {
      const element = event.target.files[index];
      await getBase64(element, (img: any) => {
        this.imagesUrls.push(img);
        this.images.push(element);
      });
    }
  }
  onImageRemove(index: number) {
    this.imagesUrls.splice(index, 1);
    this.images.splice(index, 1);
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
    const payload = {
      medicalCenterId: this.id,
      ...this.validateForm.value,
      phoneNumber: this.validateForm.value.phoneNumber.map(
        (item: any) => item.number
      ),
    };
    const fm = new FormData();
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        const element = payload[key];
        fm.append(key, element);
      }
    }
    for (let index = 0; index < this.images.length; index++) {
      const element = this.images[index];
      fm.append('images', element);
    }
    this.updateMedicalCenterRequest(this.id, fm as any);
  }
  updateMedicalCenterRequest(id: string, payload: ICreateAMedicalCenter) {
    this.pageLoading = true;
    this.apiService
      .updateMedicalCenterById(id, payload)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.pageLoading = false;
          this.nzMessageService.success('Update medical center successfully');
          this.nzModalRef.close(true);
        },
        error: (err) => (this.pageLoading = false),
        complete: () => (this.pageLoading = false),
      });
  }
  citiesOptions: any[] = [];
  filterCities() {
    this.pageLoading = true;
    this.apiService
      .filterCities()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.pageLoading = false;
          this.citiesOptions = res?.data?.objectArray?.map((item) => ({
            label: item?.cityName,
            value: item?.cityName,
          }));
        },
        error: (err) => {},
        complete: () => {},
      });
  }
  medicalCenterById(id: string) {
    this.pageLoading = true;
    this.apiService
      .medicalCenterById(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.validateForm.patchValue({
            name: res[0]?.name,
            city: res[0]?.city,
            district: res[0]?.district,
            description: res[0]?.description,
            address: res[0]?.address,
            email: res[0]?.email,
            facebookLink: res[0]?.facebookLink,
            googleMapLink: res[0]?.googleMapLink,
            website: res[0]?.website,
          });
          this.phoneNumbersCtrl.clear();
          res[0]?.phoneNumber?.forEach((item: any) => {
            this.addPhoneNumber();
            this.phoneNumbersCtrl
              .at(this.phoneNumbersCtrl.length - 1)
              .patchValue({
                number: item,
              });
          });
          this.pageLoading = false;
        },
        error: (err) => (this.pageLoading = false),
        complete: () => (this.pageLoading = false),
      });
  }
}
