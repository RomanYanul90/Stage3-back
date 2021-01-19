import React from 'react';

export const UserForm = (props) => {
    return (
        <form className='user-form'>
            <div>
                <label>First name</label>
                <input type="text" name="firstName" defaultValue={props.defaultValues[0]}
                       onChange={props.changeHandler}/>
            </div>
            <div>
                <label>Last name</label>
                <input type="text" name="lastName" defaultValue={props.defaultValues[1]}
                       onChange={props.changeHandler}/>
            </div>
            <div>
                <label>User name</label>
                <input type="text" name="userName" defaultValue={props.defaultValues[2]}
                       onChange={props.changeHandler}/>
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" defaultValue={props.defaultValues[3]} onChange={props.changeHandler}/>
            </div>
            <div>
                <label>Phone</label>
                <input type="text" name="phone" defaultValue={props.defaultValues[4]} onChange={props.changeHandler}/>
            </div>
            {props.isCreatePage &&
            <div>
                <label>Password</label>
                <input type="password" name="password" onChange={props.changeHandler}/>
            </div>}
            <button onClick={props.submitMethod}>Submit</button>
        </form>
    )
};