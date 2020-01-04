import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { FavoritesService } from '../favorites.service';


@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  try = 2;
  citys = [];
  constructor(public rest: RestService, public favorites: FavoritesService) { }

  ngOnInit() {
    this.citys = this.favorites.getList();
  }

}


// import { Component } from '@angular/core';
// import { Store, select } from '@ngrx/store';
// import { Observable } from 'rxjs';
 
// @Component({
//   selector: 'app-my-counter',
//   templateUrl: './my-counter.component.html',
//   styleUrls: ['./my-counter.component.css'],
// })
// export class MyCounterComponent {
//   count$: Observable<number>;
 
//   constructor(private store: Store<{ count: number }>) {
//     this.count$ = store.pipe(select('count'));
//   }
 
//   increment() {
//     this.store.dispatch(increment());
//   }
 
//   decrement() {
//     this.store.dispatch(decrement());
//   }
 
//   reset() {
//     this.store.dispatch(reset());
//   }
// }