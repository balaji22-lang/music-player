import Callback from './pages/Callback'
import Home from './pages/Home'

function App() {
  const path = window.location.pathname

  if (path === '/callback') return <Callback />

  return <Home />
}

export default App
