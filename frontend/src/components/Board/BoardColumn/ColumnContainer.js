import React, {useContext, useEffect, useRef, useState} from 'react'
import ColumnComponent from "./ColumnComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {deleteColumnScrum} from "../../../redux/scrum/columns-reducer"
import {AuthContext} from "../../../context/AuthContext"

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

    return (
        <>
            <ColumnComponent column={props.column} settingsColumnHandler={settingsColumnHandler}
                             isSettings={isSettings} isSettingsActive={isSettingsActive} settingsRef={settingsRef}
                             deleteColumnHandler={deleteColumnHandler}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentSprint: state.sprintsReducer.currentSprint
})

export default compose(
    connect(mapStateToProps, {deleteColumnScrum})
)(ColumnContainer)
