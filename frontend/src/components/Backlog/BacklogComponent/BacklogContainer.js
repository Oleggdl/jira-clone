import React, {useContext, useEffect, useState} from 'react'
import BacklogComponent from "./BacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {TaskContext} from "../../../context/TaskContext"
import {createTaskSprint, unsetTaskSprints} from "../../../redux/scrum/taskSprint-reducer"
import {createBacklogElementFromSprint, getBacklogForProject} from "../../../redux/scrum/backlog-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {TaskSprintContext} from "../../../context/TaskSprintContext";

const BacklogContainer = props => {

    const [isTaskInfo, setIsTaskInfo] = useState(false)

    const [backlogForProject, setBacklogForProject] = useState(props.backlogForProject)
    const [backlogForProjectSprint, setBacklogForProjectSprint] = useState([])


    const [currentSprint, setCurrentSprint] = useState(null)
    const [currentBacklog, setCurrentBacklog] = useState(null)
    const [currentTask, setCurrentTask] = useState(null)

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

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
            // props.createBacklogElementFromSprint(6, 8, 3, headers)//todo
        } else {
            complete.splice(destination.index, 0, add)
            // props.createTaskSprint(currentSprint?.id, currentTask, currentBacklog, headers)//todo
        }

        setBacklogForProjectSprint(complete)
        setBacklogForProject(active)
    }


    useEffect(() => {


        if (!!props.taskSprints) {
            return props.unsetTaskSprints()
        }
    }, [])

    return (
        <>
            <TaskContext.Provider value={{isTaskInfo, setIsTaskInfo}}>
                <TaskSprintContext.Provider value={{setCurrentSprint, setCurrentBacklog, setCurrentTask}}>
                    <BacklogComponent sprints={props.sprints} isTaskInfo={isTaskInfo}
                                      backlogForProject={backlogForProject} setBacklogForProject={setBacklogForProject}
                                      backlogForProjectSprint={backlogForProjectSprint}
                                      setBacklogForProjectSprint={setBacklogForProjectSprint}
                                      onDragEnd={onDragEnd}/>
                </TaskSprintContext.Provider>
            </TaskContext.Provider>
        </>
    )
}

const mapStateToProps = (state) => ({
    sprints: state.sprintsReducer.sprints,
    backlogForProject: state.backlogReducer.backlogForProject,
    taskSprints: state.taskSprintReducer.taskSprints,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {unsetTaskSprints, getBacklogForProject, createTaskSprint, createBacklogElementFromSprint})
)(BacklogContainer)
