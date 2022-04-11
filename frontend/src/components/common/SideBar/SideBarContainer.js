import React, {useContext} from 'react'
import SideBarComponent from "./SideBarComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {AuthContext} from "../../../context/AuthContext"
import {getSprints, getStartedSprint} from "../../../redux/scrum/sprints-reducer"
import {getBacklogForProject} from "../../../redux/scrum/backlog-reducer"

const SideBarContainer = props => {

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const getBacklogElements = () => {
        props.getBacklogForProject(props.currentProject.scrum_project.id, headers)
    }

    const getStartedSprint = () => {
        props.getStartedSprint(props.currentProject.scrum_project.id, headers)
    }
    const getSprints = () => {
        props.getSprints(props.currentProject.scrum_project.id, headers)
    }

    return (
        <>
            <SideBarComponent currentProject={props.currentProject.scrum_project} getSprints={getSprints}
                              getBacklogElements={getBacklogElements} getStartedSprint={getStartedSprint}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getSprints, getBacklogForProject, getStartedSprint})
)(SideBarContainer)
