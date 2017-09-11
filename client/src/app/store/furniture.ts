import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

import { IAppState } from './IAppState';
import { IAction } from './IAction';

import { FurnitureService } from '../shared/services/furniture.service';
import { MessageService } from '../shared/services/message.service';

import { FurniturePiece } from '../furniture/FurniturePiece';
import { Review } from '../furniture/Review';

// Action
@Injectable()
export class FurnitureActions {
    constructor(
        private router: Router,
        private ngRedux: NgRedux<IAppState>,
        private furnitureService: FurnitureService,
        private messageService: MessageService,
    ) { }

    static FETCH_FURNITURE: string = 'FETCH_FURNITURE';
    static FETCH_FURNITURE_PIECE: string = 'FETCH_FURNITURE_PIECE';
    static FETCH_FURNITURE_REVIEWS: string = 'FETCH_FURNITURE_REVIEWS';
    static FETCH_USER_FURNITURE: string = 'FETCH_USER_FURNITURE';
    static CREATE_FURNITURE_PIECE: string = 'CREATE_FURNITURE_PIECE';
    static REMOVE_FURNITURE_PIECE: string = 'REMOVE_FURNITURE_PIECE';
    static SEARCH_FURNITURE: string = 'SEARCH_FURNITURE';
    static FURNITURE_CREATE_REVIEW: string = 'FURNITURE_CREATE_REVIEW';
    static FURNITURE_INCREMENT_LIKE: string = 'FURNITURE_INCREMENT_LIKE';
    static FURNITURE_ERROR: string = 'FURNITURE_ERROR';

    fetchFurniture(page = 1): void {
        this.furnitureService
            .getFurniture(page)
            .then(furniture => {
                this.ngRedux.dispatch({ type: FurnitureActions.FETCH_FURNITURE, payload: { furniture: furniture } });
            });
    }

    fetchFurniturePiece(furnitureId): void {
        this.furnitureService
            .getFurniturePiece(furnitureId)
            .then(furniturePiece => {
                this.ngRedux.dispatch({ type: FurnitureActions.FETCH_FURNITURE_PIECE, payload: { furniturePiece: furniturePiece } });
            })
    }

    fetchFurnitureReviews(furnitureId): void {
        this.furnitureService
            .getFurnitureReviews(furnitureId)
            .subscribe(response => {
                this.ngRedux.dispatch({ type: FurnitureActions.FETCH_FURNITURE_REVIEWS, payload: { reviews: response.json() } });
            })
    }

    createFurniturePiece(furniturePiece): void {
        this.furnitureService
            .create(furniturePiece)
            .subscribe(response => {
                let data = response.json();

                if (data.success) {
                    this.ngRedux.dispatch({ type: FurnitureActions.CREATE_FURNITURE_PIECE });
                    this.messageService.showSuccessMessage(data.message);
                    this.router.navigate(['/furniture']);
                } else {
                    if (data.errors.make) {
                        this.messageService.showErrorMessage(data.errors.make);
                    } else if (data.errors.model) {
                        this.messageService.showErrorMessage(data.errors.model);
                    } else if (data.errors.year) {
                        this.messageService.showErrorMessage(data.errors.year);
                    } else if (data.errors.description) {
                        this.messageService.showErrorMessage(data.errors.description);
                    } else if (data.errors.price) {
                        this.messageService.showErrorMessage(data.errors.price);
                    } else if (data.errors.image) {
                        this.messageService.showErrorMessage(data.errors.image);
                    }
                }
            })
    }

    removeFurniturePiece(furnitureId) {
        this.furnitureService
            .delete(furnitureId)
            .subscribe(response => {
                if (response.json().success) {
                    this.ngRedux.dispatch({ type: FurnitureActions.REMOVE_FURNITURE_PIECE });
                    this.messageService.showSuccessMessage(response.json().message);
                    this.fetchUserFurniture();
                } else {
                    this.messageService.showErrorMessage(response.json().message);
                }
            })
    }

    searchFurniture(searchStr, page) {
        this.furnitureService
            .search(searchStr, page)
            .then(furniture => {
                this.ngRedux.dispatch({ type: FurnitureActions.SEARCH_FURNITURE, payload: { furniture: furniture } });
            });
    }

    addFurnitureReview(furnitureId, review) {
        this.furnitureService
            .addReview(furnitureId, review)
            .subscribe(response => {
                if (response.json().success) {
                    this.ngRedux.dispatch({ type: FurnitureActions.FURNITURE_CREATE_REVIEW, payload: { review: response.json().review } });
                    this.fetchFurnitureReviews(furnitureId);
                    this.messageService.showSuccessMessage('Review was added successfully.');
                } else {
                    this.messageService.showSuccessMessage(response.json().message);

                }
            });
    }

    incrementFurnitureLike(furnitureId) {
        this.furnitureService
            .addLike(furnitureId)
            .subscribe(response => {
                if (response.json().success) {
                    this.ngRedux.dispatch({ type: FurnitureActions.FURNITURE_INCREMENT_LIKE });
                } else {
                    this.messageService.showErrorMessage('Already liked.');
                }

            });
    }

    fetchUserFurniture() {
        this.furnitureService
            .getUserFurniture()
            .subscribe(response => {
                this.ngRedux.dispatch({ type: FurnitureActions.FETCH_USER_FURNITURE, payload: { furniture: response.json() } });
            });
    }

    furnitureError(error): void {
        this.ngRedux.dispatch({ type: FurnitureActions.FURNITURE_ERROR, payload: error });
        this.messageService.showErrorMessage(error);
    }
}

// Reducer
export interface IFurnitureState {
    all: Array<FurniturePiece>,
    searchResults: Array<FurniturePiece>,
    selected: FurniturePiece,
    selectedFurnitureReviews: Array<Review>,
    currentUserFurniture: Array<FurniturePiece>
}

const initialState: IFurnitureState = {
    all: [],
    searchResults: [],
    selected: null,
    selectedFurnitureReviews: [],
    currentUserFurniture: []
}

export default function reducer(state: IFurnitureState = initialState, action: IAction) {
    switch (action.type) {
        case FurnitureActions.FETCH_FURNITURE:
            return Object.assign({}, state, { all: action.payload.furniture })
        case FurnitureActions.FETCH_FURNITURE_PIECE:
            return Object.assign({}, state, { selected: action.payload.furniturePiece })
        case FurnitureActions.FETCH_FURNITURE_REVIEWS:
            return Object.assign({}, state, { selectedFurnitureReviews: action.payload.reviews })
        case FurnitureActions.SEARCH_FURNITURE:
            return Object.assign({}, state, { searchResults: action.payload.furniture })
        case FurnitureActions.FURNITURE_INCREMENT_LIKE:
            let updatedFurniture = Object.assign({}, state.selected);
            updatedFurniture['likes']++;
            return Object.assign({}, state, { selected: updatedFurniture });
        case FurnitureActions.FETCH_USER_FURNITURE:
            return Object.assign({}, state, { currentUserFurniture: action.payload.furniture })
        case FurnitureActions.FURNITURE_ERROR:
            return Object.assign({}, state, { error: action.payload.error })
        case FurnitureActions.CREATE_FURNITURE_PIECE:
        case FurnitureActions.FURNITURE_CREATE_REVIEW:
        case FurnitureActions.REMOVE_FURNITURE_PIECE:
        default:
            return state;
    }
}



