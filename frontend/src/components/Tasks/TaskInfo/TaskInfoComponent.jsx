import React from 'react'
import './TaskInfo.scss'
import TextArea from "antd/es/input/TextArea"
import {Button, Form, Input} from "antd"
import {CloseOutlined} from "@ant-design/icons"
import CommentsContainer from "../Comments/CommentsContainer"
import HistoryContainer from "../History/HistoryContainer"

const TaskInfoComponent = ({
                               isCommentsHandler, isHistoryHandler, onReset, handleSubmit, form,
                               taskInfoCloseHandler, taskInfoWrapper, isTextAreaFocus, textAreaDescriptionFocus,
                               isComments, isCommentsActive, isHistoryActive, currentTask, currentTaskScrum,
                               currentTaskFromServer, getCurrentTaskFromServer, isTaskNameEditable,
                               setIsTaskNameEditable, changeTaskNameHandler, formTaskName, getBacklogForProjectHandler
                           }) => {

    return (
        <>
            <div className="task-info-wrapper" ref={taskInfoWrapper}>
                <div className="task-info-container">
                    <div className="task-info-left">
                        <button className="close-button" onClick={taskInfoCloseHandler}><CloseOutlined/></button>
                        {!isTaskNameEditable
                            ? <h2 onDoubleClick={() => setIsTaskNameEditable(true)}>
                                {currentTaskFromServer?.task_name}</h2>
                            : <Form form={formTaskName} onFinish={values => {
                                changeTaskNameHandler(values)
                                setIsTaskNameEditable(false)
                            }}
                                    initialValues={{task_name: currentTaskFromServer?.task_name}}
                                    autoComplete="off">
                                <Form.Item
                                    name="task_name"
                                    rules={[{required: true, message: 'Please input task name!'},
                                        {max: 50, message: `Task name cannot be longer than 50 characters`},
                                        {min: 3, message: 'Task name must be at least 3 characters'},
                                        {
                                            pattern: new RegExp(/[a-z]/gi),
                                            message: 'Task name must contain letters'
                                        }]}>
                                    <Input placeholder="Enter task name" style={{fontSize: "2.6rem"}}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button className="submit-button" type="primary" htmlType="submit"
                                            style={{width: "100px"}} onMouseUp={getBacklogForProjectHandler}>
                                        Submit
                                    </Button>
                                    <Button style={{marginLeft: "15px", width: "100px"}}
                                            onClick={() => setIsTaskNameEditable(false)}>Cancel</Button>
                                </Form.Item>
                            </Form>}
                        <p className="task-info-left-description">Description</p>
                        <Form initialValues={
                            {
                                description: `${currentTaskFromServer?.task_description === null
                                    ? '' : currentTaskFromServer?.task_description}`
                            }}
                              form={form}
                              onFinish={values => handleSubmit(values)}
                              autoComplete="off">
                            <Form.Item name="description">
                                <TextArea ref={textAreaDescriptionFocus} row={4} placeholder="Enter task description"/>
                            </Form.Item>
                            {isTextAreaFocus && <Form.Item>
                                <Button type="primary" htmlType="submit" style={{width: "100px"}}
                                        className="primary-button-submit"
                                        onMouseUp={() => getCurrentTaskFromServer(currentTask)}
                                >
                                    Submit
                                </Button>
                                <Button style={{marginLeft: "15px", width: "100px"}} onClick={onReset}>Cancel</Button>
                            </Form.Item>}
                        </Form>
                        <h3>Activity</h3>
                        <div className="buttons-activity">
                            <button className={isCommentsActive} onClick={isCommentsHandler}>Comments</button>
                            <button className={isHistoryActive} onClick={isHistoryHandler}>History</button>
                        </div>
                        <div>
                            {isComments ? <CommentsContainer currentTask={currentTask}/> : <HistoryContainer/>}
                        </div>
                    </div>
                    <div className="task-info-right">
                        <h3>Information</h3>
                        <h4>Author</h4>
                        <div className="supervisor-container">
                            <div className="supervisor-logo"></div>
                            <span>{currentTaskScrum?.creator_id?.username}</span>
                        </div>
                        <h4>Marks</h4>
                        <div>
                            Marks
                        </div>
                        <h4>Sprint</h4>
                        <p>{currentTaskScrum?.sprint?.name ? currentTaskScrum?.sprint?.name : 'None'}</p>
                        <h4>Executor</h4>
                        <div className="supervisor-container">
                            <div className="supervisor-logo"></div>
                            <span>{currentTaskScrum?.executor_id?.username
                                ? currentTaskScrum?.executor_id?.username : 'NO APPOINTMENT'}</span>
                        </div>
                        <h4>Create date</h4>
                        <p>{currentTaskScrum?.create_date}</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TaskInfoComponent
