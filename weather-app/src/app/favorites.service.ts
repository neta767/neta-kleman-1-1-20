import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export interface city {
  Key: string;
  LocalizedName: string;
}

export class FavoritesService {
  // citys: city[] = [];

  // constructor() { }
  // addToList(city: city) {
  //   this.citys.push(city);
  // }

  // removeFromList(key: string) {
  //   this.citys = this.citys.filter(element => element.Key != key)
  // }

  // getList() {
  //   return this.citys;
  // }
}
