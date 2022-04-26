import React from 'react'
import './AuthComponent.scss'
import {Button, Form, Input} from "antd"
import {NavLink} from "react-router-dom"
import Password from "antd/es/input/Password"


export const AuthComponent = ({
                                  form, loginHandler, isLogIn, setIsLogin, registerHandler
                              }) => {

    return (
        <div className="auth-component-container">
            <h1>Jira-clone</h1>
            {isLogIn ? <div className="auth-container">
                    <div className="container-title">Login to your account</div>
                    <Form name="auth_login_form"
                          form={form}
                          onFinish={(values) => loginHandler(values)}
                          autoComplete="off">
                        <Form.Item label="Username" name="username"
                                   rules={[{required: true, message: 'Please input username!'}]}>
                            <Input placeholder="Enter username"/>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input password!'}]}>
                            <Password placeholder="Enter password"/>
                        </Form.Item>
                        <Form.Item className="button-container">
                            <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                                Log in
                            </Button>
                        </Form.Item>
                        <hr/>
                        <p>Haven't created an account yet?</p>
                        <Form.Item className="button-container">
                            <Button style={{width: "100px"}} onClick={() => setIsLogin(false)}>
                                <NavLink to="/">Sign up</NavLink>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                : <div className="auth-container">
                    <div className="container-title">User registration</div>
                    <Form name="auth_log_up_form"
                          form={form}
                          onFinish={registerHandler}
                          autoComplete="off">
                        <Form.Item
                            label="Name" name="name"
                            rules={[{required: true, message: 'Please input name!'},
                                {max: 30, message: `Name cannot be longer than 30 characters`},
                                {min: 3, message: 'Name must be at least 3 characters'},
                                {pattern: new RegExp(/[a-z]/gi), message: 'Name must contain letters'}]}>
                            <Input placeholder="Enter name"/>
                        </Form.Item>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{required: true, message: 'Please input username!'},
                                {max: 30, message: `Username cannot be longer than 30 characters`},
                                {min: 3, message: 'Username must be at least 3 characters'},
                                {pattern: new RegExp(/[a-z]/gi), message: 'Username must contain letters'}]}>
                            <Input placeholder="Enter username"/>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{required: true, message: 'Please input email!'},
                                {max: 30, message: `Email cannot be longer than 30 characters`},
                                {min: 3, message: 'Email must be at least 3 characters'},
                                {pattern: new RegExp(/@/gi), message: 'Email must contain @'}]}>
                            <Input placeholder="Enter email"/>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input password!'},
                                {max: 30, message: `Password cannot be longer than 30 characters`},
                                {min: 8, message: 'Password must be at least 8 characters'},
                                {pattern: new RegExp(/[0-9]/g), message: 'Password must contain numbers'},
                                {pattern: new RegExp(/[a-z]/gi), message: 'Password must contain letters'}]}>
                            <Password placeholder="Enter password"/>
                        </Form.Item>
                        <Form.Item className="button-container">
                            <Button type="primary" htmlType="submit" style={{width: "100px"}}>
                                Sign up
                            </Button>
                        </Form.Item>
                        <hr/>
                        <p>Already exists an account?</p>
                        <Form.Item className="button-container">
                            <Button style={{width: "100px"}} onClick={() => setIsLogin(true)}>
                                <NavLink to="/">Sign in</NavLink>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>}
        </div>
    )
}
