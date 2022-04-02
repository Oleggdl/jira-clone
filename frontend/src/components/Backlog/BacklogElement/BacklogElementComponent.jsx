import React from 'react'
import './BacklogElement.scss'
import TaskBacklogContainer from "../../Tasks/TaskBacklogComponent/TaskBacklogContainer"

const BacklogElementComponent = ({tasks, backlogForProject}) => {


    return (
        <>
            <div className="sprint-container">
                <div className="sprint-container-header">
                    <h4>Backlog</h4>
                    <div>(Tasks count: <span>{tasks.length}</span>)</div>
                    <button>Create a sprint</button>
                </div>
                {backlogForProject.map(task => <TaskBacklogContainer key={task.scrum_task_id.id}
                                                                     task={task.scrum_task_id}/>)}

            </div>
        </>
    )
}

export default BacklogElementComponent
