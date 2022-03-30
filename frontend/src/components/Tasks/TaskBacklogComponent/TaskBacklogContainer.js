import React, {Component} from 'react'
import TaskBacklogComponent from "./TaskBacklogComponent"

class TaskBacklogContainer extends Component {


    render() {
        return (
            <>
                <TaskBacklogComponent task={this.props.task}/>
            </>
        )
    }
}

export default TaskBacklogContainer
