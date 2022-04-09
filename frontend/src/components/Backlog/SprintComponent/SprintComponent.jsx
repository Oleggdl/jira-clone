import React from 'react'
import './Sprint.scss'
import TaskBacklogContainer from "../../Tasks/TaskBacklogComponent/TaskBacklogContainer"
import {Droppable} from "react-beautiful-dnd"
import {Button} from "antd";
import SprintStartWindowContainer from "./SprintStartWindow/SprintStartWindowContainer"

const SprintComponent = ({
                             sprint, index, taskSprints, isCreateTask, onSetIsCreateTask,
                             onKeyDown, taskInputRef, isInputVisible, onKeyUp, setIsSprintStartingMod,
                             isSprintStartingMod, completeSprint
                         }) => {

    const taskCount = taskSprints.map(taskSprint => taskSprint.id === sprint.id ? taskSprint.taskSprint.length : null)

    return (
        <>
            {isSprintStartingMod && <SprintStartWindowContainer setIsSprintStartingMod={setIsSprintStartingMod}
                                                                sprint={sprint} index={index} taskCount={taskCount}/>}
            <div className="sprint-container">
                <div className="sprint-container-header">
                    <h4>{sprint.sprint_name || `BoardSprint ${index + 1}`}</h4>

                    {sprint.start_date && <>
                        <div>{sprint.start_date}</div>
                        <div> –</div>
                        <div>{sprint.end_date}</div>
                    </>}
                    <div>(Tasks count: <span>{taskCount}</span>)</div>
                    {sprint.is_started ?
                        <Button className="start-sprint-button" type="primary"
                                onClick={completeSprint}>Complete a sprint</Button>
                        : (index === 0 ? <Button className="start-sprint-button" type="primary"
                                                 onClick={() => setIsSprintStartingMod(true)}>Start a sprint</Button>
                            : <Button disabled={true}>Start a sprint</Button>)}
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
