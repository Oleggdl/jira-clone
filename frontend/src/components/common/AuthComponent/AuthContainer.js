import React, {useContext, useEffect, useState} from 'react'
import {AuthComponent} from "./AuthComponent"
import {AuthContext} from "../../../context/AuthContext"
import {useMessage} from "../../../hooks/message.hook"
import {useHttp} from "../../../hooks/http.hook"

const AuthContainer = () => {


   const auth = useContext(AuthContext)
   const message = useMessage()
   const {loading, error, request, clearError} = useHttp()

   const [isLogIn, setIsLogin] = useState(true)
    const [form, setForm] = useState({
        name: '', username: '', email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    // useEffect(() => {
    //     window.M.updateTextFields()
    // })

    const changeHandler = event => {
        setForm({...form, [event.target.id]: event.target.value})
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            console.log({...form})
            const data = await request('api/auth/signup', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request('api/auth/signin', 'POST', {...form})
            auth.login(data.token, data.id)

        } catch (e) {
        }

    }


    return (
        <>
            <AuthComponent changeHandler={changeHandler} isLogIn={isLogIn} setIsLogin={setIsLogin} form={form}
                           setForm={setForm} registerHandler={registerHandler} loginHandler={loginHandler}
            />
        </>
    )
}

export default AuthContainer
