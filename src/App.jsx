import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from '@pages/Intro'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
