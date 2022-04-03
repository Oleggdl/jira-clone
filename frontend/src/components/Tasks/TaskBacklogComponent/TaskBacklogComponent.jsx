import React from 'react'
import {EllipsisOutlined, SolutionOutlined} from "@ant-design/icons"
import './TaskBacklog.scss'

const TaskBacklogComponent = ({task, currentProject, taskInfoHandler}) => {

    return (
        <>
            <button onClick={() => taskInfoHandler(task)} className="task-backlog-component-container">
                <div className="task-backlog-component-key">
                    <SolutionOutlined/>
                    <div>{currentProject.project_key}-{task ? task.id : 'id'}</div>
                </div>

                <div className="task-title">{task ? task.task_name : 'Task name'}</div>
                <div className="task-backlog-component-labels">Ready</div>
                <div className="task-backlog-component-settings"><EllipsisOutlined/></div>
            </button>
        </>
    )
}

export default TaskBacklogComponent
