import React, {useContext, useEffect} from 'react'
import BacklogElementComponent from "./BacklogElementComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {AuthContext} from "../../../context/AuthContext"
import {getBacklogForProject} from "../../../redux/scrum/backlog-reducer"
import {createSprint} from "../../../redux/scrum/sprints-reducer";


const BacklogElementContainer = (props) => {

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        props.getBacklogForProject(props.currentProject.scrum_project.id, headers)
    }, [])

    const createSprintHandler = () => {
        props.createSprint(props.currentProject.scrum_project.id, headers)
    }

    return (
        <>
            <BacklogElementComponent tasks={props.tasks} backlogForProject={props.backlogForProject} createSprintHandler={createSprintHandler}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    backlogForProject: state.backlogReducer.backlogForProject,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getBacklogForProject, createSprint})
)(BacklogElementContainer)
