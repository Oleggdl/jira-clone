import React, {useContext, useEffect} from 'react'
import TaskBacklogComponent from "./TaskBacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getSprints} from "../../../redux/scrum/sprints-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {TaskContext} from "../../../context/TaskContext"
import {setCurrentTask} from "../../../redux/scrum/tasks-reducer"

const TaskBacklogContainer = props => {

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        props.getSprints(props.currentProject.scrum_project.id, headers)
    }, [])

    const {setIsTaskInfo} = useContext(TaskContext)

    const taskInfoHandler = (value) => {
        props.setCurrentTask(value)
        setIsTaskInfo(true)
    }

    return (
        <>
            <TaskBacklogComponent task={props.task} currentProject={props.currentProject.scrum_project}
                                  taskInfoHandler={taskInfoHandler}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getSprints, setCurrentTask})
)(TaskBacklogContainer)
