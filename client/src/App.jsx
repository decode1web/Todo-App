import { BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import './App.css'
import { Provider } from 'react-redux'
import store from './Redux/store'
// import 'materialize-css'
// import 'materialize-css/dist/css/materialize.min.css'

function App() {
  const {login, logout, token, userId} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuth
    }}>
      <Provider store={store}>
        <Router>
          {isAuth && <Navbar />}
          <div className='wrapper'>
            {routes}
          </div>
        </Router>
      </Provider>
    </AuthContext.Provider>
  )
}

export default App
