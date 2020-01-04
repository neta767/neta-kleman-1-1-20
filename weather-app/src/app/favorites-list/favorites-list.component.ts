import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Store } from '@ngrx/store';
import { getAllFav } from '../store/fav.actions';

export interface info {
  id: string;
  city: string;
  weatherText: string;
  temCelsius: string;
  temFahrenheit: string;
}

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})

export class FavoritesListComponent implements OnInit {
  constructor(private store: Store<{ fav: number }>
  ) { }
  fav = [];
  ngOnInit() {
    this.store.dispatch(getAllFav());
  }
}