import { createAction, props } from '@ngrx/store';

export const getAllFav = createAction('[Counter Component] Reset');
export const addToFav = createAction(
  '[Home Page] addCity',
  props<{ id: string; name: string }>()
);
export const isOnFav = createAction(
  '[Home Page] addCity',
  props<{ id: string; }>()
);
export const removeFromFav = createAction(
  '[Home Page] addCity',
  props<{ id: string; }>()
);