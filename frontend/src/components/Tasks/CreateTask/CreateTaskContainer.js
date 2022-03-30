import React, {useContext} from 'react'
import CreateTaskComponent from "./CreateTaskComponent"
import {useForm} from "antd/es/form/Form"
import {AuthContext} from "../../../context/AuthContext"
import {compose} from "redux";
import {connect} from "react-redux"
import {createTask} from "../../../redux/tasks-reducer"

const CreateTaskContainer = props => {

    const [form] = useForm()

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onReset = () => {
        form.resetFields()
    }

    const handleSubmit = values => {
        props.createTask(values, headers)
        onReset()
    }

    return (
        <>
            <CreateTaskComponent handleSubmit={handleSubmit} onReset={onReset} form={form}/>
        </>
    )
}


const mapStateToProps = (state) => ({
    tasks: state.tasksReducer.tasks
})

export default compose(
    connect(mapStateToProps, {createTask})
)(CreateTaskContainer)
