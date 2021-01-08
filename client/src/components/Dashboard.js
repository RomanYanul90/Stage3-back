import React from 'react'
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {CreateUserPage} from "./CreateUserPage";
import {LoginPage} from "./LoginPage";

export const Dashboard = () => {
    return (
        <div>
            <Switch>
                <Route path='/register'>
                    <CreateUserPage/>
                </Route>
                <Route path='/login'>
                    <LoginPage/>
                </Route>
                <Redirect to='/' />
            </Switch>
            <div>
                <Link to='/register'>Create user</Link>
                <Link to='/login'>Log in</Link>
            </div>
        </div>

    )
}