import React, {useContext, useEffect, useRef} from 'react'
import BacklogElementComponent from "./BacklogElementComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {AuthContext} from "../../../context/AuthContext"
import {createSprint} from "../../../redux/scrum/sprints-reducer"


const BacklogElementContainer = (props) => {

    const {token} = useContext(AuthContext)


    const headers = {
        Authorization: `Bearer ${token}`
    }

    const createSprintHandler = () => {
        props.createSprint(props.currentProject.scrum_project.id, headers)
    }

    return (
        <>
            <BacklogElementComponent tasks={props.tasks} backlogForProject={props.backlogForProject}
                                     createSprintHandler={createSprintHandler}
                                     setBacklogForProject={props.setBacklogForProject}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    sprints: state.sprintsReducer.sprints,
    currentProject: state.projectsReducer.currentProject,
    backlogForProject: state.backlogReducer.backlogForProject,
})

export default compose(
    connect(mapStateToProps, {createSprint})
)(BacklogElementContainer)
