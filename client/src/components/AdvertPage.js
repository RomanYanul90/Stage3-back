import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {AdvertCard} from "./AdvertCard";
import {useHistory} from "react-router-dom";

export const AdvertPage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [advert, setAdvert] = useState(null)
    const advertId = useParams().id
    let userId = undefined
    if (auth.userId) {
        userId = auth.userId
    }
    const selectId = (id) => {
        if (typeof (id) === "string") {
            return id
        }
        if (typeof (id) === "object") {
            const newId = id.userId
            return selectId(newId)
        }
    }
    const id = selectId(userId)

    const getAdvert = useCallback(async () => {
        try {
            const result = await request(`/api/advert/byId/${advertId}`, "GET", null, {Authorization: `Bearer ${auth.token}`})
            if (id !== result.ownerId) {
                await request(`/api/advert/editAdvert/${result._id}`, "PATCH", {
                    views: result.views + 1
                }, {Authorization: `Bearer ${auth.token}`})
            }
            setAdvert(result)
        } catch (e) {
        }
    }, [auth.token, advertId, request])

    useEffect(() => {
        getAdvert()
    }, [getAdvert])

    const editRedirect = () => {
        history.push(`/editAdvert/${advert._id}`)
    }

    const removeRedirect = () => {
        history.push(`/deleteAdvert/${advert._id}`)
    }

    if (loading) {
        return <LoadingPage/>
    }
    return (
        <div>
            {!loading && advert &&
            <div>
                <AdvertCard advert={advert}/>
                {id === advert.ownerId &&
                <div>
                    <button onClick={editRedirect}>Edit</button>
                    <button onClick={removeRedirect}>Remove</button>
                </div>
                }
            </div>
            }
        </div>
    )
}