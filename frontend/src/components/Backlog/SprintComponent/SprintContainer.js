import React, {useContext, useEffect} from 'react'
import SprintComponent from "./SprintComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getTaskSprints} from "../../../redux/scrum/taskSprint-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {TaskSprintContext} from "../../../context/TaskSprintContext";

const SprintContainer = props => {

    const {token} = useContext(AuthContext)
    const {setCurrentSprint} = useContext(TaskSprintContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        props.getTaskSprints(props.sprint.id, headers)
    }, [])

    return (
        <>
            <SprintComponent sprint={props.sprint} taskSprints={props.taskSprints} index={props.index}
                             setBacklogForProjectSprint={props.setBacklogForProjectSprint}
                             backlogForProjectSprint={props.backlogForProjectSprint}
                             setCurrentSprint={setCurrentSprint}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    taskSprints: state.taskSprintReducer.taskSprints
})

export default compose(
    connect(mapStateToProps, {getTaskSprints})
)(SprintContainer)
