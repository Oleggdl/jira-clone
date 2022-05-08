import React from "react"
import './App.scss'
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./redux/redux-store"
import {useRoutes} from "./routes"
import NavbarContainer from "./components/common/Navbar/NavbarContainer"
import {AuthContext} from "./context/AuthContext"
import {useAuth} from "./hooks/auth.hook"
import 'materialize-css'

function App() {

    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        <>
            <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
                <BrowserRouter>
                    <Provider store={store}>
                        {isAuthenticated && <NavbarContainer/>}
                        <div className="container">
                            {routes}
                        </div>
                    </Provider>
                </BrowserRouter>
            </AuthContext.Provider>
        </>
    )
}

export default App
