import React from "react"
import './App.scss'
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./redux/redux-store"
import {useRoutes} from "./routes"
import NavbarContainer from "./components/common/Navbar/NavbarContainer"
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";

function App() {

    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        // return <Loader/>
    }

    return (
        <>
            <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
                <BrowserRouter>
                    <Provider store={store}>
                        {isAuthenticated && <NavbarContainer/>}
                        <div className="container">
                            {routes}
                        </div>
                        {/*{isAuthenticated && <FooterComponent/>}*/}
                    </Provider>
                </BrowserRouter>
            </AuthContext.Provider>
        </>
    )
}

export default App
