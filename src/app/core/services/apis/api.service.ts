import {
  IAddScheduleRequest,
  IBaseFilterRequest,
  ICreateAMedicalCenter,
  ICreateNewDoctor as ICreateNewDoctorRequest,
  IDoctorFilterRequest,
  IFilterSchedulesRequest,
  ILoginRequest,
} from './../../models/request.interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cleanObject } from '../../utils/util-functions';
import { environment } from '../../../../environments/environment';
import { stringify } from 'qs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  endPoint = environment.baseApiUrl;
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
  filterMedicalCenters(options: IDoctorFilterRequest) {
    options = cleanObject(options);
    return this.http.get(
      `${this.endPoint}/medicalCenters?${stringify(options)}`
    );
  }
  medicalCenterById(id: string) {
    return this.http.get(`${this.endPoint}/medicalCenters/${id}`);
  }
  updateMedicalCenterById(id: string, payload: ICreateAMedicalCenter) {
    return this.http.patch(`${this.endPoint}/medicalCenters/${id}`, payload);
  }
  createMedicalCenter(payload: ICreateAMedicalCenter) {
    return this.http.post(`${this.endPoint}/medicalCenters`, payload);
  }
  filterDoctors(options: IDoctorFilterRequest) {
    options = cleanObject(options);
    return this.http.get(`${this.endPoint}/doctors?${stringify(options)}`);
  }
  doctorById(id: string) {
    return this.http.get(`${this.endPoint}/doctors/${id}`);
  }
  updateDoctor(id: string, payload: ICreateNewDoctorRequest) {
    return this.http.patch(`${this.endPoint}/doctors/${id}`, payload);
  }
  filterSchedules(options: IFilterSchedulesRequest) {
    options = cleanObject(options);
    return this.http.get(`${this.endPoint}/schedules?${stringify(options)}`);
  }
  createSchedule(payload: IAddScheduleRequest) {
    return this.http.post(`${this.endPoint}/schedules`, payload);
  }
  updateSchedule(id: string, payload: IAddScheduleRequest) {
    return this.http.patch(`${this.endPoint}/schedules/${id}`, payload);
  }
  deleteSchedules(id: string) {
    return this.http.delete(`${this.endPoint}/schedules/${id}`);
  }
  createDoctor(payload: ICreateNewDoctorRequest) {
    return this.http.post(`${this.endPoint}/doctors`, payload);
  }
  filterMedicalSpecialties(options: IBaseFilterRequest) {
    options = cleanObject(options);
    return this.http.get(
      `${this.endPoint}/medicalSpecialties?${stringify(options)}`
    );
  }
}
