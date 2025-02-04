import { useNavigate,Link } from "react-router-dom";
import { BASE_LINK } from "../utlis/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utlis/connectionsSlice";


const Friends = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const connections = useSelector((store)=>store.connections);

    const getConnections = async()=>{
        try{
            const userData = await axios.get(BASE_LINK+"/user/connections",{withCredentials:true});

            dispatch(addConnections(userData?.data?.data)||null);
            
        }catch(err){
          console.log(err);
          navigate("/error");
          
        }
 }

   useEffect(()=>{
    getConnections();
   },[])
     
   if(!connections) return (<></>);
   if(connections.length === 0){
    return (<div>
        <h1 className="my-10 font-bold text-xl text-center">Friend List is empty</h1>
    </div>)
   }

    return (
        <div>
             <h1 className="mt-10 mb-5 font-bold text-3xl text-center">Friends</h1>
             <div className="flex flex-col items-center">
                {
                    connections.map((connection)=>{
                        const {fname,lname,photoURL,about,_id} = connection;
                        return (
                            <div key={_id} className="bg-base-300 p-4 m-2 flex items-center rounded-lg justify-between w-1/3">
                            <div className="mr-3">
                               <img src={photoURL} alt="userPhoto"
                               className="w-20 h-20 rounded-full"></img>
                               </div>
                           <div>
                               <h1 className="font-bold text-xl">{fname+" "+lname}</h1>
                               <p>{about}</p>
                           </div>
                           <div>
                          <Link to={"/chat/"+_id}> 
                          <button className="btn btn-accent">Chat</button>
                          </Link>
                           </div>
                        </div>
                        ) 
                    })
                }
             
             </div>
        </div>
    )
}

export default Friends;