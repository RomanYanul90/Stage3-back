import React, {useContext, useState, useEffect, useCallback} from "react";
import {NavLink} from 'react-router-dom';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/httpHook";
import {selectId} from '../hooks/selectId';

export const Navbar = () => {
    const [user, setUser] = useState(null);
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const history = useHistory();

    let idFromAuth = undefined;
    if (auth.userId) {
        idFromAuth = auth.userId
    }

    const id = selectId(idFromAuth);

    const logoutHandler = (e) => {
        e.preventDefault();
        auth.logout();
        history.push('/')
    };

    const getUserName = useCallback(async () => {
        try {
            const user = await request(`/api/auth/user/${id}`, "GET", null, {Authorization: `Bearer ${auth.token}`});
            setUser(user.userName)
        } catch (e) {
        }
    }, [auth.token, request, id]);

    useEffect(() => {
        if (id) {
            getUserName()
        }
    }, [getUserName, id]);

    return (
        <header className='main-header'>
            <span className='header-title'>Stage 3</span>
            <nav className='header-navigation'>
                <ul>
                    <li><NavLink to='/createAdvert'>Create</NavLink></li>
                    <li><NavLink to='/userAdverts'>My adverts</NavLink></li>
                    <li><NavLink to='/allAdverts'>All adverts</NavLink></li>
                    <li><NavLink to='/usersList'>All users</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Log out</a></li>
                </ul>
                <p className='header-user-lable'>
                    User:
                    <NavLink className='header-userPage-link' to={`/userPage/${id}`}>
                        {user}
                    </NavLink>
                </p>
            </nav>
        </header>

    )
};