import React from 'react'
import './Sprint.scss'
import TaskBacklogContainer from "../../Tasks/TaskBacklogComponent/TaskBacklogContainer";

const SprintComponent = () => {


    return (
        <>
            <div className="sprint-container">
               <div className="sprint-container-header">
                   <h4>Sprint name</h4>
                   <div>23.03.2022</div>
                   <div> – </div>
                   <div>20.04.2022</div>
                   <div>(Tasks count: <span>4</span>)</div>
                   <button>Complete a sprint</button>
               </div>
                <TaskBacklogContainer/>
                <TaskBacklogContainer/>
                <TaskBacklogContainer/>
            </div>
        </>
    )
}

export default SprintComponent
