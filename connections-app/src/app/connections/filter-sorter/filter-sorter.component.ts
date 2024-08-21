import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { FilterSorterService } from '../../core/services/filter-sorter.service';

@Component({
  selector: 'con-filter-sorter',
  templateUrl: './filter-sorter.component.html',
  styleUrls: ['./filter-sorter.component.scss']
})
export class FilterSorterComponent implements OnInit, OnDestroy{

  public subs = new Subscription();

  public sortDirection: boolean = true;

  public filter = this.formBuilder.group({
    value: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private filterSorterService: FilterSorterService,
  ) { }

  public ngOnInit(): void {
    this.subs.add(
      this.filter
        .get('value')
        ?.valueChanges.pipe(
          debounceTime(500),
        )
        .subscribe(value => {
          this.filterSorterService.updateDataFilter(value);
        })
    );
  }

  public sortASC(): void {
    this.filterSorterService.updateDataSort(this.sortDirection)
    this.sortDirection = !this.sortDirection
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
