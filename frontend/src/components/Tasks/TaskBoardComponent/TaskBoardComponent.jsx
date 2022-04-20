import React from 'react'
import {EllipsisOutlined, SolutionOutlined} from "@ant-design/icons"
import './TaskBoard.scss'

const TaskBoardComponent = ({
                                taskInfoHandler, taskSprint, currentProject, getCurrentTaskFromServer,
                                setIsTaskInfo, marksScrumAll
                            }) => {

    return (
        <>
            <button onMouseUp={() => setIsTaskInfo(true)} className="task-component-container" onMouseDown={() => {
                taskInfoHandler(taskSprint)
                getCurrentTaskFromServer(taskSprint)
            }}>
                <div className="task-component-settings"><EllipsisOutlined/></div>
                <div className="task-title">{taskSprint?.task_scrum?.task_name}</div>
                {marksScrumAll[taskSprint.task_scrum.id] && marksScrumAll[taskSprint.task_scrum.id].map(mark =>
                    <div key={mark.id} className="task-component-labels"
                         style={{backgroundColor: `${mark.mark_color}`}}>{mark.mark_text}</div>)}
                <div className="task-component-key">
                    <SolutionOutlined/>
                    <div style={{}}>{currentProject.project_key}-{taskSprint.id}</div>
                </div>
            </button>
        </>
    )
}

export default TaskBoardComponent
