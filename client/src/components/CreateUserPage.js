import React, {useState,useEffect} from 'react'
import {useHttp} from "../hooks/httpHook";

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
    //
    useEffect(() => {
        alert(error)
        // clearError()
    }, [error])

    const changeHandler = (e) => {
        // e.preventDefault()
        setForm({...form, [e.target.name]: e.target.value})
    }

    const createUserHandler = async (e) => {
        e.preventDefault()

        try {
            const data = await request('/api/auth/register', "POST", {...form})
            console.log("Data", data)
        } catch (e) {
        }
    }

    return (
        <div>
            <h2>Create user</h2>
            <form>
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