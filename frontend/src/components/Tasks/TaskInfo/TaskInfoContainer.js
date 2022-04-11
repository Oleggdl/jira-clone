import React, {useContext, useEffect, useRef, useState} from 'react'
import TaskInfoComponent from "./TaskInfoComponent"
import {useForm} from "antd/es/form/Form"
import {TaskContext} from "../../../context/TaskContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getSprints} from "../../../redux/scrum/sprints-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getCurrentTaskFromServer, updateTaskDescription, updateTaskName} from "../../../redux/scrum/tasks-reducer"
import {deleteTask, getBacklogForProject} from "../../../redux/scrum/backlog-reducer"

const TaskInfoContainer = (props) => {

    const [isComments, setIsComments] = useState(true)
    const [isCommentsActive, setIsCommentsActive] = useState('button-active')
    const [isHistoryActive, setIsHistoryActive] = useState('')
    const [isTaskNameEditable, setIsTaskNameEditable] = useState(false)
    const [isDeleteTask, setIsDeleteTask] = useState(false)


    const isCommentsHandler = () => {
        setIsComments(true)
        setIsCommentsActive('button-active')
        setIsHistoryActive('')
    }

    const isHistoryHandler = () => {
        setIsComments(false)
        setIsCommentsActive('')
        setIsHistoryActive('button-active')
    }

    const taskInfoWrapper = useRef()
    const taskDelRef = useRef()
    const {setIsTaskInfo} = useContext(TaskContext)
    const taskInfoCloseHandler = () => {
        setIsTaskInfo(false)
    }

    useEffect(() => {
        window.addEventListener("click", function (event) {
            if (event.target === taskInfoWrapper.current) {
                setIsTaskInfo(false)
            }
        })
        return window.removeEventListener("click", function (event) {
            if (event.target === taskInfoWrapper.current) {
                setIsTaskInfo(false)
            }
        })
    }, [])

    useEffect(() => {
        window.addEventListener("click", function (event) {
            if (event.target === taskDelRef.current) {
                setIsDeleteTask(false)
            }
        })
        return window.removeEventListener("click", function (event) {
            if (event.target === taskDelRef.current) {
                setIsDeleteTask(false)
            }
        })
    }, [])

    const [form] = useForm()
    const [formTaskName] = useForm()

    const textAreaDescriptionFocus = useRef(null)
    const [isTextAreaFocus, setIsTextAreaFocus] = useState(false)

    const onReset = () => {
        form.resetFields()
        setIsTextAreaFocus(false)
    }

    useEffect(() => {
        textAreaDescriptionFocus.current.resizableTextArea.textArea.onfocus = function () {
            setIsTextAreaFocus(true)
        }
    }, [textAreaDescriptionFocus, onReset])


    const currentTaskScrum = !!props.currentTask.scrum_task_id
        ? props.currentTask.scrum_task_id
        : props.currentTask.task_scrum


    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const handleSubmit = values => {
        props.updateTaskDescription(currentTaskScrum.id, {task_description: values.description}, headers)
        setIsTextAreaFocus(false)
    }

    const getCurrentTaskFromServer = (value) => {
        const id = !!value.scrum_task_id
            ? value.scrum_task_id.id
            : value.task_scrum.id
        props.getCurrentTaskFromServer(id, headers)
    }

    const changeTaskNameHandler = values => {
        props.updateTaskName(currentTaskScrum.id, {task_name: values.task_name}, headers)
    }

    // useEffect(() => {
    //     return props.setBacklogForProject(props.backlogForProject)
    // }, [])

    const getBacklogForProjectHandler = () => {
        props.getBacklogForProject(props.currentProject.scrum_project.id, headers)
    }

    const confirmDeleteTask = () => {
        props.deleteTask(currentTaskScrum.id, headers)
        setIsTaskInfo(false)
    }

    return (
        <>
            <TaskInfoComponent isCommentsHandler={isCommentsHandler} taskInfoCloseHandler={taskInfoCloseHandler}
                               isHistoryHandler={isHistoryHandler} handleSubmit={handleSubmit} onReset={onReset}
                               form={form} taskInfoWrapper={taskInfoWrapper} isTextAreaFocus={isTextAreaFocus}
                               textAreaDescriptionFocus={textAreaDescriptionFocus} isComments={isComments}
                               isCommentsActive={isCommentsActive} isHistoryActive={isHistoryActive}
                               currentTaskScrum={currentTaskScrum} currentTaskFromServer={props.currentTaskFromServer}
                               getCurrentTaskFromServer={getCurrentTaskFromServer} currentTask={props.currentTask}
                               isTaskNameEditable={isTaskNameEditable} setIsTaskNameEditable={setIsTaskNameEditable}
                               changeTaskNameHandler={changeTaskNameHandler} formTaskName={formTaskName}
                               getBacklogForProjectHandler={getBacklogForProjectHandler} taskDelRef={taskDelRef}
                               setIsDeleteTask={setIsDeleteTask} isDeleteTask={isDeleteTask}
                               confirmDeleteTask={confirmDeleteTask}
            />
        </>
    )
}

const mapStateToProps = state => ({
    currentTask: state.tasksReducer.currentTask,
    currentProject: state.projectsReducer.currentProject,
    currentTaskFromServer: state.tasksReducer.currentTaskFromServer,
    backlogForProject: state.backlogReducer.backlogForProject,
})

export default compose(
    connect(mapStateToProps, {
        getSprints, updateTaskDescription, updateTaskName, getCurrentTaskFromServer,
        getBacklogForProject, deleteTask
    })
)(TaskInfoContainer)

