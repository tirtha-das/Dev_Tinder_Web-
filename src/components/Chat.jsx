import { useParams} from "react-router-dom";
import { useEffect,useState } from "react";
import createClientSocket from "../utlis/socket";
import { useSelector } from "react-redux";
import { BASE_LINK } from "../utlis/constant";
import axios from "axios";


const Chat = ()=>{

    const {targetUserId} = useParams();
    const user = useSelector((store)=>store.user);
    const userId = user?.data?._id;
    const firstName = user?.data?.fname;
    const [newMessage,setNewMessage] = useState("");
    const [messages,setMessages] = useState([]);

    const getPreviousMessage = async(toUserId)=>{
       const data = await axios.get(BASE_LINK+"/chat/"+toUserId,{withCredentials:true});
      // console.log(data.data.data);
       
        setMessages(data?.data?.data);
      //  console.log(messages);
       
    }

   useEffect(()=>{
     getPreviousMessage(targetUserId);
   },[])
    

    useEffect(()=>{
        if(!userId){
            return ;
        }
        
        const socket = createClientSocket();
        socket.emit("joinChat",{userId,targetUserId});

        socket.on("messageReceived",({firstName,text,userId})=>{
           // console.log(firstName+" : "+text+" "+userId);
            
           // const allMessage = [...messages,{firstName,text}];
            setMessages((messages)=>[...messages,{firstName,text,userId}]);
           // console.log(""allMessage);
            
            //console.log(messages);
            
        });
        


      return ()=>{
        socket.disconnect();
      }
    },[userId,targetUserId])

    const sendNewMessage=()=>{
       const socket = createClientSocket();
       socket.emit("sendMessage",{
        firstName,
        userId,
        targetUserId,
        text:newMessage
       })

       setNewMessage("");

       

    }

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.length && messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`chat ${msg?.userId !== userId ? "chat-start" : "chat-end"}`}

            >
              <div className="chat-header">
                {`${msg.firstName}`}
                <time className="text-xs opacity-50"> 2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button onClick={sendNewMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
    )
}

export default Chat;