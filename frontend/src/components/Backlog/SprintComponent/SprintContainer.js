import React, {useContext, useEffect, useRef, useState} from 'react'
import SprintComponent from "./SprintComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {
    createNewTaskSprint,
    createTaskSprintFromSprint,
    getTaskSprints,
    unsetTaskSprints
} from "../../../redux/taskSprint-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {deleteSprint, startSprint} from "../../../redux/sprints-reducer"
import {createBacklogElementFromSprint, getBacklogForProject} from "../../../redux/backlog-reducer"

const SprintContainer = props => {

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    // useEffect(() => {
    //     // props.unsetTaskSprints()
    //     props.getTaskSprints(props.sprint.id, headers)
    // }, [props.backlogElements])

    useEffect(() => {
        props.getTaskSprints(props.sprint.id, headers)
    }, [])

    useEffect(() => {
        props.getBacklogForProject(props.currentProject.scrum_project.id, headers)
    }, [props.taskSprints])

    const [isCreateTask, setIsCreateTask] = useState(false)
    const [isInputVisible, setIsInputVisible] = useState('input-visible')
    const [isSprintStartingMod, setIsSprintStartingMod] = useState(false)
    const [isSettingsSprint, setIsSettingsSprint] = useState(false)
    const [isDeleteSprint, setIsDeleteSprint] = useState(false)


    const taskInputRef = useRef(null)
    const sprintDelRef = useRef(null)

    const onSetIsCreateTask = () => {
        !!isCreateTask ? setIsCreateTask(false) : setIsCreateTask(true)
        setIsInputVisible('')
        taskInputRef.current.focus()
    }

    const addTaskToSprintHandler = event => {
        if (event.target !== taskInputRef.current) {
            if (!taskInputRef) {
                taskInputRef.current.value = null
            }
            setIsInputVisible('input-visible')
            setIsCreateTask(false)
        }
    }

    useEffect(() => {
        window.addEventListener("mousedown", event => addTaskToSprintHandler(event))
        return window.removeEventListener("mousedown", event => addTaskToSprintHandler(event))
    })

    const closeDeleteSprintHandler = event => {
        if (event.target === sprintDelRef.current) {
            setIsDeleteSprint(false)
        }
    }

    useEffect(() => {
        window.addEventListener("click", event => closeDeleteSprintHandler(event))
        return window.removeEventListener("click", event => closeDeleteSprintHandler(event))
    }, [])

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            const create_date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
            props.createNewTaskSprint({
                create_date: create_date,
                creator_id: null,
                executor_id: null,
                task_description: null,
                task_name: taskInputRef.current.value
            }, props.sprint.id, props.currentUser.id, headers)
            setIsCreateTask(false)
            setIsInputVisible('input-visible')
            taskInputRef.current.value = null
            props.unsetTaskSprints()
        }
    }

    const completeSprint = () => {
        if (props.sprints.length === 1) {
            props.taskSprints.map(sprint => {
                if (sprint.id === props.sprint.id) {
                    sprint.taskSprint.map(taskSprint =>
                        props.createBacklogElementFromSprint(taskSprint.id, taskSprint.task_scrum.id,
                            props.currentProject.scrum_project.id, headers))
                }
                return null
            })
        } else {
            props.taskSprints.map(sprint => {
                if (sprint.id === props.sprint.id) {
                    sprint.taskSprint.map(taskSprint =>
                        props.createTaskSprintFromSprint(taskSprint.id, taskSprint.task_scrum.id,
                            props.sprints[1].id, headers))
                }
                return null
            })
        }
        props.deleteSprint(props.sprint.id, headers)
    }

    const onKeyUp = (e) => {
        // if (e.keyCode === 13) {
        // }
    }

    const isSettingsSprintHandler = () => {
        !!isSettingsSprint ? setIsSettingsSprint(false) : setIsSettingsSprint(true)
    }

    const deleteSprintHandler = () => {

        if (props.currentProject.user_role.id === 1) {
            props.taskSprints.map(sprint => {
                if (sprint.id === props.sprint.id) {
                    sprint.taskSprint.map(taskSprint =>
                        props.createBacklogElementFromSprint(taskSprint.id, taskSprint.task_scrum.id,
                            props.currentProject.scrum_project.id, headers))
                }
                return null
            })
            props.deleteSprint(props.sprint.id, headers)
        } else {
            console.log("You can't delete sprint")
        }

    }

    return (
        <>
            <SprintComponent sprint={props.sprint} taskSprints={props.taskSprints} index={props.index}
                             backlogForProjectSprint={props.backlogForProjectSprint}
                             onSetIsCreateTask={onSetIsCreateTask} taskInputRef={taskInputRef}
                             isCreateTask={isCreateTask} onKeyDown={onKeyDown} isInputVisible={isInputVisible}
                             onKeyUp={onKeyUp} setIsSprintStartingMod={setIsSprintStartingMod}
                             isSprintStartingMod={isSprintStartingMod} completeSprint={completeSprint}
                             isSettingsSprint={isSettingsSprint} setIsSettingsSprint={setIsSettingsSprint}
                             isSettingsSprintHandler={isSettingsSprintHandler} isDeleteSprint={isDeleteSprint}
                             setIsDeleteSprint={setIsDeleteSprint} sprintDelRef={sprintDelRef}
                             deleteSprintHandler={deleteSprintHandler}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    taskSprints: state.taskSprintReducer.taskSprints,
    currentUser: state.userReducer.currentUser,
    currentProject: state.projectsReducer.currentProject,
    sprints: state.sprintsReducer.sprints,
    backlogElements: state.backlogReducer.backlogElements
})

export default compose(
    connect(mapStateToProps, {
        getTaskSprints, createNewTaskSprint, unsetTaskSprints, startSprint, deleteSprint,
        createBacklogElementFromSprint, createTaskSprintFromSprint, getBacklogForProject
    })
)(SprintContainer)
