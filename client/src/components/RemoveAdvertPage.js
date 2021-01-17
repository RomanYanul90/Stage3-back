import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {AdvertCard} from "./AdvertCard";

export const RemoveAdvertPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    // const [advert, setAdvert] = useState(null)
    const advertId = useParams().id

    const removeAdvert = useCallback(async () => {
        try {
            const result = await request(`/api/advert/deleteAdvert/${advertId}`, "DELETE", null, {Authorization: `Bearer ${token}`})
            // setAdvert(result)
        } catch (e) {
        }
    }, [token, advertId, request])

    return(
        <div>
            <button onClick={removeAdvert}>Remove</button>
        </div>
    )
}