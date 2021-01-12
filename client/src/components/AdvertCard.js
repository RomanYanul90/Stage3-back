import React from "react";

export const AdvertCard = ({advert})=>{
    return(
        <div>
            <h2>{advert.title}</h2>
            <p>Category: {advert.category}</p>
            <p>Description: {advert.description}</p>
            <p>Price: {advert.price}$</p>
            <p>Views: {advert.views}</p>
            <p>Created: {new Date(advert.created).toLocaleString()}</p>
        </div>
    )
}