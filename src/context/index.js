import { createContext, useReducer } from 'react'

const initialTheme = 'dark'

export const ThemeContext = createContext()
export const ThemeDispatchContext = createContext()

function themeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state === 'light' ? 'dark' : 'light'
    case 'DARK':
      return 'dark'
    case 'LIGHT':
      return 'light'
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

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
