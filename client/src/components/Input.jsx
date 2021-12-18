import React from "react";


function Input(props)
{
    return (<input onChange={props.onchanging} type= {props.type} name= {props.name} placeholder= {props.placeholder} />);
}

export default Input;