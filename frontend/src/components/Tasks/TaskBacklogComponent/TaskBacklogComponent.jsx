import React from 'react'
import {EllipsisOutlined, SolutionOutlined} from "@ant-design/icons"
import './TaskBacklog.scss'
import {Draggable} from "react-beautiful-dnd"

const TaskBacklogComponent = ({currentProject, taskInfoHandler, task, index}) => {

    return (
        <>
            <Draggable draggableId={task.task_scrum
                ? task.task_scrum.id.toString() : task.scrum_task_id.id.toString()} index={index}
            >
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div>
                            <div onClick={() => taskInfoHandler(task)} className="task-backlog-component-container">
                                <div className="task-backlog-component-key">
                                    <SolutionOutlined/>
                                    <div>{currentProject.project_key}-{task.task_scrum
                                        ? task.task_scrum.id : task.scrum_task_id.id}</div>
                                </div>

                                <div className="task-title">{task.scrum_task_id
                                    ? task.scrum_task_id.task_name
                                    : task.task_scrum.task_name}</div>
                                <div className="task-backlog-component-labels">Ready</div>
                                <div className="task-backlog-component-settings"><EllipsisOutlined/></div>
                            </div>
                        </div>
                    </div>
                )}

            </Draggable>
        </>
    )
}

export default TaskBacklogComponent
