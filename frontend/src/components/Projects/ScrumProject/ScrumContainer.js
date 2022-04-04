import React, {useContext, useEffect} from 'react'
import ScrumComponent from "./ScrumComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getTaskSprints} from "../../../redux/scrum/taskSprint-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getBacklogForProject} from "../../../redux/scrum/backlog-reducer"

const ScrumContainer = props => {


    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }


    useEffect(() => {
        props.getTaskSprints(3, headers)
        props.getBacklogForProject(props.currentProject.scrum_project.id, headers)
    }, [])


    return (
        <>
            <ScrumComponent/>
        </>
    )

}

const mapStateToProps = (state) => ({
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getTaskSprints, getBacklogForProject})
)(ScrumContainer)
