import React from "react";
import {AdvertCard} from "./AdvertCard";

export const AdvertsList = ({adverts}) => {
    if(!adverts.length){
        return <p>There is no adverts created by current user</p>
    }
    return (
        <div>
            {adverts.map((el, index) => {
                return <div key={el._id}>
                    <h2>{index + 1})</h2>
                    <AdvertCard  advert={el}/>
                </div>

            })}
        </div>
    )
}