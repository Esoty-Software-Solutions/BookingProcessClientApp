import { Component, OnInit } from '@angular/core';
import {
  IBaseFilterRequest,
  IDoctorFilterRequest,
} from '../../core/models/request.interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fadeInRightAnimation, slideInDownAnimation } from 'angular-animations';

import { ApiService } from '../../core/services/apis/api.service';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { IDoctorEntity } from '../../core/models/entities.interfaces';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounce } from '../../core/decorators/debounce.decorator';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  animations: [slideInDownAnimation(), fadeInRightAnimation()],
})
@UntilDestroy()
export class DoctorComponent implements OnInit {
  pageLoading = false;
  constructor(
    private nzModalService: NzModalService,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.filterMedicalSpecialties({
      limit: 10,
      skip: 0,
    });
    this.filterDoctors({ limit: 10 });
  }
  onAddNewData() {
    this.nzModalService
      .create({
        nzTitle: 'Add New Doctor',
        nzContent: CreateDoctorComponent,
        nzFooter: null,
        nzWidth: '1000px',
      })
      .afterClose.pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          if (res) {
            this.filterDoctors({ limit: 10 });
          }
        },
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
  onChangeSpecialtiesOption(value: any) {
    this.filterDoctors({
      limit: 10,
      specialty: value,
      level: this.selectedLevelOption,
      searchQuery: this.searchTerm,
    });
  }
  levelOptions: any[] = [
    { label: 'Intern', value: 'Intern' },
    { label: 'Junior', value: 'Junior' },
    { label: 'Senior', value: 'Senior' },
  ];
  selectedLevelOption: string = '';
  onChangeLevelOption(value: any) {
    this.filterDoctors({
      limit: 10,
      level: value,
      specialty: this.selectedSpecialtiesOption,
      searchQuery: this.searchTerm,
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
      specialty: this.selectedSpecialtiesOption,
      level: this.selectedLevelOption,
      searchQuery: this.searchTerm,
    });
  }
  listOfData: IDoctorEntity[] = [];
  total = 1;
  currentPage = 1;
  filterDoctors(options: IDoctorFilterRequest) {
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
  dateFormat = 'dd/MM/yyyy';
  showRightDrawer = false;
  selectedRowData: IDoctorEntity | null = null;
  onSelectRow(data: IDoctorEntity) {
    this.showRightDrawer = true;
    this.selectedRowData = data;
  }
}
