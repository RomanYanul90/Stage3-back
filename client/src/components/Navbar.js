import React, {useContext} from "react";
import {NavLink} from 'react-router-dom';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {

    const auth = useContext(AuthContext)
    const userId = auth.userId
    // console.log(userId)
    const selectId = (id) => {
        if (typeof (id) === "string") {
            return id
        }
        if (typeof (id) === "object") {
            const newId = id.userId
            return selectId(newId)
        }
    }
    const history = useHistory()
    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <span>Stage 3</span>
            <ul>
                <li><NavLink to='/createAdvert'>Create</NavLink></li>
                <li><NavLink to='/userAdverts'>My adverts</NavLink></li>
                <li><NavLink to='/allAdverts'>All adverts</NavLink></li>
                <li><NavLink to='/usersList'>All users</NavLink></li>
                <li><a href='/' onClick={logoutHandler}>Log out</a></li>
            </ul>
            {userId && <p>User ID: {selectId(userId)}</p>}
        </nav>
    )
}