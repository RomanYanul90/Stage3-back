import React from 'react'
import {UserCard} from "./UserCard";

export const UsersList = ({users}) => {

    if(!users.length){
        return <p>There is no adverts created by current user</p>
    }
    return (
        <div>
            {users.map((el, index) => {
                return <div key={el._id}>
                    <h2>{index + 1})</h2>
                    <UserCard user={el}/>
                </div>

            })}
        </div>
    )
}