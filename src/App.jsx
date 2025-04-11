import './App.css'
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom"
import Home from './pages'
import Dashboard from './pages/Dashboard'
import "bootstrap/dist/css/bootstrap.min.css"
import Courses from './pages/courses/Courses'
import AddCourse from './pages/courses/AddCourse'
import Profile from './pages/Profile'
import Login from './pages/auth/Login'
import { useContext, useEffect } from 'react'
import AuthContext from './context/AuthContext'
import EditCourse from './pages/courses/EditCourse'

function App() {
  const {user, loading} = useContext(AuthContext)

  const PublicRoute = ({children}) => {
    const navigate = useNavigate()
    useEffect(() => {
      if(!loading && user) {
        navigate("/dashboard")
      }
    }, [user, loading, navigate])
    return user ? null : children
  }
  
  if(loading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
    
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        {/* <Route element={<ProtectedRoute/>}> */}
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/dashboard/courses' element={<Courses/>}/>
            <Route path='/dashboard/courses/add' element={<AddCourse/>}/>
            <Route path='/dashboard/profile' element={<Profile/>}/>
            <Route path="/dashboard/courses/edit/:id" element={<EditCourse />} />

        {/* </Route> */}
        
        <Route path='/login' element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }/>
      </Routes>
    </Router>
    </>
   
  )
}

export default App
