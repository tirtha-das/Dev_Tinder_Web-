import { useNavigate } from "react-router-dom";
import { BASE_LINK } from "../utlis/constant";
import axios from "axios";
import { removeUserFromFeed } from "../utlis/feedSlice";
import { useDispatch } from "react-redux";



const Usercard = ({userData})=>{
   const navigate = useNavigate();
   const dispatch = useDispatch();

  const sendRequest = async(status,id)=>{
    try{
      await axios.post(BASE_LINK+"/request/send/"+status+"/"+id,
        {},
        {withCredentials:true}
      )
      dispatch(removeUserFromFeed(id));

    }catch(err){
      console.log(err);
      navigate("/error");
      
    }
  }
  
  const {_id,fname,lname,photoURL,age,gender,about} = userData;
  const hideButton = (userData?.hideButton || 0)
 // console.log(fname);
  

    return (
        <div className="card bg-base-300 w-96 shadow-xl">
           <figure>
             <img
               src={photoURL}
               alt="Shoes" />
           </figure>
           <div className="card-body">
             <h2 className="card-title">{fname} {lname}</h2>
             {age && gender && <p className="capitalize">{age} , {gender}</p>}
             <p>{about}</p>
             {!hideButton && <div className="card-actions justify-center">
             <button className="btn btn-primary text-lg"
              onClick={()=>{
                sendRequest("ignored",_id);
              }}>Ignore</button>
               <button className="btn btn-secondary text-lg"
                onClick={()=>{
                  sendRequest("interested",_id);
                }}>Invite</button>
             </div>}
           </div>
         </div>        
    )
}

export default Usercard;