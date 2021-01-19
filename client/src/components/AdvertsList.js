import React,{useState} from "react";
import {AdvertCard} from "./statelessComponents/AdvertCard";
import {Link} from "react-router-dom";

export const AdvertsList = ({adverts}) => {
    const [sortParam,setSortParam] = useState('price')
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
        <div className='adverts-list'>
            <div className='sort-select'>
                <label>Sort by: </label>
                <select onChange={(e)=>{
                    setSortParam(e.target.value)
                }}>
                    <option value='price'>Price</option>
                    <option value='created'>Date</option>
                </select>
            </div>

            {sortAdverts(adverts,sortParam).map((el, index) => {
                return <div key={el._id}>
                    <Link to={`/advert/${el._id}`}>
                    <AdvertCard  advert={el}/>
                    </Link>
                </div>
            })}
        </div>
    )
}