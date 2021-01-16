import React, {useContext,useState,useEffect,useCallback} from "react";
import {NavLink} from 'react-router-dom';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/httpHook";


export const Navbar = () => {
    const [user, setUser] = useState(null)

    const auth = useContext(AuthContext)
    let userId = undefined
    if(auth.userId){
        userId = auth.userId
    }
    // console.log(userId)

    const {request} = useHttp()

    const selectId = (id) => {
        if (typeof (id) === "string") {
            return id
        }
        if (typeof (id) === "object") {
            const newId = id.userId
            return selectId(newId)
        }
    }
    const id = selectId(userId)
    // console.log(id)
    const history = useHistory()
    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

    const getUserName = useCallback(async ()=>{
        try{
            const user = await request(`/api/auth/user/${id}`, "GET",null, {Authorization: `Bearer ${auth.token}`})
            // console.log(user)
            setUser(user.userName)
        }catch (e){
        }
    },[request,id])

    useEffect(() => {
        if(id){getUserName()}
    }, [getUserName])

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
            <p>User name: {user}</p>
        </nav>
    )
}