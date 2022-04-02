import React, {useContext, useEffect} from 'react'
import BacklogElementComponent from "./BacklogElementComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getTasks} from "../../../redux/scrum/tasks-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getBacklogForProject} from "../../../redux/scrum/backlog-reducer"



const BacklogElementContainer = (props) => {

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        props.getTasks(headers)
        props.getBacklogForProject(props.currentProject.id, headers)
    }, [])

    return (
        <>
            <BacklogElementComponent tasks={props.tasks} backlogForProject={props.backlogForProject}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    tasks: state.tasksReducer.tasks,
    backlogForProject: state.backlogReducer.backlogForProject,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getTasks, getBacklogForProject})
)(BacklogElementContainer)
