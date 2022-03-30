import React from 'react'
import {EllipsisOutlined, SolutionOutlined} from "@ant-design/icons"
import './TaskBacklog.scss'

const TaskBacklogComponent = ({task}) => {

    return (
        <>
            <div className="task-backlog-component-container">
                <div className="task-backlog-component-key">
                    <SolutionOutlined/>
                    <div style={{}}>TST-{task ? task.id : 'id'}</div>
                </div>

                <div className="task-title">{task ? task.task_name : 'Task name'}</div>
                <div className="task-backlog-component-labels">Ready</div>
                <div className="task-backlog-component-settings"><EllipsisOutlined /></div>
            </div>
        </>
    )
}

export default TaskBacklogComponent
