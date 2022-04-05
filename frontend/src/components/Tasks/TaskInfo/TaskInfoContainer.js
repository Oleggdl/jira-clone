import React, {useContext, useEffect, useRef, useState} from 'react'
import TaskInfoComponent from "./TaskInfoComponent"
import {useForm} from "antd/es/form/Form"
import {TaskContext} from "../../../context/TaskContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getSprints} from "../../../redux/scrum/sprints-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getCurrentTaskFromServer, updateTaskDescription} from "../../../redux/scrum/tasks-reducer";

const TaskInfoContainer = (props) => {

    const [isComments, setIsComments] = useState(true)
    const [isCommentsActive, setIsCommentsActive] = useState('button-active')
    const [isHistoryActive, setIsHistoryActive] = useState('')


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
        return window.addEventListener("click", function (event) {
            if (event.target === taskInfoWrapper.current) {
                setIsTaskInfo(false)
            }
        })
    })

    const [form] = useForm()

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
        onReset()
    }

    return (
        <>
            <TaskInfoComponent isCommentsHandler={isCommentsHandler} taskInfoCloseHandler={taskInfoCloseHandler}
                               isHistoryHandler={isHistoryHandler} handleSubmit={handleSubmit} onReset={onReset}
                               form={form} taskInfoWrapper={taskInfoWrapper} isTextAreaFocus={isTextAreaFocus}
                               textAreaDescriptionFocus={textAreaDescriptionFocus} isComments={isComments}
                               isCommentsActive={isCommentsActive} isHistoryActive={isHistoryActive}
                               currentTaskScrum={currentTaskScrum} currentTaskFromServer={props.currentTaskFromServer}/>
        </>
    )
}

const mapStateToProps = state => ({
    currentTask: state.tasksReducer.currentTask,
    currentProject: state.projectsReducer.currentProject,
    currentTaskFromServer: state.tasksReducer.currentTaskFromServer,
})

export default compose(
    connect(mapStateToProps, {getSprints, updateTaskDescription, getCurrentTaskFromServer})
)(TaskInfoContainer)

