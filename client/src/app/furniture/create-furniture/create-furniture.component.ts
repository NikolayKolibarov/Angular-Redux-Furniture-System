import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../store/IAppState';
import { FurnitureActions } from '../../store/furniture';

import { FurniturePiece } from '../FurniturePiece'

@Component({
  selector: 'fs-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css']
})

export class CreateFurnitureComponent implements OnInit {
  constructor(
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private furnitureActions: FurnitureActions
  ) {
  }

  ngOnInit() {

  }

  create(make, model, year, description, price, image, material): void {
   this.furnitureActions.createFurniturePiece({make, model, year, description, price, image, material});
  }

}
