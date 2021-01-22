import React from 'react';

export const AdvertForm = (props) => {
    return (
        <form className='basic-form'>
            <div>
                <label>Title</label>
                <input type="text" name="title" defaultValue={props.defaultValues[0]} onChange={props.changeHandler}/>
            </div>
            <div>
                <label>Category</label>
                <input type="text" name="category" defaultValue={props.defaultValues[1]} onChange={props.changeHandler}/>
            </div>
            <div>
                <label>Description</label>
                <textarea name="description" defaultValue={props.defaultValues[2]} onChange={props.changeHandler}/>
            </div>
            <div>
                <label>Price</label>
                <input type="text" name="price" defaultValue={props.defaultValues[3]} onChange={props.changeHandler}/>
            </div>
            <button onClick={props.submitMethod}>Submit</button>
        </form>
    )
};