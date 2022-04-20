import React from 'react'
import './BacklogElement.scss'
import TaskBacklogContainer from "../../Tasks/TaskBacklogComponent/TaskBacklogContainer"
import {Droppable} from "react-beautiful-dnd"

const BacklogElementComponent = ({
                                     backlogForProject, createSprintHandler, isInputVisible, taskInputRef,
                                     onKeyDown, onSetIsCreateTask, isCreateTask
                                 }) => {

    return (
        <>
            <div className="sprint-container">
                <div className="sprint-container-header">
                    <h4>Backlog</h4>
                    <div>(Tasks count: <span>{backlogForProject?.length}</span>)</div>
                    <button className="create-sprint-button" onClick={createSprintHandler}>Create a sprint</button>
                </div>
                <Droppable droppableId="Backlog">
                    {provided => (
                        <div className={`todos`} ref={provided.innerRef} {...provided.droppableProps}>
                            {backlogForProject?.map((task, index) => (
                                <TaskBacklogContainer index={index} task={task} key={task.id}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <input className={`task-creations-input ${isInputVisible}`} ref={taskInputRef} onKeyDown={e => {
                    onKeyDown(e)
                }}/>
                {!isCreateTask &&
                    <button style={{display: "block"}} className="create-task-button" onMouseUp={() => {
                        onSetIsCreateTask()
                    }}>Create task</button>}
            </div>
        </>
    )
}

export default BacklogElementComponent
