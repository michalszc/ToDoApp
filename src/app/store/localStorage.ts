import { changeTheme } from './theme';

export const saveState = (state: any) =>
{ 
  try
  {
    const { board, theme } = state;
    const serializedState = JSON.stringify({board});
    localStorage.setItem('state', serializedState);
    localStorage.setItem('color-theme', theme.mode);
  }
  catch(error)
  {
    console.error(`saveState Error ${error}`);
  }
};


const getInitialTheme = (): 'light' | 'dark' => {
      const storedPrefs = localStorage.getItem('color-theme');
      if (typeof storedPrefs === 'string') {
          return storedPrefs === 'dark' ? 'dark' : 'light';
      }

      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
          return 'dark';
      }

 return 'light'
};

export const loadState = () =>
{
  try
  {
    const serializedState = localStorage.getItem('state');
    const theme = {mode: getInitialTheme()};
    changeTheme(theme.mode);
    if (serializedState === null)
        return {board: undefined, theme};
    const board = JSON.parse(serializedState);
    return { ...board, theme};
  }
  catch (error)
  {
    console.error(`loadState Error ${error}`);
    return undefined;
  }
};