import React from 'react'
import './BacklogElement.scss'
import TaskBacklogContainer from "../../Tasks/TaskBacklogComponent/TaskBacklogContainer";

const BacklogElementComponent = ({tasks}) => {


    return (
        <>
            <div className="sprint-container">
                <div className="sprint-container-header">
                    <h4>Backlog</h4>
                    <div>(Tasks count: <span>4</span>)</div>
                    <button>Create a sprint</button>
                </div>
                {tasks.map(task => <TaskBacklogContainer key={task.id} task={task}/>)}

            </div>
        </>
    )
}

export default BacklogElementComponent
