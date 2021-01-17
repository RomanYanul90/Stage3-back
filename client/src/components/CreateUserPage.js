import React, {useState,useEffect,useContext} from 'react'
import {useHttp} from "../hooks/httpHook";
import {useMessage} from "../hooks/errorHook";
import {AuthContext} from "../context/AuthContext";

export const CreateUserPage = () => {
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phone: "",
        password: "",
    })
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
    }, [error,message,clearError])

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const createUserHandler = async (e) => {
        e.preventDefault()

        try {
            const data = await request('/api/auth/register', "POST", {...form})
            message(data.message)
        } catch (e) {
        }
    }

    return (
        <div>
            <h2>Create user</h2>
            <form >
                <div>
                    <label>First name</label>
                    <input type="text" name="firstName" onChange={changeHandler}/>
                </div>
                <div>
                    <label>Last name</label>
                    <input type="text" name="lastName" onChange={changeHandler}/>
                </div>
                <div>
                    <label>User name</label>
                    <input type="text" name="userName" onChange={changeHandler}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" onChange={changeHandler}/>
                </div>
                <div>
                    <label>Phone</label>
                    <input type="text" name="phone" onChange={changeHandler}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={changeHandler}/>
                </div>
                <button onClick={createUserHandler}>Create user</button>
            </form>
        </div>
    )
}