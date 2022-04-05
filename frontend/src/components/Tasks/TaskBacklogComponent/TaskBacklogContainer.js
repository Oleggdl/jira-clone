import React, {useContext} from 'react'
import TaskBacklogComponent from "./TaskBacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {getSprints} from "../../../redux/scrum/sprints-reducer"
import {TaskContext} from "../../../context/TaskContext"
import {getCurrentTaskFromServer, setCurrentTask} from "../../../redux/scrum/tasks-reducer"
import {AuthContext} from "../../../context/AuthContext";
// import {TaskSprintContext} from "../../../context/TaskSprintContext"

const TaskBacklogContainer = props => {

    const {setIsTaskInfo} = useContext(TaskContext)
    // const {setCurrentBacklog, setCurrentTask} = useContext(TaskSprintContext)

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const taskInfoHandler = (value) => {
        const id =!!value.scrum_task_id
            ? value.scrum_task_id.id
            : value.task_scrum.id
        props.setCurrentTask(value)
        setIsTaskInfo(true)
        props.getCurrentTaskFromServer(id, headers)
    }

    return (
        <>
            <TaskBacklogComponent currentProject={props.currentProject.scrum_project}
                                  taskInfoHandler={taskInfoHandler} index={props.index} task={props.task}
                                  currentTaskFromServer={props.currentTaskFromServer}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentProject: state.projectsReducer.currentProject,


})

export default compose(
    connect(mapStateToProps, {getSprints, setCurrentTask, getCurrentTaskFromServer})
)(TaskBacklogContainer)
