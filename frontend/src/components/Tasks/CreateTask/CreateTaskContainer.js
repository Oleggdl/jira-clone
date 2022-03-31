import React, {useContext, useEffect} from 'react'
import CreateTaskComponent from "./CreateTaskComponent"
import {useForm} from "antd/es/form/Form"
import {AuthContext} from "../../../context/AuthContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {createTask} from "../../../redux/scrum/tasks-reducer"
import {getCurrentProject, getProjects} from "../../../redux/scrum/projects-reducer"
import {getSprints} from "../../../redux/scrum/sprints-reducer"
import {createBacklogElement} from "../../../redux/scrum/backlog-reducer"

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
        props.createTask({
            create_date: values.create_date,
            creator_id: values.creator_id,
            executor_id: values.executor_id,
            sprint_id: values.sprint_id,
            task_description: values.task_description,
            task_name: values.task_name
        }, headers)

        props.createBacklogElement({
            scrum_project_id: JSON.parse(values.project).id,
            scrum_task_id: props.createdTaskId
        }, headers)
        onReset()
    }

    const test = () => {
        console.log(props.createdTaskId)
    }


    useEffect(() => {
        props.getProjects(headers)
        props.getSprints(headers)
    }, [])

    return (
        <>
            <CreateTaskComponent handleSubmit={handleSubmit} onReset={onReset} form={form} projects={props.projects}
                                 sprints={props.sprints} currentUser={props.currentUser} test={test}/>
        </>
    )
}


const mapStateToProps = (state) => ({
    tasks: state.tasksReducer.tasks,
    projects: state.projectsReducer.projects,
    sprints: state.sprintsReducer.sprints,
    currentUser: state.userReducer.currentUser,
    currentProject: state.projectsReducer.currentProject,
    createdTaskId: state.tasksReducer.createdTaskId
})

export default compose(
    connect(mapStateToProps, {createTask, getProjects, getSprints, createBacklogElement, getCurrentProject})
)(CreateTaskContainer)




