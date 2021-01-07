import React from 'react'
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {CreateUserPage} from "./CreateUserPage";
import {AuthPage} from "./AuthPage";

export const Dashboard = () => {
    return (
        <div>
            <Switch>
                <Route path='/register'>
                    <CreateUserPage/>
                </Route>
                <Route path='/login'>
                    <AuthPage/>
                </Route>
                <Redirect to='/' />
            </Switch>
            <div>
                <Link to='/register'>Create user</Link>
                <Link to='/login'>Auth</Link>
            </div>
        </div>

    )
}