import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { FurnitureActions } from '../../store/furniture';

import { FurniturePiece } from '../FurniturePiece';
import { IAppState } from '../../store/IAppState';


@Component({
  selector: 'fs-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css']
})
export class FurnitureComponent implements OnInit {
  private furniture: Array<FurniturePiece>
  private searchResults: Array<FurniturePiece>
  private page: number
  private search: string


  constructor(
    private ngRedux: NgRedux<IAppState>,
    private furnitureActions: FurnitureActions,
  ) {

    this.furniture = [];
    this.searchResults = [];
    this.page = 1;
    this.search = '';
  }

  ngOnInit() {
    this.furnitureActions.fetchFurniture();

    this.ngRedux
      .select('furniture')
      .subscribe(furniture => {
        this.furniture = furniture['all'];
      });

  }

  searchFurniture(searchStr): void {
    this.furnitureActions.searchFurniture(searchStr, this.page);

    this.ngRedux
      .select('furniture')
      .subscribe(furniture => {
        this.searchResults = furniture['searchResults'];
      });

    this.page = 1;
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;

      if (this.search != '') {
        this.furnitureActions.searchFurniture(this.search, this.page)
      } else {
        this.furnitureActions.fetchFurniture(this.page);
      }
    }

  }

  nextPage(): void {
    this.page++;

    if (this.search != '') {
      this.furnitureActions.searchFurniture(this.search, this.page)
    } else {
      this.furnitureActions.fetchFurniture(this.page);
    }

  }

  hasPreviousPage(): boolean {
    return this.page > 1;
  }

  hasNextPage(): boolean {
    if (this.search === '') {
      return this.furniture.length > 0;
    } else {
      return this.searchResults.length > 0;
    }

  }
}
