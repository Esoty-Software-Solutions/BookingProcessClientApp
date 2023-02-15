import { Component, OnInit } from '@angular/core';
import {
  IBaseFilterRequest,
  IFilterMedicalCentersRequest,
} from '../../core/models/request.interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  bounceOutDownOnLeaveAnimation,
  fadeInRightAnimation,
  fadeInUpOnEnterAnimation,
  slideInDownAnimation,
} from 'angular-animations';

import { AddNewMedicalCenterComponent } from './add-new-medical-center/add-new-medical-center.component';
import { ApiService } from './../../core/services/apis/api.service';
import { IMedicalCenterEntity } from './../../core/models/entities.interfaces';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounce } from '../../core/decorators/debounce.decorator';
@Component({
  selector: 'app-medical-center',
  templateUrl: './medical-center.component.html',
  styleUrls: ['./medical-center.component.scss'],
  animations: [slideInDownAnimation(), fadeInRightAnimation()],
})
@UntilDestroy()
export class MedicalCenterComponent implements OnInit {
  pageLoading = false;
  constructor(
    private nzModalService: NzModalService,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.filterCities();
    this.filterMedicalCenters({ limit: 10 });
  }
  onAddNewData() {
    this.nzModalService.create({
      nzTitle: 'Add new medical center',
      nzContent: AddNewMedicalCenterComponent,
      nzFooter: null,
      nzWidth: '1000px',
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
  selectedCity: string = '';
  onChangeCity(value: any) {
    console.log(value, 'value');
    this.filterMedicalCenters({
      city: value,
      limit: 10,
      searchQuery: this.searchTerm,
    });
  }
  searchTerm: string = '';
  @debounce(500)
  onSearch({ target: { value } }: any) {
    this.filterMedicalCenters({
      searchQuery: value,
      city: this.selectedCity,
      limit: 10,
    });
  }
  onPageChange(page: number) {
    this.filterMedicalCenters({
      starting_after_object:
        this.listOfData[this.listOfData.length - 1]?.medicalCenterId,
      limit: 10,
      city: this.selectedCity,
    });
  }
  listOfData: IMedicalCenterEntity[] = [];
  total = 1;
  currentPage = 1;
  filterMedicalCenters(options: IFilterMedicalCentersRequest) {
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
  dateFormat = 'dd/MM/yyyy';
  showRightDrawer = false;
  selectedMedicalCenter: IMedicalCenterEntity | null = null;
  onSelectRow(data: IMedicalCenterEntity) {
    this.showRightDrawer = true;
    this.selectedMedicalCenter = data;
  }
}