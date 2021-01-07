import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {AdvertsPage} from "./components/AdvertsPage";
import {CreateAdvertPage} from "./components/CreateAdvertPage";
import {Dashboard} from "./components/Dashboard";

export const useRoutes = isAuth => {
    if(isAuth){
        return (
            <Switch>
                <Route path='/adverts' exact>
                    <AdvertsPage/>
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