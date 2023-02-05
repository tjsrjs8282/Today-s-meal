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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 오늘의 식단페이지 */}
          <Route path="/" element={<Intro />}></Route>
          <Route path="/start" element={<UserInfo />}></Route>
          <Route path="/purpose" element={<UserPurpose />}></Route>
          <Route path="/today" element={<FoodToday />}></Route>
          <Route path="/search" element={<FoodSearch />}></Route>
          <Route path="/today/detail" element={<FoodTodayDetail />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/foodDetail" element={<FoodDetail />}></Route>

          {/* 오늘의 운동페이지 */}
          <Route path="/health" element={<Health />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
