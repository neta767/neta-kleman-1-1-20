import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
// import { FavoritesService } from '../favorites.service';


@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  citys = [];
  constructor(public rest: RestService) { }

  ngOnInit() {
    // this.citys = this.favorites.getList();
  }

}
