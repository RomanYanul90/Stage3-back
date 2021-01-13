import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {AdvertsList} from "./AdvertsList";

export const AllAdvertsPage = () => {
    const [adverts, setAdverts] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchAdverts = useCallback(async () => {
        try {
            const fetched = await request('/api/advert/', 'GET', null,
                {Authorization: `Bearer ${token}`}
            )
            setAdverts(fetched)
        } catch (e) {
        }
    }, [token,request])

    useEffect(()=>{
        fetchAdverts()
    },[fetchAdverts])

    if (loading) {
        return <LoadingPage/>
    }

    return (
        <div>
            {!loading&&<AdvertsList adverts={adverts}/>}
        </div>
    )
}