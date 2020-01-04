import { createAction, props } from '@ngrx/store';
export interface info {
  id: string;
  city: string;
  weatherText: string;
  temCelsius: string;
  temFahrenheit: string;
}

export const getAllFav = createAction('[Home Component] getAllFav');
export const addToFav = createAction(
  '[Home Component] addToFav',
  props<{ info: info }>()
);
export const removeFromFav = createAction(
  '[Home Component] removeFromFav',
  props<{ id: string; }>()
);