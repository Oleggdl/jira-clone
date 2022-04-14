import React, {useContext, useEffect, useRef, useState} from 'react'
import BacklogComponent from "./BacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {TaskContext} from "../../../context/TaskContext"
import {createTaskSprint, searchTasksInSprints, unsetTaskSprints} from "../../../redux/scrum/taskSprint-reducer"
import {createBacklogElementFromSprint, getBacklogForProject, searchTasks} from "../../../redux/scrum/backlog-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getSprints} from "../../../redux/scrum/sprints-reducer"


const BacklogContainer = props => {

    const [isTaskInfo, setIsTaskInfo] = useState(false)
    const [backlogForProject, setBacklogForProject] = useState(props.backlogForProject)
    const [backlogForProjectSprint, setBacklogForProjectSprint] = useState([])


    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result
        const draggableIdArray = draggableId.split(',')

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
            // add = active[source.index]
            // active.splice(source.index, 1)
        } else {
            // add = complete[source.index]
            // complete.splice(source.index, 1)
        }

        // Destination Logic
        if (destination.droppableId === "Backlog") {
            // active.splice(destination.index, 0, add)
            props.createBacklogElementFromSprint(draggableIdArray[0], draggableIdArray[1],
                props.currentProject.scrum_project.id, headers)
            props.getBacklogForProject(props.currentProject.scrum_project.id, headers)
        } else {
            // complete.splice(destination.index, 0, add)
            props.createTaskSprint(destination.droppableId, draggableIdArray[1],
                draggableIdArray[0], headers)
            props.getBacklogForProject(props.currentProject.scrum_project.id, headers)
        }

        setBacklogForProjectSprint(complete)
        setBacklogForProject(active)
    }

    const onSearch = query => {
        const q = query.replace(/[\\\}\{\/\]\[\+\-\.\,\#\@\!\%\^\&\*(\)\`\~\$\;\:]/g, '')
        props.searchTasks(q, props.currentProject.scrum_project.id, headers)
        props.searchTasksInSprints(q, 2, headers)

        // props.sprints && props.sprints.map(sprint => props.searchTasksInSprints(q, sprint.id, headers))
    }

    function usePrevious(value) {
        const ref = useRef()
        useEffect(() => {
            ref.current = value
        }, [value])
        return ref.current
    }

    const previousValue = usePrevious(props.sprints)

    useEffect(() => {


        if (!previousValue || props.backlogForProject > previousValue) {
            // props.getBacklogForProject(props.currentProject.scrum_project.id, headers)
            // props.getSprints(props.currentProject.scrum_project.id, headers)
        }
    })


    useEffect(() => {
        if (!!props.taskSprints) {
            return props.unsetTaskSprints()
        }
    }, [])

    return (
        <>
            <TaskContext.Provider value={{isTaskInfo, setIsTaskInfo}}>
                <BacklogComponent sprints={props.sprints} isTaskInfo={isTaskInfo}
                                  backlogForProject={props.backlogForProject}
                                  setBacklogForProject={setBacklogForProject}
                                  backlogForProjectSprint={backlogForProjectSprint} onSearch={onSearch}
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
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {
        unsetTaskSprints, getBacklogForProject, createTaskSprint, getSprints,
        createBacklogElementFromSprint, searchTasks, searchTasksInSprints
    })
)(BacklogContainer)
