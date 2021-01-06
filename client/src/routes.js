import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {AdvertsPage} from "./pages/AdvertsPage";
import {CreateAdvertPage} from "./pages/CreateAdvertPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuth => {
    if(isAuth){
        return (
            <Switch>
                <Route path='/adverts' exact>
                    <AdvertsPage/>
                </Route>
                <Route path='/create' exact>
                    <CreateAdvertPage/>
                </Route>
                {/*<Route path='/advert' exact>*/}
                {/*    <AdvertsPage/>*/}
                {/*</Route>*/}
                <Redirect to='/create' />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/'>
                <AuthPage/>
            </Route>
            <Redirect to='/' />

        </Switch>
    )
}