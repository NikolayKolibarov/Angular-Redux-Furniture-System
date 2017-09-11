import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgRedux, select } from '@angular-redux/store';
import 'rxjs/add/operator/switchMap';

import { FurnitureActions } from '../../store/furniture';

import { FurniturePiece } from '../FurniturePiece'
import { IAppState } from '../../store/IAppState';


@Component({
  selector: 'fs-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit {

  @Input() furniturePiece: FurniturePiece;
  furniturePieceReviews: Array<object>

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private furnitureActions: FurnitureActions,
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.furnitureActions
          .fetchFurniturePiece(params['id']);

        this.furnitureActions
          .fetchFurnitureReviews(params['id']);

        this.ngRedux
          .select('furniture')
          .subscribe(furniture => {
            this.furniturePiece = furniture['selected'];
          });

        this.ngRedux
          .select('furniture')
          .subscribe(furniture => {
            this.furniturePieceReviews = furniture['selectedFurnitureReviews'];
          });
      });
  }
  addLike(furniturePieceId): void {
    this.furnitureActions
      .incrementFurnitureLike(furniturePieceId);
  }

  addReview(furniturePieceId, rating, comment): void {
    this.furnitureActions
      .addFurnitureReview(furniturePieceId, { rating, comment });
  }


  back(): void {
    this.location.back();
  }

}
