import React, {useContext, useEffect, useRef, useState} from 'react'
import BacklogElementComponent from "./BacklogElementComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {AuthContext} from "../../../context/AuthContext"
import {createSprint} from "../../../redux/scrum/sprints-reducer"
import {createBacklogElement} from "../../../redux/scrum/backlog-reducer"


const BacklogElementContainer = (props) => {

    const [isInputVisible, setIsInputVisible] = useState('input-visible')
    const [isCreateTask, setIsCreateTask] = useState(false)
    const taskInputRef = useRef(null)

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const onSetIsCreateTask = () => {
        !!isCreateTask ? setIsCreateTask(false) : setIsCreateTask(true)
        setIsInputVisible('')
        taskInputRef.current.focus()
    }

    const createSprintHandler = () => {
        props.createSprint(props.currentProject.scrum_project.id, headers)
    }

    useEffect(() => {
        if (!!taskInputRef) {
            window.addEventListener("mousedown", function (event) {
                if (event.target !== taskInputRef.current) {
                    if (taskInputRef.current !== null) {
                        taskInputRef.current.value = null
                    }
                    setIsCreateTask(false)
                    setIsInputVisible('input-visible')
                }
            })
            return window.removeEventListener("mousedown", function (event) {
                if (event.target !== taskInputRef.current) {
                    if (taskInputRef.current !== null) {
                        taskInputRef.current.value = null
                    }
                    setIsCreateTask(false)
                    setIsInputVisible('input-visible')
                }
            })
        }
    }, [])

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            const create_date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
            props.createBacklogElement({
                create_date: create_date,
                creator_id: null,
                executor_id: null,
                task_description: null,
                task_name: taskInputRef.current.value
            }, props.currentProject.id, props.currentUser.id, props.currentUser.id, headers)
            taskInputRef.current.value = null
            setIsCreateTask(false)
            setIsInputVisible('input-visible')
        }
    }

    return (
        <>
            <BacklogElementComponent tasks={props.tasks} backlogForProject={props.backlogForProject}
                                     createSprintHandler={createSprintHandler} isInputVisible={isInputVisible}
                                     setBacklogForProject={props.setBacklogForProject} taskInputRef={taskInputRef}
                                     onKeyDown={onKeyDown} onSetIsCreateTask={onSetIsCreateTask}
                                     isCreateTask={isCreateTask}
            />
        </>
    )
}

const mapStateToProps = (state) => ({
    sprints: state.sprintsReducer.sprints,
    currentProject: state.projectsReducer.currentProject,
    backlogForProject: state.backlogReducer.backlogForProject,
    currentUser: state.userReducer.currentUser,
})

export default compose(
    connect(mapStateToProps, {createSprint, createBacklogElement})
)(BacklogElementContainer)
