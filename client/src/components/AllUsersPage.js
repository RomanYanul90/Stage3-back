import React, {useState, useContext, useEffect, useCallback} from 'react'
import {useAuth} from "../hooks/authHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {useHttp} from "../hooks/httpHook";
import {UsersList} from "./UsersList";

export const AllUsersPage = () => {
    const [users, setUsers] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchUsers = useCallback(async () => {
        try {
            const fetched = await request('/api/auth/', 'GET', null,
                {Authorization: `Bearer ${token}`}
            )
            setUsers(fetched)
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    if (loading) {
        return <LoadingPage/>
    }

    return (
        <div>
            {!loading && <UsersList users={users}/>}
        </div>
    )
}