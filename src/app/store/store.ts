import { configureStore } from '@reduxjs/toolkit';
import boardReducer, { BoardSliceState } from './board.slice';
import themeReducer, { ThemeState } from './theme.slice';
import { saveState, loadState } from './localStorage';
import { changeTheme } from './theme';
import * as _ from "lodash";

export interface RootState {
  board: BoardSliceState,
  theme: ThemeState
}

const store = configureStore<RootState>({
  reducer: {
    board: boardReducer,
    theme: themeReducer
  },
  preloadedState: loadState(),
});

store.subscribe(
  _.throttle( () => saveState(store.getState()), 1000)
);

export default store;