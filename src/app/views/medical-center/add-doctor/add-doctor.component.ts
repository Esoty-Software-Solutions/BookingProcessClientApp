import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ApiService } from '../../../core/services/apis/api.service';
import { IBaseFilterRequest } from '../../../core/models/request.interfaces';
import { IDoctorEntity } from './../../../core/models/entities.interfaces';
import { debounce } from '../../../core/decorators/debounce.decorator';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
})
@UntilDestroy()
export class AddDoctorComponent implements OnInit {
  pageLoading = false;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.filterDoctors({
      limit: 10,
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
      // starting_after_object:
      //   this.listOfData[this.listOfData.length - 1]?.medicalCenterId,
      limit: 10,
    });
  }
  listOfData: IDoctorEntity[] = [];
  total = 1;
  currentPage = 1;
  filterDoctors(options: IBaseFilterRequest) {
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
}
