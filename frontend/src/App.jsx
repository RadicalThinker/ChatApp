import { useEffect, } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { useThemeStore } from './store/useThemeStore'

function App() {

  const {authuser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()
  const {theme}=useThemeStore();
  console.log("onlineUsers",onlineUsers);
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log(authuser);

  if(isCheckingAuth && !authuser)
    return (
        <div className='flex items-center justify-center h-screen' >
          <Loader className='size-10 animate-spin'/>
        </div>
    )
  return (
    <div data-theme={theme} className="App">
      <Navbar/>

      <Routes>

        <Route path="/" element={authuser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={authuser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={authuser ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="/profile" element={authuser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={authuser ? <SettingsPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
