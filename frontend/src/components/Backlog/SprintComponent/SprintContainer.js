import React from 'react'
import {compose} from "redux"
import {connect} from "react-redux"
import {createNewTaskSprint, createTaskSprintFromSprint, unsetTaskSprints} from "../../../redux/taskSprint-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {deleteSprint, startSprint} from "../../../redux/sprints-reducer"
import {createBacklogElementFromSprint, getBacklogForProject} from "../../../redux/backlog-reducer"
import './Sprint.scss'
import SprintComponent from "./SprintComponent"


class SprintContainer extends React.Component {

    static contextType = AuthContext


    constructor(props) {
        super(props)
        this.state = {
            isCreateTask: false,
            isInputVisible: 'input-visible',
            isSprintStartingMod: false,
            isSettingsSprint: false,
            isDeleteSprint: false,
            headers: {},
            sprint: {}
        }
        this.taskInputRef = React.createRef()
        this.sprintDelRef = React.createRef()
        this.sprintSettingsRef = React.createRef()
        this.settingsBtnRef = React.createRef()
        this.onSetIsCreateTask = this.onSetIsCreateTask.bind(this)
        this.isSettingsSprintHandler = this.isSettingsSprintHandler.bind(this)
    }

    addTaskToSprintHandler = event => {
        if (event.target !== this.taskInputRef.current) {
            if (!this.taskInputRef) {
                this.taskInputRef.current.value = null
            }
            this.setState({isInputVisible: 'input-visible'})
            this.setState({isCreateTask: false})
        }
    }

    closeDeleteSprintHandler = event => {
        if (event.target === this.sprintDelRef.current) {
            this.setState({isDeleteSprint: false})
        }
    }

    closeSettingsSprintHandler = event => {
        if (this.sprintSettingsRef && this.sprintSettingsRef.current) {
            if (!this.sprintSettingsRef.current.contains(event.target)
                && !this.settingsBtnRef.current.contains(event.target)) {
                this.setState({isSettingsSprint: false})
            }
        }
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
        window.addEventListener("mousedown", this.addTaskToSprintHandler)
        window.addEventListener("mousedown", this.closeDeleteSprintHandler)
        window.addEventListener("mousedown", this.closeSettingsSprintHandler)
    }

    componentWillUnmount() {
        window.removeEventListener("mousedown", this.addTaskToSprintHandler)
        window.removeEventListener("mousedown", this.closeDeleteSprintHandler)
        window.removeEventListener("mousedown", this.closeSettingsSprintHandler)
    }

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            const create_date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
            this.props.createNewTaskSprint({
                create_date: create_date,
                creator_id: null,
                executor_id: null,
                task_description: null,
                task_name: this.taskInputRef.current.value
            }, this.props.sprint.id, this.props.currentUser.id, this.props.currentProject.scrum_project.id, this.state.headers)
            this.setState({setIsCreateTask: false})
            this.setState({setIsInputVisible: 'input-visible'})
            this.taskInputRef.current.value = null
            // this.props.unsetTaskSprints()
            // this.props.updateTaskSprints()
        }
    }

    completeSprint = () => {
        if (this.props.sprints.length === 1) {
            this.props.taskSprints.map(sprint => {
                if (sprint.id === this.props.sprint.id) {
                    sprint.taskSprint.map(taskSprint =>
                        this.props.createBacklogElementFromSprint(taskSprint.id, taskSprint.task_scrum.id,
                            this.props.currentProject.scrum_project.id, this.state.headers))
                }
                return null
            })
        } else {
            this.props.taskSprints.map(sprint => {
                if (sprint.id === this.props.sprint.id) {
                    sprint.taskSprint.map(taskSprint =>
                        this.props.createTaskSprintFromSprint(taskSprint.id, taskSprint.task_scrum.id,
                            this.props.sprints[1].id, this.props.currentProject.scrum_project.id, this.state.headers))
                }
                return null
            })
        }
        this.props.deleteSprint(this.props.sprint.id, this.state.headers)
    }

    deleteSprintHandler = () => {

        if (this.props.currentProject.user_role.id === 1) {
            this.props.taskSprints.map(sprint => {
                if (sprint.id === this.props.sprint.id) {
                    sprint.taskSprint.map(taskSprint =>
                        this.props.createBacklogElementFromSprint(taskSprint.id, taskSprint.task_scrum.id,
                            this.props.currentProject.scrum_project.id, this.state.headers))
                }
                return null
            })
            this.props.deleteSprint(this.props.sprint.id, this.state.headers)
        } else {
            console.log("You can't delete sprint")
        }

    }

    isSettingsSprintHandler() {
        !!this.state.isSettingsSprint
            ? this.setState({isSettingsSprint: false})
            : this.setState({isSettingsSprint: true})
    }

    onSetIsCreateTask() {
        !!this.state.isCreateTask ? this.setState({isCreateTask: false}) : this.setState({isCreateTask: true})
        this.setState({isInputVisible: ''})
        this.taskInputRef.current.focus()
    }

    setIsSprintStartingMod = () => {
        this.setState({isSprintStartingMod: false})
    }

    setIsSettingsSprint = () => {
        this.setState({isSettingsSprint: false})
    }

    setIsDeleteSprint = (value) => {
        this.setState({isDeleteSprint: value})
    }

    render() {

        return (
            <>
                <SprintComponent sprint={this.props.sprint} taskSprints={this.props.taskSprints}
                                 index={this.props.index} sprintSettingsRef={this.sprintSettingsRef}
                                 backlogForProjectSprint={this.props.backlogForProjectSprint}
                                 onSetIsCreateTask={this.onSetIsCreateTask} taskInputRef={this.taskInputRef}
                                 isCreateTask={this.state.isCreateTask} onKeyDown={this.onKeyDown}
                                 isInputVisible={this.state.isInputVisible}
                                 setIsSprintStartingMod={this.setIsSprintStartingMod}
                                 isSprintStartingMod={this.state.isSprintStartingMod}
                                 completeSprint={this.completeSprint} settingsBtnRef={this.settingsBtnRef}
                                 isSettingsSprint={this.state.isSettingsSprint}
                                 setIsSettingsSprint={this.setIsSettingsSprint}
                                 isSettingsSprintHandler={this.isSettingsSprintHandler}
                                 isDeleteSprint={this.state.isDeleteSprint}
                                 setIsDeleteSprint={this.setIsDeleteSprint} sprintDelRef={this.sprintDelRef}
                                 deleteSprintHandler={this.deleteSprintHandler}
                                 title={this.props.title}
                                 tasks={this.props.tasks}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    taskSprints: state.taskSprintReducer.taskSprints,
    currentUser: state.userReducer.currentUser,
    currentProject: state.projectsReducer.currentProject,
    sprints: state.sprintsReducer.sprints,
    backlogElements: state.backlogReducer.backlogElements
})

export default compose(
    connect(mapStateToProps, {
        createNewTaskSprint, unsetTaskSprints, startSprint, deleteSprint,
        createBacklogElementFromSprint, createTaskSprintFromSprint, getBacklogForProject
    })
)(SprintContainer)
