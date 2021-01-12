import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {UserAdvertsPage} from "./components/UserAdvertsPage";
import {CreateAdvertPage} from "./components/CreateAdvertPage";
import {AllAdvertsPage} from "./components/AllAdvertsPage";
import {Dashboard} from "./components/Dashboard";
import {UsersList} from "./components/UsersList";
import {AdvertPage} from "./components/AdvertPage";

export const useRoutes = isAuth => {
    if(isAuth){
        return (
            <Switch>
                <Route path='/allAdverts' exact>
                    <AllAdvertsPage/>
                </Route>
                <Route path='/usersList' exact>
                    <UsersList/>
                </Route>
                <Route path='/userAdverts' exact>
                    <UserAdvertsPage/>
                </Route>
                <Route path='/advert/:id' exact>
                    <AdvertPage/>
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