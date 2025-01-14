import { useSelector } from "react-redux";





const Navbar = ()=>{
   const userInfo = useSelector((store)=>(store.user));
   let userPhoto = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg";
   if(userInfo){
    
    if(userInfo.data.photoURL !== undefined){
      userPhoto = userInfo.data.photoURL;
    }
   }
   
   

  return(
    <div className="navbar bg-base-300">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none gap-2">
    
    <div className="dropdown dropdown-end">
    { userInfo &&<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex w-56 justify-around px-2">
        <span>Welcome, {userInfo.data.fname}</span>
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={userPhoto} />
        </div>
      </div>}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div> 
  )
}

export default Navbar;