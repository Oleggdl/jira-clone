import React, {useContext, useEffect} from 'react'
import TaskBoardComponent from "./TaskBoardComponent"
import {TaskContext} from "../../../context/TaskContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getCurrentTaskFromServer, setCurrentTask} from "../../../redux/scrum/tasks-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getMarksScrum, getMarksScrumAll} from "../../../redux/scrum/marksScrum-reducer";

const TaskBoardContainer = (props) => {

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const {setIsTaskInfo} = useContext(TaskContext)

    const taskInfoHandler = (value) => {
        props.setCurrentTask(value)
    }

    const getCurrentTaskFromServer = (value) => {
        const id = !!value.scrum_task_id
            ? value.scrum_task_id.id
            : value.task_scrum.id
        props.getCurrentTaskFromServer(id, headers)
    }

    useEffect(() => {
        props.getMarksScrumAll(props.taskSprint.task_scrum.id, headers)
    }, [])

    return (
        <>
            <TaskBoardComponent taskInfoHandler={taskInfoHandler} taskSprint={props.taskSprint}
                                currentProject={props.currentProject.scrum_project}
                                getCurrentTaskFromServer={getCurrentTaskFromServer}
                                setIsTaskInfo={setIsTaskInfo} marksScrumAll={props.marksScrumAll}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentProject: state.projectsReducer.currentProject,
    marksScrum: state.marksScrumReducer.marksScrum,
    marksScrumAll: state.marksScrumReducer.marksScrumAll
})

export default compose(
    connect(mapStateToProps, {getCurrentTaskFromServer, setCurrentTask, getMarksScrumAll})
)(TaskBoardContainer)
