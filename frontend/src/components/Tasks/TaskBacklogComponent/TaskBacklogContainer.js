import React, {useContext} from 'react'
import TaskBacklogComponent from "./TaskBacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getSprints} from "../../../redux/scrum/sprints-reducer"
import {TaskContext} from "../../../context/TaskContext"
import {setCurrentTask} from "../../../redux/scrum/tasks-reducer"

const TaskBacklogContainer = props => {

    const {setIsTaskInfo} = useContext(TaskContext)

    const taskInfoHandler = (value) => {
        props.setCurrentTask(value)
        setIsTaskInfo(true)
    }

    return (
        <>
            <TaskBacklogComponent currentProject={props.currentProject.scrum_project}
                                  taskInfoHandler={taskInfoHandler} index={props.index} task={props.task}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getSprints, setCurrentTask})
)(TaskBacklogContainer)
