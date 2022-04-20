import React from 'react'
import {EllipsisOutlined, SolutionOutlined} from "@ant-design/icons"
import './TaskBoard.scss'

const TaskBoardComponent = ({
                                taskInfoHandler, taskSprint, currentProject, getCurrentTaskFromServer,
                                setIsTaskInfo, marksScrumAll
                            }) => {

    return (
        <>
            <div className="task-component-container">
                <div className="task-component-settings" onMouseUp={() => setIsTaskInfo(true)} onMouseDown={() => {
                    taskInfoHandler(taskSprint)
                    getCurrentTaskFromServer(taskSprint)
                }}><EllipsisOutlined/></div>
                <div className="task-title">{taskSprint?.task_scrum?.task_name}</div>
                <div className="task-board-marks">
                    {marksScrumAll[taskSprint.task_scrum.id] && marksScrumAll[taskSprint.task_scrum.id].map(mark =>
                        <div key={mark.id} className="task-component-labels"
                             style={{backgroundColor: `${mark.mark_color}`}}>{mark.mark_text}</div>)}
                </div>
                <div className="task-component-key">
                    <SolutionOutlined/>
                    <div style={{}}>{currentProject.project_key}-{taskSprint.id}</div>
                </div>
            </div>
        </>
    )
}

export default TaskBoardComponent
