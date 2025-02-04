import { io } from "socket.io-client";
import { BASE_LINK } from "./constant";

const createClientSocket = ()=>{
    if(location.hostname==="localhost"){
        return io(BASE_LINK);
    }else{
        return io("/",{path:"/api/socket.io"});
    }
    
}

export default createClientSocket;
