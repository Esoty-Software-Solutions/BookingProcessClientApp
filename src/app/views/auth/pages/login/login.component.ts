import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ApiService } from '../../../../core/services/apis/api.service';
import { LocalStorageService } from './../../../../core/services/utiils/local-storage.service';
import { Router } from '@angular/router';

const MOCk_RES = {
  statusCode: 'string',
  message: 'string',
  token: 'string',
  data: {
    beneficiaryId: 'string',
    firstName: 'string',
    middleName: 'string',
    lastName: 'string',
    birthdate: 'string',
    phoneNumber: 'string',
    gender: 'string',
    familyMembers: [
      {
        familyMemberId: 'string',
        firstName: 'string',
        middleName: 'string',
        lastName: 'string',
        birthdate: '2019-08-24',
        relationshipToBeneficiary: 'Father',
        gender: 'string',
      },
    ],
    insurancePolicyId: 'string',
    cityResidence: 'string',
    districtResidence: 'string',
    account: {
      hasAccount: true,
      userId: 'string',
    },
  },
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
@UntilDestroy()
export class LoginComponent implements OnInit {
  pageLoading = false;
  validateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  submitForm(): void {
    if (this.validateForm.valid) {
      this.pageLoading = true;
      this.apiService
        .authLoginRequest(this.validateForm.value)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res: any) => {
            if (!res?.token) {
              return;
            }
            this.router.navigate(['']);
            this.localStorageService.setToken(res?.token);
            this.pageLoading = false;
          },
          complete: () => (this.pageLoading = false),
          error: (err) => {
            this.pageLoading = false;
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['user', [Validators.required]],
      password: ['123', [Validators.required]],
    });
  }
}
