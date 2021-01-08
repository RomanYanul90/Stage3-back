import React from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/authHook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";

function App() {
    const {token, userId, login, logout} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)
    return (
        <AuthContext.Provider value={{token, userId, login, logout,isAuth}}>

            <Router>
                {isAuth&&<Navbar/>}
                {routes}
            </Router>
        </AuthContext.Provider>

    )
}

export default App;
