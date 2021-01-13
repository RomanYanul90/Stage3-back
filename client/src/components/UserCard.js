import React from "react";

export const UserCard = ({user})=>{
    return(
        <div style={{border: "solid"}}>
            <p>User name: {user.userName}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}