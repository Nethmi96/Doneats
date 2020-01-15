import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DonationListItem {
  name: string;
  id: number;
  type: string;
  ratings: number;
  expDate: Date;
  expTime: string;
  ammount: number;
  status: boolean;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DonationListItem[] = [
  {id: 1, name: 'Hydro', type: 'Dinner', ratings: 5, expDate: null, expTime: null, ammount: 100, status: true},
  {id: 2, name: 'Hydro', type: 'Dinner', ratings: 5, expDate: null, expTime: null, ammount: 100, status: true},
  {id: 3, name: 'Hydro', type: 'Dinner', ratings: 5, expDate: null, expTime: null, ammount: 100, status: false},
  {id: 4, name: 'new Rose', type: 'Dinner', ratings: 5, expDate: null, expTime: null, ammount: 100, status: true},
  {id: 4, name: 'new Rose', type: 'Dinner', ratings: 5, expDate: null, expTime: null, ammount: 100, status: true},
];

/**
 * Data source for the DonationList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DonationListDataSource extends DataSource<DonationListItem> {
  data: DonationListItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DonationListItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DonationListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DonationListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
