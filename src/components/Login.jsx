import { useState } from "react";
import axios from "axios";
import { BASE_LINK } from "../utlis/constant";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {addUser} from "../utlis/userSlice"



const Login =()=>{
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [isLoginForm,setIsLoginForm] = useState(true);
  const [showError,setShowError] = useState(false);
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleUserLogin = async function(){
       try{
          const userData = await axios.post(BASE_LINK+"/login",{
            email:emailId,
            password:password
          },{withCredentials:true});

         dispatch(addUser(userData.data));
         setError("");
         setShowError(false);
          navigate("/");
      }catch(err){
        //console.log(err);
        
         setError("ERROR : "+err.response.data);
         setShowError(true);
       }
   }

   const handleSignUp = async()=>{
     try{
      const user = await axios.post(BASE_LINK+"/signup",
        {
          fname:firstName,
          lname:lastName,
          email:emailId,
          password:password
        },
        {withCredentials:true})

        dispatch(addUser(user.data));
        setError("");
         setShowError(false);
        navigate("/profile");

     }catch(err){
      //console.log(err);
      
      setError("ERROR : "+err.response.data);
      setShowError(true);
     }
   }

    return(
        <div className="h-[80vh] flex justify-center items-center">
           <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{isLoginForm?"Login":"Sign Up"}</h2>
              {!isLoginForm && <><label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text">First Name</span>
               </div>
               <input type="text" className="input input-bordered w-full max-w-xs"  value={firstName} onChange={(event)=>{
                setFirstName(event.target.value)
               }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text">Last Name</span>
               </div>
               <input type="text" className="input input-bordered w-full max-w-xs"  value={lastName} onChange={(event)=>{
                setLastName(event.target.value)
               }}/>
             </label></>}
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
             {showError && <p className="text-red-600 text-left text-lg">{error}</p>}
              <div className="card-actions justify-center">
                 <button className="btn btn-primary" onClick={()=>{
                    return (isLoginForm)?handleUserLogin():handleSignUp();
                 }}>{isLoginForm?"Login":"Sign Up"}</button>
              </div>
              <p className="text-center cursor-pointer"
               onClick={()=>{
                setIsLoginForm(!isLoginForm);
                setShowError(false);
                setError("");
               }}>
              {isLoginForm?"New user? Click here to sign up":"Existing user? click here to login"}
            </p>
            </div>
           
          </div>                   
        </div>
    )
}

export default Login;