import React, {useContext} from 'react'
import TaskBoardComponent from "./TaskBoardComponent"
import {TaskContext} from "../../../context/TaskContext";

const TaskBoardContainer = () => {

    const {isTaskInfo, setIsTaskInfo} = useContext(TaskContext)

    const taskInfoHandler = () => {
        setIsTaskInfo(true)
    }

    return (
        <>
            <TaskBoardComponent taskInfoHandler={taskInfoHandler} isTaskInfo={isTaskInfo}/>
        </>
    )
}

export default TaskBoardContainer
