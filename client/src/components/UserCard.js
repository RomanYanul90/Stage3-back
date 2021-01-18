import React, {useState} from "react";
import {ChoosenUserAdverts} from './ChoosenUserAdverts'

export const UserCard = ({user}) => {
    const [showAdverts, setShowAdvert] = useState(false)
    const showHandler = () => {
        setShowAdvert(!showAdverts)
    }
    return (
        <div >
            <div className='user-card'>
                <div >
                    <p>User name: {user.userName}</p>
                    <p>Email: {user.email}</p>
                </div>
                <button className='btn' onClick={showHandler}>Show adverts created by this user</button>
            </div>
            {showAdverts && <ChoosenUserAdverts ownerName={user.userName}/> }
        </div>
    )
}