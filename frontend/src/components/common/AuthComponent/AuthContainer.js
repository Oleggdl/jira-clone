import React, {useContext, useEffect, useState} from 'react'
import {AuthComponent} from "./AuthComponent"
import {AuthContext} from "../../../context/AuthContext"
import {useMessage} from "../../../hooks/message.hook"
import {useHttp} from "../../../hooks/http.hook"
import {useForm} from "antd/es/form/Form"
import {compose} from "redux"
import {connect} from "react-redux"
import {getUser} from "../../../redux/scrum/users-reducer"

const userName = 'userName'

const AuthContainer = (props) => {


    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    const [isLogIn, setIsLogin] = useState(true)

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const [form] = useForm()

    const onReset = () => {
        form.resetFields()
    }

    const registerHandler = async (values) => {
        try {
            const data = await request('api/auth/signup', 'POST', {
                name: values.name, email: values.email, username: values.username, password: values.password
            })
            message(data.message)
            const dataLogin = await request('api/auth/signin', 'POST', {
                name: '', email: '', username: values.username, password: values.password
            })
            auth.login(dataLogin.token, dataLogin.id)
            props.getUser(dataLogin)
            localStorage.setItem(userName, JSON.stringify({
                userName: dataLogin
            }))
        } catch (e) {
        }
        onReset()
    }

    const loginHandler = async (values) => {
        try {
            const data = await request('api/auth/signin', 'POST', {
                name: '', email: '', username: values.username, password: values.password
            })
            auth.login(data.token, data.id)
            props.getUser(data)
            localStorage.setItem(userName, JSON.stringify({
                userName: data
            }))
        } catch (e) {
        }
        onReset()
    }



    return (
        <>
            <AuthComponent isLogIn={isLogIn} setIsLogin={setIsLogin} form={form}
                           registerHandler={registerHandler} loginHandler={loginHandler}
            />
        </>
    )
}

export default compose(
    connect(null, {getUser})
)(AuthContainer)

