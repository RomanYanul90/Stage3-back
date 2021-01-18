import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const AdvertCard = ({advert}) => {
    const auth = useContext(AuthContext)
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

    return (
        <div style={{border: "solid"}}>
            <h2>{advert.title}</h2>
            <p>Category: {advert.category}</p>
            <p>Description: {advert.description}</p>
            <p>Price: {advert.price}$</p>
            <p>Views: {advert.views}</p>
            <p>Created by: {advert.ownerUserName}</p>
            <p>Created: {new Date(advert.created).toLocaleString()}</p>
            {advert.modified && <p>Modified:{advert.modified}</p>}
            {id === advert.ownerId &&
            <div>
                <Link to={`/editAdvert/${advert._id}`}>
                    <button>Edit</button>
                </Link>
                <Link to={`/deleteAdvert/${advert._id}`}>
                    <button>Remove</button>
                </Link>
            </div>
            }
        </div>
    )
}