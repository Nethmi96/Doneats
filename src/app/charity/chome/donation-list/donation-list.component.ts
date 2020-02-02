import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DonationListDataSource, DonationListItem } from './donation-list-datasource';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<DonationListItem>;
  dataSource: DonationListDataSource;

  count: number;
  ratingColours: string[] = ['', '', '', '', ''];
  date: Date = new Date();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Id', 'Name', 'Type', 'Rating', 'Expire Date', 'Expire Time', 'Enough for ', 'status'];

  ngOnInit() {
    this.dataSource = new DonationListDataSource();
    console.log(this.date);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  rate(rating: number) {
    this.count = 0;
    this.ratingColours = [];
    while (this.count < 5) {
      if (this.count < rating) {
        this.ratingColours[this.count] = 'warn';
      } else {
        this.ratingColours[this.count] = '';
      }
      this.count += 1;
    }
  }
}
