import React, {useContext, useEffect, useRef} from 'react'
import SprintStartWindowComponent from "./SprintStartWindowComponent"
import {useForm} from "antd/es/form/Form"
import {compose} from "redux"
import {connect} from "react-redux"
import {setCurrentSprint, startSprint} from "../../../../redux/sprints-reducer"
import {AuthContext} from "../../../../context/AuthContext"
import {startSprintColumns} from "../../../../redux/columns-reducer"
import {setTaskSprintColumn} from "../../../../redux/taskSprint-reducer"

const SprintStartWindowContainer = (props) => {

    const [form] = useForm()
    const startSprintWrapper = useRef()

    const {token} = useContext(AuthContext)
    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        window.addEventListener("mouseup", function (event) {
            if (event.target === startSprintWrapper.current) {
                props.setIsSprintStartingMod(false)
            }
        })
        return window.removeEventListener("mouseup", function (event) {
            if (event.target === startSprintWrapper.current) {
                props.setIsSprintStartingMod(false)
            }
        })
    }, [])

    const handleSubmit = (data) => {
        props.startSprint({
            sprint_name: data.sprint_name,
            start_date: data.start_date._i,
            end_date: data.end_date._i,
            is_started: true
        }, props.sprint.id, props.currentProject.scrum_project.id, headers)
        props.startSprintColumns({column_name: 'TO DO'}, props.sprint.id, headers)
        props.startSprintColumns({column_name: 'IN WORK'}, props.sprint.id, headers)
        props.startSprintColumns({column_name: 'DONE'}, props.sprint.id, headers)
    }

    const setTaskSprintColumn = () => {
        let columnId = null
        console.log(props.columns)
        props.columns.map(col => col.column_name === 'TO DO' ? columnId = col.id : null)
        props.taskSprints.map(taskSprint => {
            if (taskSprint.id === props.sprint.id) {
                taskSprint.taskSprint.map(ts => props.setTaskSprintColumn(ts.id, columnId, headers))
            }
        })
    }

    const onCancel = () => {
        props.setIsSprintStartingMod(false)
    }

    return (
        <>
            <SprintStartWindowComponent form={form} handleSubmit={handleSubmit} onCancel={onCancel}
                                        startSprintWrapper={startSprintWrapper} index={props.index}
                                        sprint={props.sprint} taskCount={props.taskCount}
                                        setTaskSprintColumn={setTaskSprintColumn}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    currentProject: state.projectsReducer.currentProject,
    taskSprints: state.taskSprintReducer.taskSprints,
    columns: state.columnsReducer.columns
})

export default compose(
    connect(mapStateToProps, {startSprint, startSprintColumns, setTaskSprintColumn, setCurrentSprint})
)(SprintStartWindowContainer)

