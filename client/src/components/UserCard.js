import React, {useState} from "react";
import {ChoosenUserAdverts} from './ChoosenUserAdverts'

export const UserCard = ({user}) => {
    const [showAdverts, setShowAdvert] = useState(false)
    const showHandler = () => {
        setShowAdvert(!showAdverts)
    }
    return (
        <div >
            <div style={{border: "solid"}}>
                <div >
                    <p>User name: {user.userName}</p>
                    <p>Email: {user.email}</p>
                </div>
                <button onClick={showHandler}>Show adverts creates by this user</button>

            </div>
            {showAdverts && <ChoosenUserAdverts ownerName={user.userName}/> }
        </div>
    )
}