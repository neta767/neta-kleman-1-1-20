// // import { Injectable } from '@angular/core';

// // @Injectable({
// //   providedIn: 'root'
// // })

// export interface city {
//   Key: string;
//   LocalizedName: string;
// }

// export class FavoritesService {
//   citys: city[] = [];

//   addToList(city: city) {
//     this.citys.push(city);
//   }

//   removeFromList(key: string) {
//     this.citys = this.citys.filter(element => element.Key != key);
//   }

//   getList() {
//     return this.citys;
//   }

//   isExist(key: string): boolean {
//     let arr = this.citys.filter(element => element.Key == key)
//     if (arr.length === 0) {
//       return false;
//     }
//     else {
//       return true;
//     }
//   }
//   constructor() { }
// }
