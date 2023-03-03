import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from '@pages/Intro'
import UserInfo from '@pages/UserInfo'
import UserPurpose from '@pages/UserPurpose'
import FoodToday from '@pages/FoodToday'
import FoodSearch from '@pages/FoodSearch'
import FoodTodayDetail from '@pages/FoodTodayDetail'
import Product from '@pages/Product'
import FoodDetail from '@pages/FoodDetail'
import Health from '@pages/Health'
import HealthAdd from '@pages/HealthAdd'
import { themeState } from '@store'
import { useRecoilState } from 'recoil'
import MyPage from '@pages/MyPage'

export default function Layout() {
  const [theme, setTheme] = useRecoilState(themeState)
  const ThemeMatchMedia = () => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')
    if (systemPreference.matches) {
      document.documentElement.setAttribute('data-theme', 'DARK')
      setTheme('DARK')
      return
    }
    document.documentElement.setAttribute('data-theme', 'LIGHT')
    setTheme('LIGHT')
  }

  useEffect(() => {
    ThemeMatchMedia()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        {/* 오늘의 식단페이지 */}
        <Route path="/" element={<Intro />}></Route>
        <Route path="/start" element={<UserInfo />}></Route>
        <Route path="/purpose" element={<UserPurpose />}></Route>
        <Route path="/today" element={<FoodToday />}></Route>
        <Route path="/search/" element={<FoodSearch />}></Route>
        <Route path="/search/:id" element={<FoodDetail />}></Route>
        <Route path="/today/detail" element={<FoodTodayDetail />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/product" element={<Product />}></Route>
        {/* 오늘의 운동페이지 */}
        <Route path="/health" element={<Health />}></Route>
        <Route path="/health/add" element={<HealthAdd />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
