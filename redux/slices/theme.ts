import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO
// implement in app

// eslint-disable-next-line @typescript-eslint/naming-convention
enum THEME_MODES {
  DARK = 'dark',
  LIGHT = 'light',
}

interface ThemeSlice {
  mode: THEME_MODES;
}

interface StateProps {
  theme: ThemeSlice;
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: THEME_MODES.DARK,
  },
  reducers: {
    toggleTheme: state => {
      state.mode = state.mode === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK;
      sessionStorage.setItem('theme', state.mode === THEME_MODES.LIGHT ? THEME_MODES.LIGHT : THEME_MODES.DARK);
    },
    setTheme: (state, action: PayloadAction<THEME_MODES>) => {
      state.mode = action.payload;
    },
  },
});

export const selectTheme = (state: StateProps) => state.theme.mode;

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
