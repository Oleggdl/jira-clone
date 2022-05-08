import React from 'react'
import BoardComponent from "./BoardComponent"
import {TaskContext} from "../../../context/TaskContext"
import {compose} from "redux"
import {connect} from "react-redux"
import {getColumns} from "../../../redux/columns-reducer"
import {AuthContext} from "../../../context/AuthContext"
import {getStartedSprint} from "../../../redux/sprints-reducer"
import {reorderColumnMap} from "../../../utils/reorderBoard";
import {changeIndexBoardTaskSprint, setTaskSprintColumn} from "../../../redux/taskSprint-reducer";

class BoardContainer extends React.Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            isTaskInfo: false,
            headers: {},
            columnsMap: []
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
        this.setState({columnsMap: this.props.columnMap})
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
            // console.log(this.props.columnMap)
        }
        if (this.state.columnsMap !== prevState.columnsMap) {
            console.log(this.state.columnsMap)
        }
    }

    onDragEnd = result => {
        console.log(result)
        if (!result.destination) {
            return
        }

        const {source, destination, draggableId} = result

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return
        }

        const data = reorderColumnMap({
            boardMap: this.state.columnsMap,
            source,
            destination,
        })

        if (destination.droppableId === source.droppableId) {
            let prevIndex
            this.state.columnsMap[destination.droppableId].map(item => {
                if (item.id === parseInt(draggableId)) {
                    prevIndex = item.index
                }
            })
            this.props.changeIndexBoardTaskSprint(draggableId, destination.index,
                this.props.currentSprint?.id, this.state.headers)

            this.state.columnsMap[destination.droppableId].map((item, index) => {
                if (item.id !== parseInt(draggableId)) {
                    if (destination.index < prevIndex && item.index >= destination.index && item.index < prevIndex) {
                        this.props.changeIndexBoardTaskSprint(item.id, item.index + 1,
                            this.props.currentSprint?.id, this.state.headers)
                    } else if (destination.index > prevIndex && item.index > prevIndex
                        && item.index <= destination.index) {
                        this.props.changeIndexBoardTaskSprint(item.id, item.index - 1,
                            this.props.currentSprint?.id, this.state.headers)
                    }
                }
            })
            prevIndex = 0
        }

        if (source.droppableId !== destination.droppableId) {
            this.props.setTaskSprintColumn(draggableId, destination.droppableId.split(',')[1], this.state.headers)

            let prevIndex
            this.state.columnsMap[source.droppableId].map(item => {
                if (item.id === parseInt(draggableId)) {
                    prevIndex = item.index
                }
            })

            this.props.changeIndexBoardTaskSprint(draggableId, destination.index,
                this.props.currentSprint?.id, this.state.headers)

            this.state.columnsMap[source.droppableId].map(item => {
                if (item.id !== parseInt(draggableId)) {
                    if (item.index > prevIndex && item.index <= this.state.columnsMap[source.droppableId].length) {
                        this.props.changeIndexBoardTaskSprint(item.id, item.index - 1,
                            this.props.currentSprint?.id, this.state.headers)
                    }
                }
            })
            this.state.columnsMap[destination.droppableId].map(item => {
                if (item.id !== parseInt(draggableId)) {
                    if (item.index >= destination.index
                        && item.index < this.state.columnsMap[destination.droppableId].length) {
                        this.props.changeIndexBoardTaskSprint(item.id, item.index + 1,
                            this.props.currentSprint?.id, this.state.headers)
                    }
                }
            })
            prevIndex = 0
        }

        this.setState({
            columnsMap: data.boardMap
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
    connect(mapStateToProps, {getColumns, getStartedSprint, setTaskSprintColumn, changeIndexBoardTaskSprint})
)(BoardContainer)
