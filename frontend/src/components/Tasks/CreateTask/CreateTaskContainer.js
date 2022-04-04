import React, {useContext, useEffect} from 'react'
import CreateTaskComponent from "./CreateTaskComponent"
import {useForm} from "antd/es/form/Form"
import {AuthContext} from "../../../context/AuthContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getProjects} from "../../../redux/scrum/projects-reducer"
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
        props.createBacklogElement({
            create_date: values.create_date,
            creator_id: props.currentUser.id,
            executor_id: values.executor_id,
            task_description: values.task_description,
            task_name: values.task_name
        }, values.project, headers)
        onReset()
    }


    useEffect(() => {
        props.getProjects(props.currentUser.id, headers)
    }, [])

    return (
        <>
            <CreateTaskComponent handleSubmit={handleSubmit} onReset={onReset} form={form} projects={props.projects}
                                 sprints={props.sprints} currentUser={props.currentUser}/>
        </>
    )
}


const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
    sprints: state.sprintsReducer.sprints,
    currentUser: state.userReducer.currentUser,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getProjects, createBacklogElement})
)(CreateTaskContainer)




