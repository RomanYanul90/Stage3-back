import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {UserAdvertsPage} from "./components/UserAdvertsPage";
import {CreateAdvertPage} from "./components/CreateAdvertPage";
import {AllAdvertsPage} from "./components/AllAdvertsPage";
import {Dashboard} from "./components/Dashboard";

export const useRoutes = isAuth => {
    if(isAuth){
        return (
            <Switch>
                <Route path='/allAdverts' exact>
                    <AllAdvertsPage/>
                </Route>
                <Route path='/userAdverts' exact>
                    <UserAdvertsPage/>
                </Route>
                <Route path='/createAdvert' exact>
                    <CreateAdvertPage/>
                </Route>
                <Redirect to='/createAdvert' />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/'>
                <Dashboard/>
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}