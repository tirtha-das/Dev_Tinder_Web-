import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";




const Profile =()=>{
    const userData = useSelector((store)=>store.user);
        
    
    return (!userData)?(<div>loading</div>):(
               
       <EditProfile user={userData.data}/>
    )
}

export default Profile;