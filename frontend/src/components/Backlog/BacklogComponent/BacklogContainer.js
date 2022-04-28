import React from 'react'
import BacklogComponent from "./BacklogComponent"
import {compose} from "redux"
import {connect} from "react-redux"
import {TaskContext} from "../../../context/TaskContext"
import {getTaskSprints, unsetTaskSprints} from "../../../redux/taskSprint-reducer"
import {searchTasks} from "../../../redux/backlog-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getSprints} from "../../../redux/sprints-reducer"
import reorder, {reorderSprintMap} from "../../../utils/reorder"


class BacklogContainer extends React.Component {

    static contextType = AuthContext
    static defaultProps = {
        isCombineEnabled: false
    }

    constructor(props) {
        super(props)
        this.state = {
            isTaskInfo: false,
            backlogForProject: this.props.backlogForProject,
            backlogForProjectSprint: [],
            headers: {},
            columns: this.props.initial,
        }
        this.setIsTaskInfo = this.setIsTaskInfo.bind(this)
        this.setBacklogForProject = this.setBacklogForProject.bind(this)
        this.setBacklogForProjectSprint = this.setBacklogForProjectSprint.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this)
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
        if (!!this.props.taskSprints) {
            return this.props.unsetTaskSprints()
        }
        this.props.getSprints(this.props.currentProject.scrum_project.id, this.state.headers)
        this.props.getTaskSprints(this.props.currentProject.scrum_project.id, this.state.headers)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.initial !== prevProps.initial) {
            this.setState({columns: this.props.initial})
        }
        // if (this.props.sprints !== prevProps.sprints) {
        //     this.props.getTaskSprints(this.props.currentProject.scrum_project.id, this.state.headers)
        // }
    }

    componentWillUnmount() {
        // this.props.unsetTaskSprintsHandler()
    }

    setIsTaskInfo(value) {
        this.setState({isTaskInfo: value})
    }

    setBacklogForProject(value) {
        this.setState({backlogForProject: value})
    }

    setBacklogForProjectSprint(value) {
        this.setState({backlogForProjectSprint: value})
    }

    onDragEnd = result => {
        // if (result.combine) {
        //     console.log(result)
        //     if (result.type === "COLUMN") {
        //         const shallow = [...this.state.ordered]
        //         shallow.splice(result.source.index, 1)
        //         this.setState({ordered: shallow})
        //         return
        //     }
        //
        //     const column = this.state.columns[result.source.droppableId]
        //     const withSprintRemoved = [...column]
        //     withSprintRemoved.splice(result.source.index, 1)
        //     const columns = {
        //         ...this.state.columns,
        //         [result.source.droppableId]: withSprintRemoved
        //     }
        //     this.setState({columns})
        //     return
        // }

        // dropped nowhere
        if (!result.destination) {
            return
        }

        const source = result.source
        const destination = result.destination

        // did not move anywhere - can bail early
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return
        }

        // reordering column
        if (result.type === "COLUMN") {
            const ordered = reorder(
                this.state.ordered,
                source.index,
                destination.index
            )

            this.setState({
                ordered
            })

            return
        }

        const data = reorderSprintMap({
            sprintMap: this.state.columns,
            source,
            destination
        })

        this.setState({
            columns: data.sprintMap
        })
    }

    render() {

        return (
            <>
                <TaskContext.Provider value={{isTaskInfo: this.state.isTaskInfo, setIsTaskInfo: this.setIsTaskInfo}}>
                    <BacklogComponent isTaskInfo={this.state.isTaskInfo}
                                      onDragEnd={this.onDragEnd} updateTaskSprints={this.props.updateTaskSprints}
                                      columns={this.state.columns} sprints={this.props.sprints}
                                      backlogForProject={this.props.backlogForProject}
                                      currentProject={this.props.currentProject}
                                      setBacklogForProject={this.setBacklogForProject}
                                      backlogForProjectSprint={this.state.backlogForProjectSprint}
                                      setBacklogForProjectSprint={this.setBacklogForProjectSprint}/>
                </TaskContext.Provider>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    sprints: state.sprintsReducer.sprints,
    backlogForProject: state.backlogReducer.backlogForProject,
    taskSprints: state.taskSprintReducer.taskSprints,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {
        unsetTaskSprints, getSprints,
        searchTasks, getTaskSprints
    })
)(BacklogContainer)
