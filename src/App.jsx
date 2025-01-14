import Body from "./components/Body"
import Login from "./components/login"
import Profile from "./components/Profile"
import Feed from "./components/Feed"
import { BrowserRouter ,Routes,Route} from "react-router-dom"


function App() {
  

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
           <Route path="/" element={<Feed/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/profile" element={<Profile/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
     
    
    
    
  )
}

export default App
