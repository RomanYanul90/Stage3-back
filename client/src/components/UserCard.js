import React, {useState} from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {ChoosenUserAdverts} from './ChoosenUserAdverts'

export const UserCard = ({user}) => {
    const [showAdverts, setShowAdvert] = useState(false)
    const showHandler = () => {
        setShowAdvert(!showAdverts)
    }
    return (
        <div onClick={showHandler}>
            <div style={{border: "solid"}}>
                <p>User name: {user.userName}</p>
                <p>Email: {user.email}</p>
            </div>
            {showAdverts == true ? <ChoosenUserAdverts ownerName={user.userName}/> : <p>false</p>}
        </div>
    )
}