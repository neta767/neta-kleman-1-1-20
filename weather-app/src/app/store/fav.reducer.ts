// import { Action, createReducer, on } from '@ngrx/store';
// import * as FavActions from './fav.actions';

// export interface info {
//     id: string;
//     city: string;
//     weatherText: string;
//     temCelsius: string;
//     temFahrenheit: string;
// }

// export interface State {
//     cityList: info[];
// }

// export const initialState: State = {
//     cityList: []
// };

// const scoreboardReducer = createReducer(
//     initialState,
//     // on(FavActions.addToFav, state => ({ ...state, home: state.home + 1 })),
//     // on(FavActions.removeFromFav, state => ({ home: 0, away: 0 })),
//     // on(FavActions.getAllFav, (state, { game }) => ({ home: game.home, away: game.away }))
// );

// export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
//     return cityLi;
//   });


// export function favReducer(state: State | undefined, action: Action) {
//     return scoreboardReducer(state, action);
// }



import { ActionsUnion, ActionTypes } from './fav.actions';
    
export const initialState = {
//   items: [],
  fav: []
};

export function favReducer(state = initialState, action: ActionsUnion) {
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      return {
        ...state,
        fav: [...action.payload]
      };

    case ActionTypes.Add:
      return {
        ...state,
        fav: [...state.fav, action.payload]
      };

    case ActionTypes.Remove:
      return {
        ...state,
        fav: [...state.fav.filter(item => item.id !== action.payload.id)]
      };

    default:
      return state;
  }
}