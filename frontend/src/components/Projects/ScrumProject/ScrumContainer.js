import React from 'react'
import ScrumComponent from "./ScrumComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {AuthContext} from "../../../context/AuthContext"
import {getBacklogForProject} from "../../../redux/backlog-reducer"
import {getTaskSprints} from "../../../redux/taskSprint-reducer"

class ScrumContainer extends React.Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            headers: {},
            tasks: [],
            sprintsMap: []
        }
    }

    getBySprint = (sprintName, items) => {
        return items.filter(task => task.sprint_task_sprint.sprint_name === sprintName)
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.sprints !== prevProps.sprints) {
            if (this.props.sprints.length !== 0) {
                this.setState({
                    tasks: this.props.taskSprints
                })
            }
        }
        if (this.state.tasks !== prevState.tasks) {


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
        if (this.state.headers !== prevState.headers) {
            this.props.getBacklogForProject(this.props.currentProject.scrum_project.id, this.state.headers)
            this.props.getTaskSprints(this.props.currentProject.scrum_project.id, this.state.headers)
        }
    }


    render() {


        return (
            <>
                <ScrumComponent sprintsMap={this.state.sprintsMap}/>
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
    connect(mapStateToProps, {getBacklogForProject, getTaskSprints})
)(ScrumContainer)
