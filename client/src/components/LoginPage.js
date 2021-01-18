import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/httpHook";
import {useMessage} from "../hooks/errorHook";
import {AuthContext} from "../context/AuthContext";

export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const {error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const message = useMessage()
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const loginHandler = async (e) => {
        e.preventDefault()

        try {
            const data = await request('/api/auth/login', "POST", {...form})
            auth.login(data.token,data.userId)
            // console.log("Data", data)
        } catch (e) {
        }
    }
    return (
        <div>
            <h2>Log in</h2>
            <form>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" onChange={changeHandler}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={changeHandler}/>
                </div>
                <button onClick={loginHandler}>Submit</button>
            </form>
        </div>
    )
}