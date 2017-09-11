import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard'

import { FurnitureComponent } from './furniture/furniture.component';
import { FurnitureDetailsComponent } from './furniture-details/furniture-details.component';
import { CreateFurnitureComponent } from './create-furniture/create-furniture.component';

const routes: Routes = [
    { path: 'furniture', component: FurnitureComponent },
    { path: 'furniture/details/:id', component: FurnitureDetailsComponent, canActivate: [AuthGuard] },
    { path: 'furniture/create', component: CreateFurnitureComponent, canActivate: [AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FurnitureRoutingModule { }