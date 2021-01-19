import React, {useCallback, useContext,} from 'react';
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/httpHook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const RemoveAdvertPage = () => {
    const {token} = useContext(AuthContext);
    const {request} = useHttp();
    const history = useHistory();
    const advertId = useParams().id;

    const removeAdvert = useCallback(async () => {
        try {
            await request(`/api/advert/deleteAdvert/${advertId}`, "DELETE", null, {Authorization: `Bearer ${token}`});
            history.push('/userAdverts')
        } catch (e) {
        }
        history.push('/userAdverts')
    }, [token, advertId, request, history]);

    return (
        <div>
            <button onClick={removeAdvert}>Remove</button>
        </div>
    )
};