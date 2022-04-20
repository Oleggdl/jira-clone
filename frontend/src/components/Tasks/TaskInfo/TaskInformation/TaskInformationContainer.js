import React, {useContext, useEffect, useRef, useState} from 'react'
import TaskInformationComponent from "./TaskInformationComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {createMarksScrum, deleteMarksScrum} from "../../../../redux/marksScrum-reducer"
import {AuthContext} from "../../../../context/AuthContext"
import {useForm} from "antd/es/form/Form";

const TaskInformationContainer = (props) => {

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

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

    const activeColorHandler = () => {
        !!active ? setActive('') : setActive('active-color')
    }

    const deleteMarkHandler = (marksScrum) => {
        props.deleteMarksScrum(marksScrum.id, props.currentTaskFromServer.id, headers)
    }

    return (
        <>
            <TaskInformationComponent currentTaskScrum={currentTaskScrum} isAddMarks={isAddMarks} form={form}
                                      setIsAddMarks={setIsAddMarks} marksAddRef={marksAddRef}
                                      currentTaskFromServer={props.currentTaskFromServer}
                                      activeColor={activeColor} setActiveColor={setActiveColor}
                                      addMarksConfirm={addMarksConfirm} onCancel={onCancel}
                                      marksScrum={props.marksScrum} active={active} setActive={setActive}
                                      activeColorHandler={activeColorHandler} deleteMarkHandler={deleteMarkHandler}
            />
        </>
    )
}

const mapStateToProps = state => ({
    currentTask: state.tasksReducer.currentTask,
    currentTaskFromServer: state.tasksReducer.currentTaskFromServer,
    marksScrum: state.marksScrumReducer.marksScrum
})

export default compose(
    connect(mapStateToProps, {createMarksScrum, deleteMarksScrum})
)(TaskInformationContainer)
