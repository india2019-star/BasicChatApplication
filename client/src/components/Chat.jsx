import React  from "react";
import ScrollDown from "react-scroll-to-bottom";



function Chat(props)
{

    const [currentmessage, updatemessage] = React.useState();
    const [messageList, updatelist] = React.useState([]);

    function handlechange(event)
    {
        updatemessage(event.target.value);
    }

    async function sendMessage()
    {
        if(currentmessage !== "" && props.roomid !== "" && props.username !== "")
        {
            const smsdata ={
                room: props.roomid,
                message: currentmessage,
                sendername: props.username,
                time: new Date(Date.now()).getHours() + " " + new Date(Date.now()).getMinutes()
            };
            await props.socket.emit("send_message",smsdata);
            updatelist(function(prevValue)
            {
                return [...prevValue,smsdata];
            });
            updatemessage("");
        }
        else 
        {
            alert("Type something to send or room or username cannot be empty");
        }
    }

    React.useEffect(function()
    {
        props.socket.on("receive_message",function(data)
        {
            updatelist(function(prevValue)
            {
                return [...prevValue,data];
            });
        });
    },[props.socket]);


    return(<div className="chat-window">
            <div className="chat-header"><p>Live Chat</p></div>
            
            <div className="chat-body">
            <ScrollDown className="message-container">
            {messageList.map(function (val)
                {
                  return <div className="message" id={props.username === val.sendername ?"you":"other"}>
                    <div>
                        <div className="message-content"><p>{val.message}</p></div>
                        <div className="message-meta">
                        <p id="time">{val.time}</p>
                        <p id="author">{val.sendername}</p></div>
                    </div>
                  </div>  
                })}
                </ScrollDown>
                </div>
                
            <div className="chat-footer">
                <input onChange={handlechange} type="text" placeholder="Start typing..." value ={currentmessage} onKeyPress={function(event)
                {
                    if(event.key === "Enter")
                    {
                        sendMessage();
                    }
                } }/>
                <button className="arrowbutton" onClick={sendMessage}>&#9658;</button>
            </div>
        </div>);
}

export default Chat;