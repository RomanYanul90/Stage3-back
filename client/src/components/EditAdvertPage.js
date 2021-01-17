import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useHttp} from "../hooks/httpHook";
import {useMessage} from "../hooks/errorHook";
// import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useParams, useHistory} from "react-router-dom";
import {LoadingPage} from "./LoadingPage";
import {AdvertCard} from "./AdvertCard";

export const EditAdvertPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [advert, setAdvert] = useState(null)
    const advertId = useParams().id
    const history = useHistory()
    const auth = useContext(AuthContext)

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
    })

    const getAdvert = useCallback(async () => {
        try {
            const result = await request(`/api/advert/byId/${advertId}`, "GET", null, {Authorization: `Bearer ${token}`})
            setAdvert(result)
        } catch (e) {
        }
    }, [token, advertId, request])

    useEffect(() => {
        getAdvert()
    }, [getAdvert])

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const editAdvertHandler = async (e) => {
        e.preventDefault()

        try {
            const data = await request(`/api/advert/editAdvert/${advertId}`, "PATCH", {
                title: form.title ? form.title : advert.title,
                category: form.category ? form.category : advert.category,
                description: form.description ? form.description : advert.description,
                price: form.price ? form.price : advert.price,
                modified: Date.now()
            }, {Authorization: `Bearer ${auth.token}`})
        } catch (e) {
        }
        history.push(`/advert/${advert._id}`)
    }

    if (loading) {
        return <LoadingPage/>
    }
    return (
        <div>
            {advert && <div>
                <h2>Edit advert</h2>
                <form>
                    <div>
                        <label>Title</label>
                        <input type="text" name="title" defaultValue={advert.title} onChange={changeHandler}/>
                    </div>
                    <div>
                        <label>Category</label>
                        <input type="text" name="category" defaultValue={advert.category} onChange={changeHandler}/>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea type="text" name="description" defaultValue={advert.description}
                                  onChange={changeHandler}/>
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="text" name="price" defaultValue={advert.price} onChange={changeHandler}/>
                    </div>
                    <button onClick={editAdvertHandler}>Save changed advert</button>
                </form>
            </div>}

        </div>
    )
}