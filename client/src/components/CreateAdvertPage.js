import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/httpHook";
import {useMessage} from "../hooks/errorHook";

import {AuthContext} from "../context/AuthContext";

export const CreateAdvertPage = () => {
    const auth = useContext(AuthContext)
    const {error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
    })
    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const createAdvertHandler = async (e) => {
        e.preventDefault()

        try {
            const data = await request('/api/advert/create', "POST", {...form}, {Authorization: `Bearer ${auth.token}`})
            console.log(data)
            message(data.message)
            // console.log("Data", data)
        } catch (e) {
        }
    }

    return (
        <div>
            <h2>Create advert</h2>
            <form>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" onChange={changeHandler}/>
                </div>
                <div>
                    <label>Category</label>
                    <input type="text" name="category" onChange={changeHandler}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea type="text" name="description" onChange={changeHandler}/>
                </div>
                <div>
                    <label>Price</label>
                    <input type="text" name="price" onChange={changeHandler}/>
                </div>
                <button onClick={createAdvertHandler}>Create advert</button>
            </form>
        </div>
    )
}