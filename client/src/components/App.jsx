import React from "react";
import Input from "./Input";
import io from "socket.io-client";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001");

function App()
{

    const [nameandroomid, updatenameandroomid] = React.useState({
        name: "",
        roomid: ""
    });
    const[showchat, updateshowchat] = React.useState(false);

    function handlechange(event)
    {
        var nametapped = event.target.name;
        var newtext = event.target.value;


        updatenameandroomid(function(prevValue)
        {
            if(nametapped === "username")
            {
                return {
                    name: newtext,
                    roomid: prevValue.roomid
                };
            }
            else if (nametapped === "room")
            {
                return {
                    name: prevValue.name,
                    roomid: newtext
                };
            }

        });
    }

    function joinRoom()
    {
        if(nameandroomid.name !== "" && nameandroomid.roomid !== "")
        {
            socket.emit("join_room",nameandroomid.roomid);
            updateshowchat(true);
        }
        else 
        {
            alert("Fields cannot be empty!!!!");
        }
    }




    return (<div className="App">
    {showchat === false?
    (<div className="joinChatContainer">
        <h3>Join A Chat</h3>
            <Input onchanging = {handlechange} type="text" name= "username" placeholder="Enter your name"/>
            <Input onchanging = {handlechange} type="text" name= "room" placeholder="Room ID.."/>
            <button className="Joinbutton" onClick={joinRoom}>Join</button>
        </div>)
        :
        (<div className="chats">
            <Chat socket={socket} username={nameandroomid.name} roomid={nameandroomid.roomid}/>
        </div>) 
    }
        </div>);
}

export default App;