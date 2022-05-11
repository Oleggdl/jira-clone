import React, {useContext, useEffect, useRef, useState} from 'react'
import TaskInformationComponent from "./TaskInformationComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {createMarksScrum, deleteMarksScrum} from "../../../../redux/marksScrum-reducer"
import {AuthContext} from "../../../../context/AuthContext"
import {useForm} from "antd/es/form/Form"
import {useMessage} from "../../../../hooks/message.hook"
import {LanguageContext} from "../../../../context/LanguageContext"

const TaskInformationContainer = (props) => {

    const {text} = useContext(LanguageContext)
    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const [errorMessage, setErrorMessage] = useState('')

    const message = useMessage()

    useEffect(() => {
        window.M.updateTextFields()
    })

    useEffect(() => {
        message(errorMessage)
    }, [errorMessage])

    const [form] = useForm()

    const currentTaskScrum = !!props.currentTask.scrum_task_id
        ? props.currentTask.scrum_task_id
        : props.currentTask.task_scrum

    const [isAddMarks, setIsAddMarks] = useState(false)
    const [activeColor, setActiveColor] = useState('')
    const [active, setActive] = useState('')

    const onCancel = () => {
        setActiveColor('')
        setIsAddMarks(false)
        form.resetFields()
        setActive('')
    }

    const marksAddRef = useRef()

    const closeTaskInfoHandler = (event) => {
        if (event.target === marksAddRef.current) {
            onCancel()
        }
    }

    useEffect(() => {
        window.addEventListener("click", (event) => closeTaskInfoHandler(event))
        return window.removeEventListener("click", (event) => closeTaskInfoHandler(event))
    }, [])

    const addMarksConfirm = (values) => {
        props.createMarksScrum({
            mark_text: values.mark_text,
            mark_color: activeColor
        }, props.currentTaskFromServer.id, headers)
        form.resetFields()
    }

    const activeColorHandler = index => {
        !!active ? setActive('') : setActive(index)
    }

    const deleteMarkHandler = (marksScrum) => {
        props.deleteMarksScrum(marksScrum.id, props.currentTaskFromServer.id, headers)
    }

    return (
        <>
            <TaskInformationComponent currentTaskScrum={currentTaskScrum} isAddMarks={isAddMarks} form={form}
                                      setIsAddMarks={setIsAddMarks} marksAddRef={marksAddRef} text={text}
                                      currentTaskFromServer={props.currentTaskFromServer}
                                      activeColor={activeColor} setActiveColor={setActiveColor}
                                      addMarksConfirm={addMarksConfirm} onCancel={onCancel}
                                      currentTask={props.currentTask} currentProject={props.currentProject}
                                      marksScrum={props.marksScrum} active={active} setActive={setActive}
                                      activeColorHandler={activeColorHandler} deleteMarkHandler={deleteMarkHandler}
            />
        </>
    )
}

const mapStateToProps = state => ({
    currentTask: state.tasksReducer.currentTask,
    currentTaskFromServer: state.tasksReducer.currentTaskFromServer,
    marksScrum: state.marksScrumReducer.marksScrum,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {createMarksScrum, deleteMarksScrum})
)(TaskInformationContainer)
