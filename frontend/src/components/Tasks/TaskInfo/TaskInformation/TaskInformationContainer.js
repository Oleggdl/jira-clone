import React, {useContext, useEffect, useRef, useState} from 'react'
import TaskInformationComponent from "./TaskInformationComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {createMarksScrum, deleteMarksScrum} from "../../../../redux/scrum/marksScrum-reducer"
import {AuthContext} from "../../../../context/AuthContext"

const TaskInformationContainer = (props) => {

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const currentTaskScrum = !!props.currentTask.scrum_task_id
        ? props.currentTask.scrum_task_id
        : props.currentTask.task_scrum

    const [isAddMarks, setIsAddMarks] = useState(false)
    const [value, setValue] = useState('')
    const [activeColor, setActiveColor] = useState('')
    const [active, setActive] = useState('')

    const onCancel = () => {
        setValue('')
        setActiveColor('')
        setIsAddMarks(false)
    }

    const marksAddRef = useRef()

    useEffect(() => {
        window.addEventListener("click", function (event) {
            if (event.target === marksAddRef.current) {
                onCancel()
            }
        })
        return window.removeEventListener("click", function (event) {
            if (event.target === marksAddRef.current) {
                onCancel()
            }
        })
    }, [])

    const addMarksConfirm = () => {
        props.createMarksScrum({mark_text: value, mark_color: activeColor}, props.currentTaskFromServer.id, headers)
    }

    const activeColorHandler = () => {
        !!active ? setActive('') : setActive('active-color')
    }

    const deleteMarkHandler = (marksScrum) => {
        props.deleteMarksScrum(marksScrum.id, props.currentTaskFromServer.id, headers)
    }

    return (
        <>
            <TaskInformationComponent currentTaskScrum={currentTaskScrum} isAddMarks={isAddMarks}
                                      setIsAddMarks={setIsAddMarks} marksAddRef={marksAddRef}
                                      currentTaskFromServer={props.currentTaskFromServer} value={value}
                                      setValue={setValue} activeColor={activeColor} setActiveColor={setActiveColor}
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
