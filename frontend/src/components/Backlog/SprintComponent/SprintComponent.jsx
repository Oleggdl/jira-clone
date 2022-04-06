import React from 'react'
import './Sprint.scss'
import TaskBacklogContainer from "../../Tasks/TaskBacklogComponent/TaskBacklogContainer"
import {Droppable} from "react-beautiful-dnd"

const SprintComponent = ({
                             sprint, index, backlogForProjectSprint, taskSprints, isCreateTask, onSetIsCreateTask,
                             onKeyDown, taskInputRef, isInputVisible, onKeyUp
                         }) => {

    const taskCount = taskSprints.map(taskSprint => taskSprint.id === sprint.id ? taskSprint.taskSprint.length : null)

    return (
        <>
            <div className="sprint-container">
                <div className="sprint-container-header">
                    <h4>{sprint.sprint_name || `BoardSprint ${index + 1}`}</h4>

                    {sprint.start_date && <>
                        <div>{sprint.start_date}</div>
                        <div> –</div>
                        <div>{sprint.end_date}</div>
                    </>}
                    <div>(Tasks count: <span>{taskCount}</span>)</div>
                    {sprint.is_started ? <button>Complete a sprint</button> :
                        <button>Start a sprint</button>}
                </div>
                <Droppable droppableId={`Sprint${sprint?.id}`}>
                    {provided => (
                        <div className={`todos`} ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                taskSprints.map(taskSprint => {
                                    return taskSprint.id === sprint.id ? (taskSprint.taskSprint.map((task, index) => (
                                        <TaskBacklogContainer index={index} task={task} key={task.id}/>
                                    ))) : false
                                })
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <input className={`task-creations-input ${isInputVisible}`} ref={taskInputRef} onKeyDown={e => {
                    onKeyDown(e)
                }} onKeyUp={onKeyUp}/>
                {!isCreateTask &&
                    <button style={{display: "block"}} className="create-task-button" onMouseUp={() => {
                        onSetIsCreateTask()
                    }}>Create task</button>}
            </div>
        </>
    )
}

export default SprintComponent
