import React from 'react'
import './Sprint.scss'
import TaskBacklogContainer from "../../Tasks/TaskBacklogComponent/TaskBacklogContainer"
import {Droppable} from "react-beautiful-dnd"

const SprintComponent = ({sprint, index, backlogForProjectSprint}) => {

    // const tasks = [{
    //     id: 1,
    //     task_name: "Test task",
    //     create_date: "30.03.2022 00:15:19",
    //     task_description: "Test task description",
    //     creator_id: null,
    //     executor_id: "executor_3",
    //     sprint_id: "sprint_1",
    //     state_id: null
    // }]
    //
    // console.log(sprint)

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
                    <div>(Tasks count: <span>{backlogForProjectSprint.length}</span>)</div>
                    {sprint.is_started ? <button>Complete a sprint</button> :
                        <button>Start a sprint</button>}
                </div>
                <Droppable droppableId="Sprint">
                    {provided => (
                        <div className={`todos`} ref={provided.innerRef} {...provided.droppableProps}>
                            {backlogForProjectSprint?.map((task, index) => (
                                <TaskBacklogContainer index={index} task={task} key={task.id}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <button className="create-task-button" onClick={() => {
                }}>Create task
                </button>
            </div>
        </>
    )
}

export default SprintComponent
