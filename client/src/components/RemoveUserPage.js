import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useParams} from "react-router-dom";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {AdvertCard} from "./AdvertCard";
import {useHistory} from "react-router-dom";


export const RemoveUserPage = () => {
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const userId = useParams().id
    const history = useHistory()
    let check = false

    const removeUser = useCallback(async (e) => {
        e.preventDefault()

        try {
            const result = await request(`/api/auth/deleteUser/${userId}`, "DELETE", null, {Authorization: `Bearer ${auth.token}`})
            
                auth.logout()
                history.push('/')
        } catch (e) {
        }
    }, [auth.token, userId, request])

    return (
        <div>

            <button onClick={removeUser}>Remove</button>
        </div>
    )
}