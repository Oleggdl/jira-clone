import React, {useContext} from 'react'
import CreateProjectComponent from "./CreateProjectComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {createProject} from "../../../redux/scrum/projects-reducer"
import {useForm} from "antd/es/form/Form"
import {AuthContext} from "../../../context/AuthContext"

const CreateProjectContainer = props => {

    const [form] = useForm()

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onReset = () => {
        form.resetFields()
    }

    const handleSubmit = values => {
        props.createProject(values, headers)
        onReset()
    }

    return (
        <>
            <CreateProjectComponent handleSubmit={handleSubmit} onReset={onReset} form={form}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects
})

export default compose(
    connect(mapStateToProps, {createProject})
)(CreateProjectContainer)
