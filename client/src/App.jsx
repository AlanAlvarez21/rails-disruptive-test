import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar, AppRoutes } from './components'

function App() {
  return (
    <Router>
      <div className='app'>
        <NavBar />
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App
