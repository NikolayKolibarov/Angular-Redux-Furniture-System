import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { FurniturePiece } from '../FurniturePiece'

@Component({
  selector: 'fs-furniture-item',
  templateUrl: './furniture-item.component.html',
  styleUrls: ['./furniture-item.component.css']
})
export class FurnitureItemComponent implements OnInit {
  @Input() furniturePiece: FurniturePiece;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }


  viewFurnitureDetails(furniturePieceId): void {
    this.router.navigate(['/furniture/details', furniturePieceId]);
  }

}
