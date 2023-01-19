import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from '@pages/Intro'
import UserInfo from '@pages/UserInfo'
import UserPurpose from '@pages/UserPurpose'
import Search from '@pages/Search'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />}></Route>
          <Route path="/start" element={<UserInfo />}></Route>
          <Route path="/purpose" element={<UserPurpose />}></Route>
          <Route path="/search" element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
