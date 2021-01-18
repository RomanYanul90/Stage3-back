import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {AdvertsList} from "./AdvertsList";

export const AllAdvertsPage = () => {
    const [adverts, setAdverts] = useState([])
    const [searchParams, setSearchParams] = useState({title: ""})
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
    }, [token, request])

    useEffect(() => {
        fetchAdverts()
    }, [fetchAdverts])

    if (loading) {
        return <LoadingPage/>
    }

    const changeInputHandler = (e) => {
        setSearchParams({title: e.target.value})

    }
    const searchHandler = async (e) => {
        e.preventDefault()
        // let searched = []
        // let copyt = []
        try {
            const fetched = await request(`/api/advert/byTitle/${searchParams.title}`, 'GET', null,
                {Authorization: `Bearer ${token}`}
            )
            // searched = fetched
            setAdverts(fetched)
        } catch (e) {
        }
        // searched.forEach((el) => {
        //      copyt.push({id: el._id, views: el.views})
        //     // console.log(el._id)
        //     // console.log(el.views)
        // })
        // console.log(copyt)

            // copyt.forEach((el)=>{
            //     await request(`/api/advert/editAdvert/${el.id}`, "PATCH", {
            //         views: el.views+1
            //     }, {Authorization: `Bearer ${auth.token}`})
            // })

    }

    if (loading) {
        return <LoadingPage/>
    }
    return (
        <div>
            <form>
                <label>Find advert</label>
                <input type='text' name='title' onChange={changeInputHandler}/>
                <button onClick={searchHandler}>Search</button>

            </form>
            {!adverts.length || loading ? <p>No adverts</p> : <AdvertsList adverts={adverts}/>}
            {/*{!loading && <AdvertsList adverts={adverts}/>}*/}
        </div>
    )
}