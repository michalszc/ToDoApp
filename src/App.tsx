import React from 'react';
import { Board } from './app/components/Board/Board';
import { changeTheme } from './app/store/theme';
import { setThemeMode, ThemeState } from './app/store/theme.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store/store';
import './css/tailwind.css';

interface HeaderProps{
  children: React.ReactNode
}

const Header = ({children}: HeaderProps) => {
  return(
    <header className='flex items-center justify-between bg-white dark:bg-[#181818] h-24 w-full  px-2.5 py-5 box-border'>
      {children}
    </header>
  )
}

interface AppNameProps{
  name: string
}

const AppName = ({name}: AppNameProps) => {
  return (
    <div className='text-4xl text-[#282c34] dark:text-[#FFFAFA]'> 
      {name}
    </div>
  )
}

interface ThemeModeProps{
  currentThemeMode: 'light'|'dark',
  onSetThemeMode: (theme: ThemeState) => void
}

const ThemeMode = ({currentThemeMode,onSetThemeMode}: ThemeModeProps) => {

  return (
    <button className='px-2 py-2 bg-[#282c34] dark:bg-[#FFFAFA] text-white dark:text-[#282c34] rounded-md' onClick={()=>{
      const newTheme: ThemeState = currentThemeMode === 'dark' ? {mode: 'light'} : {mode: 'dark'};
      changeTheme(newTheme.mode);
      onSetThemeMode(newTheme);
    }}>
      {
        currentThemeMode === 'dark' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        )
      }

    </button>
  )
}

function App() {

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <div>
      <Header>
        <AppName name='ToDo' />
        <ThemeMode currentThemeMode={themeMode} onSetThemeMode={ (theme: ThemeState)=> dispatch(setThemeMode(theme)) }/>
      </Header>
      <Board/>
    </div>
  )
}

export default App
