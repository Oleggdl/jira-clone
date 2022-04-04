import React, {useState} from 'react'
import BacklogComponent from "./BacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {TaskContext} from "../../../context/TaskContext"
import {getTaskSprints} from "../../../redux/scrum/taskSprint-reducer"

const BacklogContainer = props => {

    const [isTaskInfo, setIsTaskInfo] = useState(false)

    const [backlogForProject, setBacklogForProject] = useState(props.backlogForProject)
    const [backlogForProjectSprint, setBacklogForProjectSprint] = useState(props.taskSprints)


    const onDragEnd = (result) => {
        const {destination, source} = result

        console.log(result)

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        let add;
        let active = backlogForProject
        let complete = backlogForProjectSprint
        // Source Logic
        if (source.droppableId === "Backlog") {
            add = active[source.index]
            active.splice(source.index, 1)
        } else {
            add = complete[source.index]
            complete.splice(source.index, 1)
        }

        // Destination Logic
        if (destination.droppableId === "Backlog") {
            active.splice(destination.index, 0, add)
        } else {
            complete.splice(destination.index, 0, add)
        }

        setBacklogForProjectSprint(complete)
        setBacklogForProject(active)
    }

    return (
        <>
            <TaskContext.Provider value={{isTaskInfo, setIsTaskInfo}}>
                <BacklogComponent sprints={props.sprints} isTaskInfo={isTaskInfo}
                                  backlogForProject={backlogForProject} setBacklogForProject={setBacklogForProject}
                                  backlogForProjectSprint={backlogForProjectSprint}
                                  setBacklogForProjectSprint={setBacklogForProjectSprint}
                                  onDragEnd={onDragEnd}/>
            </TaskContext.Provider>
        </>
    )
}

const mapStateToProps = (state) => ({
    sprints: state.sprintsReducer.sprints,
    backlogForProject: state.backlogReducer.backlogForProject,
    taskSprints: state.taskSprintReducer.taskSprints,
})

export default compose(
    connect(mapStateToProps, {getTaskSprints})
)(BacklogContainer)
