import { createAction, props } from '@ngrx/store';

export const getAllFav = createAction('[Counter Component] Reset');
export const isOnFav = createAction(
  '[Home Page] isOnFav',
  props<{ id: string; }>()
);
export const addToFav = createAction(
  '[Home Page] addToFav',
  props<{ id: string; name: string }>()
);
export const removeFromFav = createAction(
  '[Home Page] removeFromFav',
  props<{ id: string; }>()
);