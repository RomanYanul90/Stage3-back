import React, {useCallback, useContext} from 'react';
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const RemoveUserPage = () => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const userId = useParams().id;
    const history = useHistory();

    const removeUser = useCallback(async (e) => {
        e.preventDefault();

        try {
            await request(`/api/auth/deleteUser/${userId}`, "DELETE", null, {Authorization: `Bearer ${auth.token}`});
            auth.logout();
            history.push('/')
        } catch (e) {
        }
    }, [auth, history, userId, request]);

    return (
        <div>
            <button onClick={removeUser}>Remove</button>
        </div>
    )
};