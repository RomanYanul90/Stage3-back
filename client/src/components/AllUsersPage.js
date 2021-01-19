import React, {useState, useContext, useEffect, useCallback} from 'react'
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {useHttp} from "../hooks/httpHook";
import {UsersList} from "./UsersList";

export const AllUsersPage = () => {
    const [users, setUsers] = useState([])
    const [searchParams, setSearchParams] = useState({userName: ""})
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

    const changeInputHandler = (e) => {
        setSearchParams({userName: e.target.value})

    }
    const searchHandler = async (e)=>{
        e.preventDefault()
        try {
            const fetched = await request(`/api/auth/byUserName/${searchParams.userName}`, 'GET', null,
                {Authorization: `Bearer ${token}`}
            )
            // console.log(fetched)
            setUsers(fetched)
        } catch (e) {
        }
    }

    if (loading) {
        return <LoadingPage/>
    }

    return (
        <div>
            <form className='search-form'>
                <input type='text' name='userName' placeholder='UserName:' onChange={changeInputHandler}/>
                <button  onClick={searchHandler}>Find by user name</button>
            </form>
            {!loading && <UsersList users={users}/>}
        </div>
    )
}