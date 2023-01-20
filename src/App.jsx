import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from '@pages/Intro'
import UserInfo from '@pages/UserInfo'
import UserPurpose from '@pages/UserPurpose'
import FoodToday from '@pages/FoodToday'
import Search from '@pages/Search'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />}></Route>
          <Route path="/start" element={<UserInfo />}></Route>
          <Route path="/purpose" element={<UserPurpose />}></Route>
          <Route path="/today" element={<FoodToday />}></Route>
          <Route path="/search" element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
