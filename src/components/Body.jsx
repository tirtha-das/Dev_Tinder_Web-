import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_LINK } from "../utlis/constant";
import { addUser } from "../utlis/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Body = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkUserLoggedIn = async function(){
        try{
            const userData = await axios.get(BASE_LINK+"/profile/view",{withCredentials:true});
           dispatch(addUser(userData.data));
           navigate("/");
         }catch(err){
           
            if(err.response.status===401){
                navigate("/login");
            }
            
           else navigate("/error");
            
        }
        
    }

    useEffect(()=>{
        
            checkUserLoggedIn();
       
    },[])

    return (<div>
            <Navbar/>
            <Outlet/>
            <Footer/>
         </div>)
            
}

export default Body;