import { atom } from 'recoil'
import { RecoilRoot } from 'recoil'
import { localStorageService } from '@utils/localStorage.service'

export const getTheme = () => {
  const theme = localStorageService().get('THEME')
  if (theme === 'DARK') {
    document.documentElement.setAttribute('data-theme', 'DARK')
    return 'DARK'
  }
  // localStorage에 있는 값이 DARK가 아니라면, 모든 경우에도 LIGHT를 return 합니다.
  document.documentElement.setAttribute('data-theme', 'LIGHT')
  return 'LIGHT'
}

export const themeState = atom({
  key: 'themeState', // 전역적으로 고유한 값
  default: getTheme(), // 초깃값
})

// export const getDate = () => {
//   const date = localStorageService().get('DATE')
//   return date ? date : new Date()
// }

export const getPart = () => {
  const part = localStorageService().get('PART')
  return part
}

export const dateState = atom({
  key: 'dateState', // 전역적으로 고유한 값
  default: new Date(), // 초깃값
})

export const partState = atom({
  key: 'partState', // 전역적으로 고유한 값
  default: getPart(), // 초깃값
})

export function GlobalRecoilProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>
}
