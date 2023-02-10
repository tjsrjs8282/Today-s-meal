import { GlobalRecoilProvider } from '@store'
import Layout from '@layout'

function App() {
  return (
    <GlobalRecoilProvider>
      <div className="App">
        <Layout />
      </div>
    </GlobalRecoilProvider>
  )
}

export default App
