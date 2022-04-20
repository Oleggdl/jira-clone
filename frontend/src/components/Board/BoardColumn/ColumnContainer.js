import React, {useContext, useEffect, useRef, useState} from 'react'
import ColumnComponent from "./ColumnComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {deleteColumnScrum} from "../../../redux/columns-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getTaskSprintForColumn, unsetTaskSprintsForColumn} from "../../../redux/taskSprint-reducer";

const ColumnContainer = props => {

    const [isSettings, setIsSettings] = useState(false)
    const [isSettingsActive, setIsSettingsActive] = useState('')

    const settingsRef = useRef(null)

    useEffect(() => {
        window.addEventListener("click", function (e) {
            if (e.target !== settingsRef.current) {
                setIsSettings(false)
                setIsSettingsActive('')
            }
        })

        return window.removeEventListener("click", function (e) {
            if (e.target !== settingsRef.current) {
                setIsSettings(false)
                setIsSettingsActive('')
            }
        })
    })

    const settingsColumnHandler = () => {
        !!isSettings ? setIsSettings(false) : setIsSettings(true)
        !!isSettingsActive ? setIsSettingsActive('') : setIsSettingsActive('settings-active')
    }

    const {token} = useContext(AuthContext)

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const deleteColumnHandler = (id) => {
        props.deleteColumnScrum(id, props.currentSprint.id, headers)
    }

    useEffect(() => {
        props.getTaskSprintForColumn(props.currentSprint.id, props.column.id, headers)

        return () => {
            props.unsetTaskSprintsForColumn()
        }
    }, [])

    return (
        <>
            <ColumnComponent column={props.column} settingsColumnHandler={settingsColumnHandler}
                             isSettings={isSettings} isSettingsActive={isSettingsActive} settingsRef={settingsRef}
                             deleteColumnHandler={deleteColumnHandler}
                             taskSprintsForColumn={props.taskSprintsForColumn}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentSprint: state.sprintsReducer.currentSprint,
    taskSprintsForColumn: state.taskSprintReducer.taskSprintsForColumn,
})

export default compose(
    connect(mapStateToProps, {deleteColumnScrum, getTaskSprintForColumn, unsetTaskSprintsForColumn})
)(ColumnContainer)
