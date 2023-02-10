import { atom } from 'recoil'
import { RecoilRoot } from 'recoil'

export const getTheme = () => {
  const theme = localStorage.getItem('THEME')
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

export function GlobalRecoilProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>
}
