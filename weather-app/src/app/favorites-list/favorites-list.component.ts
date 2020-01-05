import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

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
  constructor(private store: Store<{ fav: [] }>
  ) {
    store.pipe(select('fav')).subscribe(data => (this.fav = data.fav));
    console.log(this.fav)
  }

  fav: info[] = [];
  ngOnInit() {
  }
}