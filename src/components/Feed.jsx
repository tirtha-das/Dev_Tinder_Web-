import Usercard from "./Usercard";
import {useNavigate} from "react-router-dom";
import {BASE_LINK} from "../utlis/constant"
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {addFeed} from "../utlis/feedSlice";



const Feed =()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allUserdata = useSelector((store)=>store.feed);

    const getFeedUsers = async()=>{
        try{
          const feedData = await axios.get(BASE_LINK+"/user/feed",{withCredentials:true});
          //console.log(feedData.data.data);
          dispatch(addFeed(feedData.data.data));
          
        }catch(err){
            console.log(err);
            if(err.response.status===401){
                navigate("/login");
            }
            else{
            navigate("/error");
            }
            
        }
    }

    useEffect(()=>{
        getFeedUsers();
    },[])

    if(!allUserdata){
        return (<div className="text-center my-10">
            <h1 className="font-bold text-3xl">Feed is loading</h1>
            </div>)
    }
    
    return (allUserdata.length===0)?
    (<div className="text-center my-10">
        <h1 className="font-bold text-3xl">Feed is Empty</h1>
        </div>)
    :( 
        <div className="flex justify-center my-10">
           <Usercard userData={allUserdata[0]}/>
        </div>
    )
}

export default Feed;
