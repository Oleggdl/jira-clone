import React from 'react'
import ScrumComponent from "./ScrumComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {AuthContext} from "../../../context/AuthContext"
import {getBacklogForProject} from "../../../redux/backlog-reducer"
import {getTaskSprints, unsetTaskSprints} from "../../../redux/taskSprint-reducer"

class ScrumContainer extends React.Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            headers: {},
            tasks: [],
            sprintsMap: [],
            backlog: []
        }
        this.updateTaskSprints = this.updateTaskSprints.bind(this)
        this.unsetTaskSprintsHandler = this.unsetTaskSprintsHandler.bind(this)
        this.updateSprintsHandler = this.updateSprintsHandler.bind(this)
    }

    getBySprint = (sprintName, items) => {
        return items.filter(task => task.sprint_task_sprint?.sprint_name === sprintName)
    }
    getByBacklog = items => {
        return items.filter(task => task.scrum_task_id)
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})

        this.setState({
            tasks: this.props.taskSprints.concat(this.props.backlogForProject)
        })

        this.setState({
            sprintsMap: this.props.sprints.reduce(
                (previous, sprint) => ({
                    ...previous,
                    [sprint.sprint_name]: this.getBySprint(sprint.sprint_name, this.state.tasks)
                }),
                {['Backlog']: this.getByBacklog(this.state.tasks)})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.taskSprints !== prevProps.taskSprints) {

            this.setState({
                tasks: this.props.taskSprints.concat(this.props.backlogForProject)
            })
        }

        if (this.props.backlogForProject !== prevProps.backlogForProject) {

            this.setState({
                tasks: this.props.taskSprints.concat(this.props.backlogForProject)
            })
        }

        if (this.props.sprints !== prevProps.sprints || this.props.currentProject !== prevProps.currentProject) {

            this.setState({
                tasks: this.props.taskSprints.concat(this.props.backlogForProject)
            })
        }

        if (this.state.tasks !== prevState.tasks || this.props.currentProject !== prevProps.currentProject) {
            this.setState({
                sprintsMap: this.props.sprints.reduce(
                    (previous, sprint) => ({
                        ...previous,
                        [sprint.sprint_name]: this.getBySprint(sprint.sprint_name, this.state.tasks)
                    }),
                    {['Backlog']: this.getByBacklog(this.state.tasks)})
            })
        }
        if (this.state.headers !== prevState.headers || this.props.currentProject !== prevProps.currentProject) {
            this.props.getBacklogForProject(this.props.currentProject.scrum_project.id, this.state.headers)
            this.props.getTaskSprints(this.props.currentProject.scrum_project.id, this.state.headers)
        }
    }

    updateSprintsHandler() {

        this.setState({
            tasks: this.props.taskSprints.concat(this.props.backlogForProject)
        })
    }

    updateTaskSprints() {
        this.props.getTaskSprints(this.props.currentProject.scrum_project.id, this.state.headers)
    }

    unsetTaskSprintsHandler() {
        // console.log('test')
        // this.props.unsetTaskSprints()
        // if (this.props.sprints.length !== 0) {
        //     this.setState({
        //         tasks: []
        //     })
        // }
    }


    render() {
        return (
            <>
                <ScrumComponent sprints={this.props.sprints} sprintsMap={this.state.sprintsMap}
                                updateTaskSprints={this.updateTaskSprints}
                                unsetTaskSprintsHandler={this.unsetTaskSprintsHandler}
                                updateSprintsHandler={this.updateSprintsHandler}
                />
            </>
        )

    }
}

const mapStateToProps = (state) => ({
    backlogForProject: state.backlogReducer.backlogForProject,
    currentProject: state.projectsReducer.currentProject,
    sprints: state.sprintsReducer.sprints,
    taskSprints: state.taskSprintReducer.taskSprints
})


export default compose(
    connect(mapStateToProps, {getBacklogForProject, getTaskSprints, unsetTaskSprints})
)(ScrumContainer)
