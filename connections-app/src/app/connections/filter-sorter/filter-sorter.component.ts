import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'con-filter-sorter',
  templateUrl: './filter-sorter.component.html',
  styleUrls: ['./filter-sorter.component.scss'],
})
export class FilterSorterComponent implements OnInit, OnDestroy{

  @Output() newValueEvent = new EventEmitter<string>();
  @Output() newSortEvent = new EventEmitter<boolean>();

  public subs = new Subscription();

  public sortDirection: boolean = true;

  public filter = this.formBuilder.group({
    value: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
  ) { }

  public ngOnInit(): void {
    this.subs.add(
      this.filter
        .get('value')
        ?.valueChanges.pipe(
          debounceTime(500),
        )
        .subscribe(value => {
          this.newValueEvent.emit(value);
        })
    );
  }

  public sortASC(): void {
    this.newSortEvent.emit(this.sortDirection)
    this.sortDirection = !this.sortDirection
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
