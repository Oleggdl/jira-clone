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
            sprintsMap: []
        }
        this.updateTaskSprints = this.updateTaskSprints.bind(this)
        this.unsetTaskSprintsHandler = this.unsetTaskSprintsHandler.bind(this)
    }

    getBySprint = (sprintName, items) => {
        return items.filter(task => task.sprint_task_sprint.sprint_name === sprintName)
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
        if (this.props.sprints.length !== 0) {
            this.setState({
                tasks: this.props.taskSprints
            })
        }
        if (this.props.sprints.length !== 0) {
            this.setState({
                sprintsMap: this.props.sprints.reduce(
                    (previous, sprint) => ({
                        ...previous,
                        [sprint.sprint_name]: this.getBySprint(sprint.sprint_name, this.state.tasks)
                    }),
                    {}
                )
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        console.log(this.props.taskSprints)
        if (this.props.taskSprints !== prevProps.taskSprints) {
            if (this.props.sprints.length !== 0) {
                this.setState({
                    tasks: this.props.taskSprints
                })
            }
        }

        if (this.props.sprints !== prevProps.sprints || this.props.currentProject !== prevProps.currentProject) {
            if (this.props.sprints.length !== 0) {
                this.setState({
                    tasks: this.props.taskSprints
                })
            }
        }

        if (this.state.tasks !== prevState.tasks || this.props.currentProject !== prevProps.currentProject) {
            if (this.props.sprints.length !== 0) {
                this.setState({
                    sprintsMap: this.props.sprints.reduce(
                        (previous, sprint) => ({
                            ...previous,
                            [sprint.sprint_name]: this.getBySprint(sprint.sprint_name, this.state.tasks)
                        }),
                        {}
                    )
                })
            }
        }
        if (this.state.headers !== prevState.headers || this.props.currentProject !== prevProps.currentProject) {
            this.props.getBacklogForProject(this.props.currentProject.scrum_project.id, this.state.headers)
            this.props.getTaskSprints(this.props.currentProject.scrum_project.id, this.state.headers)
        }
    }

    updateTaskSprints() {
        this.props.getTaskSprints(this.props.currentProject.scrum_project.id, this.state.headers)
        // if (this.props.sprints.length !== 0) {
        //     this.setState({
        //         tasks: this.props.taskSprints
        //     })
        //     this.setState({
        //         sprintsMap: this.props.sprints.reduce(
        //             (previous, sprint) => ({
        //                 ...previous,
        //                 [sprint.sprint_name]: this.getBySprint(sprint.sprint_name, this.state.tasks)
        //             }),
        //             {}
        //         )
        //     })
        // }
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
                                unsetTaskSprintsHandler={this.unsetTaskSprintsHandler}/>
            </>
        )

    }
}

const mapStateToProps = (state) => ({
    currentProject: state.projectsReducer.currentProject,
    sprints: state.sprintsReducer.sprints,
    taskSprints: state.taskSprintReducer.taskSprints
})


export default compose(
    connect(mapStateToProps, {getBacklogForProject, getTaskSprints, unsetTaskSprints})
)(ScrumContainer)
