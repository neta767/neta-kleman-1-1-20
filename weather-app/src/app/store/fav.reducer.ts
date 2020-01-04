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
import * as CounterActions from './fav.actions';

export interface State {
  home: number;
  away: number;
}

export const initialState: State = {
    home: 0,
    away: 0,
  };

  const scoreboardReducer = createReducer(
    initialState,
    on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 })),
    on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
    on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
    on(ScoreboardPageActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
  );
  
  export function reducer(state: State | undefined, action: Action) {
    return scoreboardReducer(state, action);
  }