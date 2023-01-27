import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from '@pages/Intro'
import UserInfo from '@pages/UserInfo'
import UserPurpose from '@pages/UserPurpose'
import FoodToday from '@pages/FoodToday'
import FoodSearch from '@pages/FoodSearch'
import FoodTodayDetail from '@pages/FoodTodayDetail'
import Product from '@pages/Product'
import FoodDetail from '@pages/FoodDetail'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />}></Route>
          <Route path="/start" element={<UserInfo />}></Route>
          <Route path="/purpose" element={<UserPurpose />}></Route>
          <Route path="/today" element={<FoodToday />}></Route>
          <Route path="/search" element={<FoodSearch />}></Route>
          <Route path="/today/detail" element={<FoodTodayDetail />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/foodDetail" element={<FoodDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
