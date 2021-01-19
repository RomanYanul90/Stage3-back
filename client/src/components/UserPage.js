import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {Link} from "react-router-dom";

export const UserPage = () => {
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [user, setUser] = useState(null);
    const userId = useParams().id;

    const getUser = useCallback(async () => {
        try {
            const result = await request(`/api/auth/user/${userId}`, "GET", null, {Authorization: `Bearer ${token}`});
            setUser(result)
        } catch (e) {
        }
    }, [token, userId, request]);

    useEffect(() => {
        getUser()
    }, [getUser]);

    if (loading) {
        return <LoadingPage/>
    }
    return (
        <div>
            {user &&
            <div>
                <p>User name: {user.userName}</p>
                <p>First name: {user.firstName}</p>
                <p>Last name: {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Phone number: {user.phone}</p>
                <Link to={`/editUser/${user._id}`}>
                    <button>Edit</button>
                </Link>
                <Link to={`/deleteUser/${user._id}`}>
                    <button>Remove</button>
                </Link>
            </div>
            }
        </div>
    )
};