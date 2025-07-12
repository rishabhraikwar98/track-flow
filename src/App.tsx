import { BrowserRouter as Router, Route,Routes  } from "react-router"
import Marketing from "./pages/Marketing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Project from "./pages/Project"
import NotFound from "./pages/NotFound"
import ProtectRoute from "./routes/ProtectRoute"
import { useEffect } from "react"
import { currentUser } from "./features/auth/authSlice"
import { useAppDispatch } from "./hooks/useRedux"
const App = () => {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(currentUser())
  },[currentUser])
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Marketing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route element={<ProtectRoute/>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard/:projectId" element = {<Project/>}/>
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

export default App