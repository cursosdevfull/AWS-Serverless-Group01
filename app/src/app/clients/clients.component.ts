import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: { name: string }[] = [];

  constructor() {
    API.get('api', '/clients', null)
      .then((response) => {
        this.clients = response.items;
      })
      .catch(console.log);
  }

  ngOnInit(): void {}
}
