import { useState } from "react";
import Usercard from "./Usercard";
import axios from "axios";
import { BASE_LINK } from "../utlis/constant";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utlis/userSlice";


const EditProfile = ({user})=>{
   
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName,setFirstName] = useState(user.fname);
    const [lastName,setLastName] = useState(user.lname);
    const [age,setAge] = useState(user?.age||"");
    const [gender,setGender] = useState(user?.gender||"");
    const [about,setAbout] = useState(user?.about||"");
    const [photoURL,setPhotoURL] = useState(user.photoURL);
    const [showToast,setShowToast] = useState(0);

   
   const updatedUser = {
   fname: firstName,
   lname:lastName,
   age:age,
   gender:gender,
   about:about,
   photoURL: photoURL,
   hideButton:1
  }

  const handleUpdateUser = async()=>{
    try{
        const res = await axios.patch(BASE_LINK+"/profile/update",
            {  fname:firstName,
               lname: lastName,
                age,
                gender,
                about,
                photoURL,
           },{withCredentials:true});

           dispatch(addUser(res.data));
           setShowToast(1);
           setTimeout(()=>{
              setShowToast(0);
           },2000)
    }
    catch(err){
        console.log(err.message);
        
        navigate("/error");
    }


  }
   

    return(
        <>
        <div className="flex justify-center my-10">
           <div className="card bg-base-300 w-96 shadow-xl mx-10">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                   </div>
                  <input type="text"  className="input input-bordered w-full max-w-xs" value={firstName} 
                   onChange={(event)=>{
                      setFirstName(event.target.value);
                   }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                   </div>
                  <input type="text" className="input input-bordered w-full max-w-xs" value={lastName} 
                   onChange={(event)=>{
                      setLastName(event.target.value);
                   }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                   </div>
                  <input type="text" className="input input-bordered w-full max-w-xs" value={age} 
                   onChange={(event)=>{
                      setAge(event.target.value);
                   }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                   </div>
                  <input type="text" className="input input-bordered w-full max-w-xs" value={gender} 
                   onChange={(event)=>{
                      setGender(event.target.value);
                   }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo-URL</span>
                   </div>
                  <input type="text" className="input input-bordered w-full max-w-xs" value={photoURL} 
                   onChange={(event)=>{
                      setPhotoURL(event.target.value);
                   }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                   </div>
                  <input type="text" className="input input-bordered w-full max-w-xs" value={about} 
                   onChange={(event)=>{
                      setAbout(event.target.value);
                   }}/>
             </label>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={handleUpdateUser}>Update</button>
              </div>
            </div>
          </div> 
          <Usercard userData={updatedUser}/>
          </div>  
           {showToast && <div className="toast toast-top toast-center">
            <div className="alert alert-info">
              <span>Profile is successfully updated</span>
            </div>
            </div>}          
          </>
    )
}

export default EditProfile;