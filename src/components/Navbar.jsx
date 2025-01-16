import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../utlis/userSlice";
import { BASE_LINK } from "../utlis/constant";
import { useNavigate ,Link} from "react-router-dom";






const Navbar = ()=>{


   const userInfo = useSelector((store)=>(store.user));
   const dispatch = useDispatch();
   const navigate = useNavigate();
    //console.log(userInfo);
    const handleLogout = async()=>{
     
      try{
       const data = await axios.post(BASE_LINK+"/logout",{},{withCredentials:true});
       console.log(data);
       dispatch(removeUser());
       navigate("/login");
        
      }catch(err){
       console.log(err);
       
      }
   }
    
    
   
   
   

  return(
    <div className="navbar bg-base-300">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">DevTinder</a>
  </div>
  <div className="flex-none gap-2">
    
  { userInfo && <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex w-56 justify-around px-2">
        <span>Welcome, {userInfo.data.fname}</span>
        <div className="w-10 rounded-full">
         {userInfo.data.photoURL && <img
            alt="Tailwind CSS Navbar component"
            src={userInfo.data.photoURL} />}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
           
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>}
  </div>
</div> 
  )
}

export default Navbar;