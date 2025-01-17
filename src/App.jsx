import Body from "./components/Body"
import Login from "./components/login"
import Profile from "./components/Profile"
import Error from "./components/Error"
import Feed from "./components/Feed"
import { BrowserRouter ,Routes,Route} from "react-router-dom"
import appStore from "./utlis/appStore"
import { Provider } from "react-redux"
import Friends from "./components/Friends"
import PendingRequest from "./components/PendingRequest"


function App() {
  

  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
           <Route path="/" element={<Feed/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/profile" element={<Profile/>}/>
           <Route path="/error" element={<Error/>}></Route>
           <Route path="/connections" element={<Friends/>}/>
         <Route path="/review/request" element={<PendingRequest/>}/> 

        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
     
    
    
    
  )
}

export default App
