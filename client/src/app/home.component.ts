import { Component, OnInit } from '@angular/core';

import { RequesterService } from './shared/services/requester.service'


@Component({
  selector: 'home',
  template: `
  <h1>Welcome to {{title}}</h1>
  <md-card>
  <h3>Users: {{ users }}</h3>
  <h3>Furniture: {{ furniture }}</h3>
  </md-card>
  `,

})
export class HomeComponent implements OnInit {
  title = 'Furniture System';
  furniture
  users

  constructor(
    private requester: RequesterService
  ) { }

  ngOnInit() {
    this.requester
      .get('http://localhost:5000/stats', false)
      .subscribe(response => {
        this.furniture = response.json().furniture;
        this.users = response.json().users;
      });
  }

}