import {
  IBaseFilterRequest,
  ICreateAMedicalCenter,
  IFilterMedicalCentersRequest,
  IFilterSchedulesRequest,
  ILoginRequest,
} from './../../models/request.interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cleanObject } from '../../utils/util-functions';
import { stringify } from 'qs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  endPoint = `https://cors-eolf.onrender.com`;
  constructor(private http: HttpClient) {}
  authLoginRequest(payload: ILoginRequest) {
    return this.http.post(`${this.endPoint}/login`, payload);
  }
  logoutRequest() {
    return this.http.post(`${this.endPoint}/logout`, {});
  }
  filterCities() {
    return this.http.get(`${this.endPoint}/cities`);
  }
  filterMedicalCenters(options: IFilterMedicalCentersRequest) {
    options = cleanObject(options);
    return this.http.get(
      `${this.endPoint}/medicalCenters?${stringify(options)}`
    );
  }
  createMedicalCenter(payload: ICreateAMedicalCenter) {
    return this.http.post(`${this.endPoint}/medicalCenters`, payload);
  }
  filterSchedules(options: IFilterSchedulesRequest) {
    options = cleanObject(options);
    return this.http.get(`${this.endPoint}/schedules?${stringify(options)}`);
  }
  filterDoctors(options: IBaseFilterRequest) {
    options = cleanObject(options);
    return this.http.get(`${this.endPoint}/doctors?${stringify(options)}`);
  }
}
