import { useState } from "react";
import axios from "axios";
import { BASE_LINK } from "../utlis/constant";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {addUser} from "../utlis/userSlice"



const Login =()=>{
  const [emailId,setEmailId] = useState("tirtha123@gmail.com");
  const [password,setPassword] = useState("Tirtha@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleUserLogin = async function(){
       try{
          const userData = await axios.post(BASE_LINK+"/login",{
            email:emailId,
            password:password
          },{withCredentials:true});

         // console.log(userData);
          

          dispatch(addUser(userData.data));
          navigate("/");


       }catch(err){
         console.log("ERROR :"+err.message);
         
       }
   }

    return(
        <div className="h-[80vh] flex justify-center items-center">
           <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Login</h2>
              <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text">Email Id</span>
               </div>
               <input type="text" className="input input-bordered w-full max-w-xs"  value={emailId} onChange={(event)=>{
                setEmailId(event.target.value)
               }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text">Password</span>
               </div>
               <input type="text" className="input input-bordered w-full max-w-xs" value={password} onChange={(event)=>{
                setPassword(event.target.value)
               }}/>
             </label>
              <div className="card-actions justify-end">
      <          button className="btn btn-primary" onClick={handleUserLogin}>Submit</button>
              </div>
            </div>
          </div>                   
        </div>
    )
}

export default Login;