import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FurnitureActions } from '../store/furniture';

import { MaterialModule } from '../layouts/material.module'
import { AccountRoutingModule } from './account-routing.module'
import { FurnitureModule } from '../furniture/furniture.module'

import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        AccountRoutingModule,
        FurnitureModule
    ],
    providers: [FurnitureActions],
    declarations: [
        UserProfileComponent,
    ],
    exports: [
    ]
})

export class AccountModule { }