import React from 'react'
import './AuthComponent.scss'


export const AuthComponent = ({changeHandler, form, loginHandler, isLogIn, setIsLogin, registerHandler, setForm}) => {

    return (
        <div className="auth-component-container">
            <h1>Jira-clone</h1>
            {isLogIn ? <form action="">
                    <div className="auth-container">
                        <div className="container-title">Login to your account</div>
                        <div className="input-field">
                            <div>Username</div>
                            <input id="username" type="text" value={form.username} autoComplete="off"
                                   name="username" onChange={changeHandler} placeholder="Enter username"/>
                        </div>
                        <div className="input-field">
                            <div>Username</div>
                            <input id="password" type="password" value={form.password} autoComplete="off"
                                   name="password" onChange={changeHandler} placeholder="Enter password"/>
                        </div>
                        <button className="login-button" style={{margin: "20px 0 20px 0"}} onClick={loginHandler}
                            // disabled={loading}
                        >Log in
                        </button>
                        <hr/>
                        <p>Haven't created an account yet?</p>
                        <button className="is-login-button" onClick={() => setIsLogin(false)}
                            // disabled={loading}
                        >Log up
                        </button>
                    </div>
                </form>
                : <form action="">
                    <div className="auth-container">
                        <div className="container-title">User registration</div>
                        <div className="input-field">
                            <div>Name</div>
                            <input id="name" type="text" value={form.name} autoComplete="off"
                                   name="name" onChange={changeHandler} placeholder="Enter name"/>
                        </div>
                        <div className="input-field">
                            <div>Username</div>
                            <input id="username" type="text" value={form.username} autoComplete="off"
                                   name="username" onChange={changeHandler} placeholder="Enter username"/>
                        </div>
                        <div className="input-field">
                            <div>Email</div>
                            <input id="email" type="text" value={form.email} autoComplete="off"
                                   name="email" onChange={changeHandler} placeholder="Enter email"/>
                        </div>
                        <div className="input-field">
                            <div>Password</div>
                            <input id="password" type="password" value={form.password} autoComplete="off"
                                   name="password" onChange={changeHandler} placeholder="Enter password"/>
                        </div>
                        <button className="login-button" style={{margin: "20px 0 20px 0"}} onClick={registerHandler}
                            // disabled={loading}
                        >Log up
                        </button>
                        <hr/>
                        <p>Already exists an account?</p>
                        <button className="is-login-button" onClick={() => setIsLogin(true)}
                            // disabled={loading}
                        >Log in
                        </button>
                    </div>
                </form>}

        </div>
    )
}
