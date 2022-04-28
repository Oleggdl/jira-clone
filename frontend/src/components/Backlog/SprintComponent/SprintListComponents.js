import React from "react"
import {Draggable, Droppable} from "react-beautiful-dnd"
import TaskBacklogContainer from "../../Tasks/TaskBacklogComponent/TaskBacklogContainer"

class InnerSprintList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.tasks !== this.props.tasks
    }

    render() {
        return this.props.tasks && this.props.tasks.map((task, index) => (
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
        ))
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
            ignoreContainerClipping,
            internalScroll,
            scrollContainerStyle,
            isDropDisabled,
            isCombineEnabled,
            listId,
            listType,
            style,
            tasks
        } = this.props

        return (

            <Droppable
                droppableId={listId}
                type={listType}
                ignoreContainerClipping={ignoreContainerClipping}
                isDropDisabled={isDropDisabled}
                isCombineEnabled={isCombineEnabled}
            >
                {dropProvided => (
                    <div style={style}{...dropProvided.droppableProps}>
                        {internalScroll ? (
                            <div className="scroll-container" style={scrollContainerStyle}>
                                <InnerList
                                    tasks={tasks}
                                    dropProvided={dropProvided}
                                />
                            </div>
                        ) : (
                            <InnerList
                                tasks={tasks}
                                dropProvided={dropProvided}
                            />
                        )}
                    </div>
                )}
            </Droppable>
        )
    }
}
