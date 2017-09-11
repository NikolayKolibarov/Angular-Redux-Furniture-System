import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { RequesterService } from './requester.service'

import { FurniturePiece } from '../../furniture/FurniturePiece';
import { baseUrl } from '../api';

@Injectable()
export class FurnitureService {
    private furnitureUrl = `${baseUrl}/furniture`;

    constructor(
        private http: Http,
        private requester: RequesterService
    ) { }

    getFurniture(page = 1): Promise<FurniturePiece[]> {
        return this.http.get(`${this.furnitureUrl}/all?page=${page}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getFurniturePiece(id: string): Promise<FurniturePiece> {
        const url = `${this.furnitureUrl}/details/${id}`;

        return this.requester.get(url, true)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    create(furniturePiece) {
        return this.requester.post(this.furnitureUrl + '/create', furniturePiece, true);
    }

    delete(furniturePieceId) {
        return this.requester.post(`${this.furnitureUrl}/delete/${furniturePieceId}`, {}, true);
    }

    search(searchStr: string, page: number = 1): Promise<FurniturePiece[]> {
        return this.http.get(`${this.furnitureUrl}/all?search=${searchStr}&page=${page}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    addLike(furniturePieceId) {
        const url = `${this.furnitureUrl}/details/${furniturePieceId}/like`;

        return this.requester.post(url, {}, true);
    }

    addReview(furniturePieceId, review) {
        const url = `${this.furnitureUrl}/details/${furniturePieceId}/reviews/create`;

        return this.requester.post(url, review, true);
    }

    getFurnitureReviews(furniturePieceId) {
        const url = `${this.furnitureUrl}/details/${furniturePieceId}/reviews`;

        return this.requester.get(url, true);
    }

    getUserFurniture() {
        const url = `${this.furnitureUrl}/mine`;

        return this.requester.get(url, true);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}