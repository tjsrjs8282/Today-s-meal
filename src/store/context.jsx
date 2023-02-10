import { createContext, useReducer } from 'react'

const initialTheme = 'dark'

function themeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')
      if (systemPreference.matches) {
        return 'dark'
      }
      return 'light'
    case 'DARK':
      return 'dark'
    case 'LIGHT':
      return 'light'
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}
export const ThemeContext = createContext()
export const ThemeDispatchContext = createContext()

export function GlobalContextProvider({ children }) {
  const [theme, themeDispatch] = useReducer(themeReducer, initialTheme)

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={themeDispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  )
}
