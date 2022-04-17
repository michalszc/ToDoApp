import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
  mode: 'light' | 'dark'
}

const initialState: ThemeState = {
    mode: 'light'
}

export const slice = createSlice({
  name: 'Theme',
  initialState,
  reducers: {
    setThemeMode: (state: ThemeState, action:PayloadAction<ThemeState>) => {
      state.mode = action.payload.mode
    }
  }
})

export const { setThemeMode } = slice.actions;

export default slice.reducer;