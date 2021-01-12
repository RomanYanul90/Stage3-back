import React, {useState, useCallback, useContext,useEffect} from 'react'
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {AdvertCard} from "./AdvertCard";

export const AdvertPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [advert, setAdvert] = useState(null)
    const advertId = useParams().id

    const getAdvert = useCallback(async () => {
        try {
            const result = await request(`/api/advert/${advertId}`, "GET", null, {Authorization: `Bearer ${token}`})
            setAdvert(result)
        } catch (e) {

        }
    }, [token, advertId, request])

    useEffect(()=>{
        getAdvert()
    },[getAdvert])

    if(loading){
        return <LoadingPage/>
    }
    return (
        <div>
            {!loading && advert && <AdvertCard advert={advert}/>}
        </div>
    )
}