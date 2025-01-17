import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_LINK } from "../utlis/constant";
import { useEffect } from "react";
import { addRequests, removeRequest } from "../utlis/requestSlice";
import { useSelector } from "react-redux";


const PendingRequest = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests);

    const getRequests = async()=>{
        try{
            const userData = await axios.get(BASE_LINK+"/user/request/received",{withCredentials:true});
           dispatch(addRequests(userData?.data?.data||null));
           
            
        }catch(err){
          console.log(err);
          navigate("/error");
          
        }
    }

    const handleReviewRequest = async(status,id)=>{
        try{
            await axios.patch(BASE_LINK+"/request/review/"+status+"/"+id,
                {},
                {withCredentials:true}
              )

              dispatch(removeRequest(id));

        }catch(err){
            console.log(err);
            navigate("/error");
            
        }
 }

    useEffect(()=>{
        getRequests();
    },[])

    if(!requests) return (<></>);
    if(requests.length === 0){
     return (<div>
         <h1 className="my-10 font-bold text-xl text-center">No Pending Request</h1>
     </div>)
    }
 
     return (
         <div>
              <h1 className="mt-10 mb-5 font-bold text-3xl text-center">Pending Request</h1>
              <div className="flex flex-col items-center">
                 {
                     requests.map((request)=>{
                         const {fname,lname,photoURL,about,_id} = request;
                         return (
                             <div key={_id} className="bg-base-300 p-4 m-2 flex items-center rounded-lg justify-between">
                             <div className="mr-3">
                                <img src={photoURL} alt="userPhoto"
                                className="w-20 h-20 rounded-full"></img>
                                </div>
                            <div>
                                <h1 className="font-bold text-xl">{fname+" "+lname}</h1>
                                <p>{about}</p>
                            </div>
                            <div className="mx-2">
                            <button className="btn btn-active btn-primary mx-2"
                            onClick={()=>{
                                handleReviewRequest("rejected",_id);
                            }}
                            >Reject</button>
                            <button className="btn btn-active btn-secondary"
                            onClick={()=>{
                                handleReviewRequest("accepted",_id);
                            }}
                            >Accept</button>
                            </div>
                         </div>
                         ) 
                     })
                 }
              
              </div>
         </div>
     )
 }
 


export default PendingRequest;