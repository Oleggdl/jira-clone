import React, {useContext, useEffect, useRef, useState} from 'react'
import TaskInfoComponent from "./TaskInfoComponent"
import {useForm} from "antd/es/form/Form";
import {AuthContext} from "../../../context/AuthContext"
import {TaskContext} from "../../../context/TaskContext"

const TaskInfoContainer = () => {

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
    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }




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

    const handleSubmit = values => {
        // props.createTask(values, headers)
        onReset()
    }

    return (
        <>
            <TaskInfoComponent isCommentsHandler={isCommentsHandler} taskInfoCloseHandler={taskInfoCloseHandler}
                               isHistoryHandler={isHistoryHandler} handleSubmit={handleSubmit} onReset={onReset}
                               form={form} taskInfoWrapper={taskInfoWrapper} isTextAreaFocus={isTextAreaFocus}
                               textAreaDescriptionFocus={textAreaDescriptionFocus} isComments={isComments}
                               isCommentsActive={isCommentsActive} isHistoryActive={isHistoryActive}/>
        </>
    )
}

export default TaskInfoContainer
