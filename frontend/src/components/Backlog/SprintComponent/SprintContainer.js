import React, {useContext, useEffect, useRef, useState} from 'react'
import SprintComponent from "./SprintComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {createNewTaskSprint, getTaskSprints, unsetTaskSprints} from "../../../redux/scrum/taskSprint-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {deleteSprint, startSprint} from "../../../redux/scrum/sprints-reducer";

const SprintContainer = props => {

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }
    useEffect(() => {
        props.getTaskSprints(props.sprint.id, headers)
    }, [])

    const [isCreateTask, setIsCreateTask] = useState(false)
    const [isInputVisible, setIsInputVisible] = useState('input-visible')
    const [isSprintStartingMod, setIsSprintStartingMod] = useState(false)


    const taskInputRef = useRef(null)

    const onSetIsCreateTask = () => {
        !!isCreateTask ? setIsCreateTask(false) : setIsCreateTask(true)
        setIsInputVisible('')
        taskInputRef.current.focus()
    }

    useEffect(() => {
        window.addEventListener("mousedown", function (event) {
            if (event.target !== taskInputRef.current) {
                if (!taskInputRef) {
                    taskInputRef.current.value = null
                }
                setIsInputVisible('input-visible')
                setIsCreateTask(false)
            }
        })
        return window.addEventListener("mousedown", function (event) {
            if (event.target !== taskInputRef.current) {
                if (!taskInputRef) {
                    taskInputRef.current.value = null
                }
                setIsInputVisible('input-visible')
                setIsCreateTask(false)
            }
        })
    })

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
        props.deleteSprint(props.sprint.id, headers)
        // props.startSprint({
        //     is_started: false
        // }, props.sprint.id, props.currentProject.scrum_project.id, headers)
    }

    const onKeyUp = (e) => {
        // if (e.keyCode === 13) {
        //     setTimeout(() => {
        //         props.getTaskSprints(props.sprint.id, headers)
        //     }, 100)
        // }
    }

    return (
        <>
            <SprintComponent sprint={props.sprint} taskSprints={props.taskSprints} index={props.index}
                             backlogForProjectSprint={props.backlogForProjectSprint}
                             onSetIsCreateTask={onSetIsCreateTask} taskInputRef={taskInputRef}
                             isCreateTask={isCreateTask} onKeyDown={onKeyDown} isInputVisible={isInputVisible}
                             onKeyUp={onKeyUp} setIsSprintStartingMod={setIsSprintStartingMod}
                             isSprintStartingMod={isSprintStartingMod} completeSprint={completeSprint}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    taskSprints: state.taskSprintReducer.taskSprints,
    currentUser: state.userReducer.currentUser,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getTaskSprints, createNewTaskSprint, unsetTaskSprints, startSprint, deleteSprint})
)(SprintContainer)
