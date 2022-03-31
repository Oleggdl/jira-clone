import React from 'react'
import './Sprint.scss'
import TaskBacklogContainer from "../../Tasks/TaskBacklogComponent/TaskBacklogContainer"

const SprintComponent = ({sprint}) => {

    const tasks = [{
        id: 1,
        task_name: "Test task",
        create_date: "30.03.2022 00:15:19",
        task_description: "Test task description",
        creator_id: null,
        executor_id: "executor_3",
        sprint_id: "sprint_1",
        state_id: null
    }]

    return (
        <>
            <div className="sprint-container">
                <div className="sprint-container-header">
                    <h4>{sprint.sprint_name}</h4>
                    <div>23.03.2022</div>
                    <div> –</div>
                    <div>20.04.2022</div>
                    <div>(Tasks count: <span>{tasks.length}</span>)</div>
                    <button>Complete a sprint</button>
                </div>
                {tasks.map(task => <TaskBacklogContainer key={task.id} task={task}/>)}
                <button className="create-task-button" onClick={() => {
                }}>Create task
                </button>
            </div>
        </>
    )
}

export default SprintComponent
