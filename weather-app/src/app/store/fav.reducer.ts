// // import { createReducer, on } from '@ngrx/store';
// // // import { increment, decrement, reset } from './counter.actions';

// // export const initialState = 0;

// // const _counterReducer = createReducer(initialState,
// // //   on(increment, state => state + 1),
// // //   on(decrement, state => state - 1),
// // //   on(reset, state => 0),
// // );

// // export function counterReducer(state, action) {
// //   return _counterReducer(state, action);
// // }

import { Action, createReducer, on } from '@ngrx/store';
import * as FavActions from './fav.actions';

export interface info {
    id: string;
    city: string;
    weatherText: string;
    temCelsius: string;
    temFahrenheit: string;
}

export interface State {
    cityList: info[];
}

export const initialState: State = {
    cityList: []
};

const scoreboardReducer = createReducer(
    initialState,
    // on(FavActions.addToFav, state => ({ ...state, home: state.home + 1 })),
    // on(FavActions.removeFromFav, state => ({ home: 0, away: 0 })),
    // on(FavActions.getAllFav, (state, { game }) => ({ home: game.home, away: game.away }))
);

export function favReducer(state: State | undefined, action: Action) {
    return scoreboardReducer(state, action);
}