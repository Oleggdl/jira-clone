import React from 'react'
import SprintStartWindowComponent from "./SprintStartWindowComponent"
import {useForm} from "antd/es/form/Form"
import {compose} from "redux"
import {connect} from "react-redux"
import {setCurrentSprint, startSprint} from "../../../../redux/sprints-reducer"
import {AuthContext} from "../../../../context/AuthContext"
import {startSprintColumns} from "../../../../redux/columns-reducer"
import {changeIndexBoardTaskSprint, setTaskSprintColumn} from "../../../../redux/taskSprint-reducer"


const SprintStartWithFrom = props => {
    const form = useForm()
    return <SprintStartWindowContainer {...props} {...form}/>
}

class SprintStartWindowContainer extends React.Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            headers: {},
        }
        this.startSprintWrapper = React.createRef()
    }

    startSprintWindowHandler = event => {
        if (event.target === this.startSprintWrapper.current) {
            this.props.setIsSprintStartingMod()
        }
    }

    componentDidMount() {
        this.setState({headers: {Authorization: `Bearer ${this.context.token}`}})
        window.addEventListener("mouseup", event => this.startSprintWindowHandler(event))
    }

    componentWillUnmount() {
        window.removeEventListener("mouseup", event => this.startSprintWindowHandler(event))
    }

    handleSubmit = (data) => {
        console.log('test1')
        this.props.startSprint({
            sprint_name: data.sprint_name,
            start_date: data.start_date._i,
            end_date: data.end_date._i,
            is_started: true
        }, this.props.sprint.id, this.props.currentProject.scrum_project.id, this.state.headers)
        this.props.startSprintColumns({column_name: 'TO DO'}, this.props.sprint.id, this.state.headers)
        this.props.startSprintColumns({column_name: 'IN WORK'}, this.props.sprint.id, this.state.headers)
        this.props.startSprintColumns({column_name: 'DONE'}, this.props.sprint.id, this.state.headers)
    }

    setColumnHandler = () => {
        console.log('test2')
        let columnId = null
        this.props.columns.map(col => col.column_name === 'TO DO' ? columnId = col.id : null)
        columnId && this.props.taskSprints.map((taskSprint, index) => {
            console.log(taskSprint.id, index)
            if (taskSprint.sprint_task_sprint.sprint_name === this.props.title) {
                this.props.setTaskSprintColumn(taskSprint.id, columnId, this.state.headers)
                this.props.changeIndexBoardTaskSprint(taskSprint.id, index,
                    this.props.sprint.id, this.state.headers)
            }
        })
    }

    onCancel = () => {
        this.props.setIsSprintStartingMod(false)
    }

    render() {


        return (
            <>
                <SprintStartWindowComponent form={this.props.form} handleSubmit={this.handleSubmit}
                                            onCancel={this.onCancel}
                                            startSprintWrapper={this.startSprintWrapper} index={this.props.index}
                                            sprint={this.props.sprint} taskCount={this.props.taskCount}
                                            setColumnHandler={this.setColumnHandler}/>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currentProject: state.projectsReducer.currentProject,
    taskSprints: state.taskSprintReducer.taskSprints,
    columns: state.columnsReducer.columns
})

export default compose(
    connect(mapStateToProps, {
        startSprint, startSprintColumns, setTaskSprintColumn, setCurrentSprint,
        changeIndexBoardTaskSprint
    })
)(SprintStartWithFrom)

