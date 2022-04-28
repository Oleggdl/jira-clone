import React from "react"
import {Draggable, Droppable} from "react-beautiful-dnd"
import TaskBacklogContainer from "../../Tasks/TaskBacklogComponent/TaskBacklogContainer"

class InnerSprintList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.tasks !== this.props.tasks
    }

    render() {
        return this.props.tasks ? this.props.tasks.map((task, index) => (
            <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
                shouldRespectForceTouch={false}
            >
                {dragProvided => (
                    <TaskBacklogContainer
                        key={task.id}
                        task={task}
                        provided={dragProvided}
                    />
                )}
            </Draggable>
        )) : <></>
    }
}

class InnerList extends React.Component {
    render() {
        const {tasks, dropProvided} = this.props

        return (
            <div>
                <div className="drop-zone" ref={dropProvided.innerRef}>
                    <InnerSprintList tasks={tasks}/>
                    {dropProvided.placeholder}
                </div>
            </div>
        )
    }
}


export default class SprintList extends React.Component {

    render() {
        const {
            listId,
            listType,
            tasks
        } = this.props

        return (

            <Droppable
                droppableId={listId}
                type={listType}
            >
                {dropProvided => (
                    <div{...dropProvided.droppableProps}>
                        <InnerList
                            tasks={tasks}
                            dropProvided={dropProvided}
                        />
                    </div>
                )}
            </Droppable>
        )
    }
}
