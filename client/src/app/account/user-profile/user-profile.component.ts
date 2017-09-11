import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';

import { FurnitureActions } from '../../store/furniture';
import { IAppState } from '../../store/IAppState';

import { FurniturePiece } from '../../furniture/FurniturePiece';

@Component({
  selector: 'ak-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  furniture: Array<FurniturePiece>

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private furnitureActions: FurnitureActions
  ) {
  }

  ngOnInit() {
    this.furnitureActions.fetchUserFurniture();

    this.ngRedux
      .select('furniture')
      .subscribe(furniture => {
        this.furniture = furniture['currentUserFurniture'];
      });

  }

  remove(furniturePieceId): void {
    this.furnitureActions.removeFurniturePiece(furniturePieceId);
  }

}
