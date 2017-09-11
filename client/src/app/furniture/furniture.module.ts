import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../layouts/material.module'
import { FurnitureRoutingModule } from './furniture-routing.module'

import { FurnitureService } from '../shared/services/furniture.service';

import { FurnitureActions } from '../store/furniture';

import { FurnitureComponent } from './furniture/furniture.component';
import { FurnitureDetailsComponent } from './furniture-details/furniture-details.component';
import { CreateFurnitureComponent } from './create-furniture/create-furniture.component';
import { FurnitureListComponent } from './furniture-list/furniture-list.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { FurnitureItemComponent } from './furniture-item/furniture-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FurnitureRoutingModule,

    ],
    providers: [
        FurnitureService,
        FurnitureActions
    ],
    declarations: [
        FurnitureComponent,
        FurnitureDetailsComponent,
        CreateFurnitureComponent,
        FurnitureListComponent,
        FurnitureItemComponent,
        ReviewListComponent
    ],
    exports: [
        FurnitureListComponent,
        FurnitureItemComponent
    ]
})

export class FurnitureModule { }