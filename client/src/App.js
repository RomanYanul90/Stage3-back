import React from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/authHook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import LoadingPage from "./components/LoadingPage";

function App() {
    const {token, userId, login, logout,ready} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    if(!ready){
        return <LoadingPage/>
    }

    return (
        <AuthContext.Provider value={{token, userId, login, logout, isAuth}}>

            <Router>
                {isAuth && <Navbar/>}
                {routes}
            </Router>
        </AuthContext.Provider>

    )
}

export default App;
