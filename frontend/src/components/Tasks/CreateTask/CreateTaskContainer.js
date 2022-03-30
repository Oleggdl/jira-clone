import React, {useContext, useEffect} from 'react'
import CreateTaskComponent from "./CreateTaskComponent"
import {useForm} from "antd/es/form/Form"
import {AuthContext} from "../../../context/AuthContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {createTask} from "../../../redux/tasks-reducer"
import {getProjects} from "../../../redux/projects-reducer"
import {getSprints} from "../../../redux/sprints-reducer"

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

    useEffect(() => {
        props.getProjects(headers)
        props.getSprints(headers)
    }, [])

    return (
        <>
            <CreateTaskComponent handleSubmit={handleSubmit} onReset={onReset} form={form} projects={props.projects}
                                 sprints={props.sprints}/>
        </>
    )
}


const mapStateToProps = (state) => ({
    tasks: state.tasksReducer.tasks,
    projects: state.projectsReducer.projects,
    sprints: state.sprintsReducer.sprints
})

export default compose(
    connect(mapStateToProps, {createTask, getProjects, getSprints})
)(CreateTaskContainer)
