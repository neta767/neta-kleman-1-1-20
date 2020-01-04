// import { createAction, props } from '@ngrx/store';
// export interface info {
//   id: string;
//   city: string;
//   weatherText: string;
//   temCelsius: string;
//   temFahrenheit: string;
// }

// export const getAllFav = createAction('[Home Component] getAllFav');
// export const addToFav = createAction(
//   '[Home Component] addToFav',
//   props<{ info: info }>()
// );
// export const removeFromFav = createAction(
//   '[Home Component] removeFromFav',
//   props<{ id: string; }>()
// );


import { Action } from '@ngrx/store';
    
interface info {
  id: string;
  city: string;
  weatherText: string;
  temCelsius: string;
  temFahrenheit: string;
}

export enum ActionTypes {
  Add = '[Product] Add to cart',
  Remove = '[Product] Remove from cart',
  LoadItems = '[Products] Load items from server',
  LoadSuccess = '[Products] Load success'
}

export class AddToFav implements Action {
  readonly type = ActionTypes.Add;

  constructor(public payload: info) {}
}

export class GetItems implements Action {
  readonly type = ActionTypes.LoadItems;
}

export class RemoveFromFav implements Action {
  readonly type = ActionTypes.Remove;

  constructor(public payload: info) {}
}

export class LoadFav implements Action {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public payload: info[]) {}
}

export type ActionsUnion = AddToCart | RemoveFromCart | LoadItems | GetItems;  