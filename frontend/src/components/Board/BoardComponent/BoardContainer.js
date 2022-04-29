import React from 'react'
import BoardComponent from "./BoardComponent"
import {TaskContext} from "../../../context/TaskContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getColumns} from "../../../redux/columns-reducer"
import {AuthContext} from "../../../context/AuthContext"
import reorder, {reorderSprintMap} from "../../../utils/reorder"
import {getStartedSprint} from "../../../redux/sprints-reducer"

class BoardContainer extends React.Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            isTaskInfo: false,
            headers: {},
            columnsMap: this.props.columnMap
        }
        this.setIsTaskInfo = this.setIsTaskInfo.bind(this)
    }

    setIsTaskInfo(value) {
        this.setState({
            isTaskInfo: value
        })
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.headers !== prevState.headers) {
            if (!!this.props.currentSprint) {
                this.props.getColumns(this.props.currentSprint?.id, this.state.headers)
            }
            this.props.getStartedSprint(this.props.currentProject.scrum_project.id, this.state.headers)
        }
        if (this.props.columnMap !== prevProps.columnMap) {
            this.setState({columnsMap: this.props.columnMap})
        }
    }

    onDragEnd = result => {


        if (!result.destination) {
            return
        }

        const source = result.source
        const destination = result.destination


        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return
        }

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
            sprintMap: this.state.columnsMap,
            source,
            destination
        })

        this.setState({
            columnsMap: data.sprintMap
        })
    }

    render() {

        return (
            <>
                <TaskContext.Provider value={{isTaskInfo: this.state.isTaskInfo, setIsTaskInfo: this.setIsTaskInfo}}>
                    <BoardComponent isTaskInfo={this.state.isTaskInfo} columns={this.props.columns}
                                    currentSprint={this.props.currentSprint} onDragEnd={this.onDragEnd}
                                    currentProject={this.props.currentProject} columnsMap={this.state.columnsMap}
                    />
                </TaskContext.Provider>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    columns: state.columnsReducer.columns,
    currentSprint: state.sprintsReducer.currentSprint,
    currentProject: state.projectsReducer.currentProject
})

export default compose(
    connect(mapStateToProps, {getColumns, getStartedSprint})
)(BoardContainer)
