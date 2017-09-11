import { Component, Input, OnInit } from '@angular/core';

import { FurniturePiece } from '../FurniturePiece'


@Component({
  selector: 'fs-furniture-list',
  templateUrl: './furniture-list.component.html',
  styleUrls: ['./furniture-list.component.css']
})
export class FurnitureListComponent implements OnInit {
  @Input() furniture: Array<FurniturePiece>;

  constructor() {
  }

  ngOnInit() {
  }

}
