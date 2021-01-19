import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useParams,useHistory} from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {LoadingPage} from "./LoadingPage";
import {AdvertCard} from "./statelessComponents/AdvertCard";
import {selectId} from '../hooks/selectId';

export const AdvertPage = () => { 
    const {request, loading} = useHttp();
    const [advert, setAdvert] = useState(null);
    const history = useHistory();
    const auth = useContext(AuthContext);
    const advertId = useParams().id;
    
    let idFromAuth = undefined;
    if (auth.userId) {
        idFromAuth = auth.userId
    }

    const userId = selectId(idFromAuth);

    const getAdvert = useCallback(async () => {
        try {
            const result = await request(`/api/advert/byId/${advertId}`, "GET", null, {Authorization: `Bearer ${auth.token}`});
            if (userId !== result.ownerId) {
                await request(`/api/advert/editAdvert/${result._id}`, "PATCH", {
                    views: result.views + 1
                }, {Authorization: `Bearer ${auth.token}`})
            }
            setAdvert(result)
        } catch (e) {
        }
    }, [auth.token, advertId, request,userId]);

    useEffect(() => {
        getAdvert()
    }, [getAdvert]);

    const editRedirect = () => {
        history.push(`/editAdvert/${advert._id}`)
    };

    const removeRedirect = () => {
        history.push(`/deleteAdvert/${advert._id}`)
    };

    if (loading) {
        return <LoadingPage/>
    }
    return (
        <div>
            {!loading && advert &&
            <div>
                <AdvertCard advert={advert}/>
                {userId === advert.ownerId &&
                <div>
                    <button onClick={editRedirect}>Edit</button>
                    <button onClick={removeRedirect}>Remove</button>
                </div>
                }
            </div>
            }
        </div>
    )
};