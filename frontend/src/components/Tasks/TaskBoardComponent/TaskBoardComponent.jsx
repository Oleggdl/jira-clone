import React from 'react'
import {EllipsisOutlined, SolutionOutlined} from "@ant-design/icons"
import './TaskBoard.scss'

const TaskBoardComponent = ({
                                taskInfoHandler, taskSprint, currentProject, getCurrentTaskFromServer,
                                setIsTaskInfo
                            }) => {

    return (
        <>
            <button onMouseDown={() => {
                taskInfoHandler(taskSprint)
                getCurrentTaskFromServer(taskSprint)
            }} className="task-component-container"
                    onMouseUp={() => setIsTaskInfo(true)}
            >
                <div className="task-component-settings"><EllipsisOutlined/></div>
                <div className="task-title">{taskSprint?.task_scrum?.task_name}</div>
                <div className="task-component-labels">Ready</div>
                <div className="task-component-key">
                    <SolutionOutlined/>
                    <div style={{}}>{currentProject.project_key}-{taskSprint.id}</div>
                </div>
            </button>
        </>
    )
}

export default TaskBoardComponent
