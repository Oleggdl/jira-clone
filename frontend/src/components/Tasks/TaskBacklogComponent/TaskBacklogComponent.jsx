import React from 'react'
import {EllipsisOutlined, SolutionOutlined} from "@ant-design/icons"
import './TaskBacklog.scss'

const TaskBacklogComponent = ({
                                  currentProject, taskInfoHandler, task, index, getCurrentTaskFromServer,
                                  setIsTaskInfo, marksScrumAll, provided
                              }) => {

    const taskScrumId = task.task_scrum ? task.task_scrum.id.toString() : task.scrum_task_id.id.toString()

    return (
        <>
            <div ref={provided.innerRef}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}>
                <div className="task-backlog-component-container">
                    <div className="task-backlog-component-key">
                        <SolutionOutlined/>
                        <div>{currentProject.project_key}-{task.task_scrum
                            ? task.task_scrum.id : task.scrum_task_id.id}</div>
                    </div>
                    <div className="task-title">{task.scrum_task_id
                        ? task.scrum_task_id.task_name
                        : task.task_scrum.task_name}</div>
                    <div className="task-backlog-component-labels">
                        {marksScrumAll[taskScrumId] && marksScrumAll[taskScrumId].map(mark =>
                            <div className="mark-element mark-element-backlog"
                                 style={{backgroundColor: mark.mark_color}}
                                 key={mark.id}>{mark.mark_text}
                            </div>)}
                    </div>
                    <div className="task-backlog-component-settings" onMouseUp={() => setIsTaskInfo(true)}
                         onMouseDown={() => {
                             taskInfoHandler(task)
                             getCurrentTaskFromServer(task)
                         }}><EllipsisOutlined/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskBacklogComponent
