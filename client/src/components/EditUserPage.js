import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {useParams, useHistory} from "react-router-dom";
import {LoadingPage} from "./LoadingPage";
import {UserForm} from "./statelessComponents/UserForm"

export const EditUserPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [user, setUser] = useState(null)
    const userId = useParams().id
    const history = useHistory()
    const auth = useContext(AuthContext)

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phone: "",
    })

    const getUser = useCallback(async () => {
        try {
            const result = await request(`/api/auth/user/${userId}`, "GET", null, {Authorization: `Bearer ${token}`})
            setUser(result)
        } catch (e) {
        }
    }, [token, userId, request])

    useEffect(() => {
        getUser()
    }, [getUser])

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const editUserHandler = async (e) => {
        e.preventDefault()

        try {
            const data = await request(`/api/auth/editUser/${userId}`, "PATCH", {
                firstName: form.firstName ? form.firstName : user.firstName,
                lastName: form.lastName ? form.lastName : user.lastName,
                userName:form.userName? form.userName:user.userName,
                email:form.email?form.email:user.email,
                phone:form.phone?form.phone:user.phone,
            }, {Authorization: `Bearer ${auth.token}`})
            history.push(`/userPage/${userId}`)
        } catch (e) {
        }
    }

    if (loading) {
        return <LoadingPage/>
    }
    return (
        <div>
            {user &&
            <div>
                <h2>Edit user</h2>
                <UserForm
                    changeHandler = {changeHandler}
                    submitMethod  = {editUserHandler}
                    defaultValues={[user.firstName,user.lastName,user.userName,user.email,user.phone]}
                    isCreatePage={false}
                />
            </div>}

        </div>
    )
}