import React,{useState} from "react";
import {AdvertCard} from "./AdvertCard";

export const AdvertsList = ({adverts}) => {
    const [sortParam,setSortParam] = useState('')
    if(!adverts.length){
        return <p>There is no adverts created by current user</p>
    }
    const sortAdverts=(adverts,sortParam)=>{
        return adverts.sort((a,b)=>{
            if(sortParam==='price'){
                return  a.price - b.price
            }
            if(sortParam==='created'){
                return  Date.parse(a.created) - Date.parse(b.created)
            }
        })
    }
    return (
        <div>
            <div style={{display:'flex',
            flexDirection:"row"}}>
                <p>Sort by: </p>
                <select onChange={(e)=>{
                    setSortParam(e.target.value)
                }}>
                    <option value='price'>Price</option>
                    <option value='created'>Date</option>
                </select>
            </div>

            {sortAdverts(adverts,sortParam).map((el, index) => {
                return <div key={el._id}>
                    <h2>Advert {index + 1})</h2>
                    <AdvertCard  advert={el}/>
                </div>

            })}
        </div>
    )
}