import React, {useContext} from 'react'
import TaskBoardComponent from "./TaskBoardComponent"
import {TaskContext} from "../../../context/TaskContext"

const TaskBoardContainer = () => {

    const {setIsTaskInfo} = useContext(TaskContext)

    const taskInfoHandler = () => {
        setIsTaskInfo(true)
    }

    return (
        <>
            <TaskBoardComponent taskInfoHandler={taskInfoHandler}/>
        </>
    )
}

export default TaskBoardContainer
