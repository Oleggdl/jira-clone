import React from 'react'
import {EllipsisOutlined, SolutionOutlined} from "@ant-design/icons"
import './TaskBoard.scss'

const TaskBoardComponent = ({
                                taskInfoHandler, taskSprint, currentProject, getCurrentTaskFromServer,
                                setIsTaskInfo, marksScrumAll, provided
                            }) => {

    return (
        <>
            <div ref={provided.innerRef}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}>
                <div className="task-component-container">
                    <div className="task-component-settings" onMouseUp={() => setIsTaskInfo(true)} onMouseDown={() => {
                        taskInfoHandler(taskSprint)
                        getCurrentTaskFromServer(taskSprint)
                    }}><EllipsisOutlined/></div>
                    {/*<div className="task-title">{taskSprint?.task_scrum?.task_name}</div>*/}
                    <div className="task-title">{taskSprint?.id} / {taskSprint?.index}</div>
                    <div className="task-board-marks">
                        {marksScrumAll[taskSprint.task_scrum.id] && marksScrumAll[taskSprint.task_scrum.id].map(mark =>
                            <div key={mark.id} className="task-component-labels"
                                 style={{backgroundColor: `${mark.mark_color}`}}>{mark.mark_text}</div>)}
                    </div>
                    <div className="task-component-key">
                        <SolutionOutlined/>
                        <div>{currentProject.project_key}-{taskSprint.task_scrum
                            ? taskSprint.task_scrum.id : taskSprint.scrum_task_id.id}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskBoardComponent
