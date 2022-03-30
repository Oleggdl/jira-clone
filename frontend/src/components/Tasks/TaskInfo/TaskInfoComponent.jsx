import React from 'react'
import './TaskInfo.scss'
import TextArea from "antd/es/input/TextArea"
import {Button, Form} from "antd"
import {CloseOutlined} from "@ant-design/icons"
import CommentsContainer from "../Comments/CommentsContainer"
import HistoryContainer from "../History/HistoryContainer"

const TaskInfoComponent = ({isCommentsHandler, isHistoryHandler, onReset, handleSubmit, form,
                               taskInfoCloseHandler, taskInfoWrapper, isTextAreaFocus, textAreaDescriptionFocus,
                               isComments, isCommentsActive, isHistoryActive}) => {

    return (
        <>
            <div className="task-info-wrapper" ref={taskInfoWrapper}>
                <div className="task-info-container">
                    <div className="task-info-left">
                        <button className="close-button" onClick={taskInfoCloseHandler}><CloseOutlined /></button>
                        <h2>Task name</h2>
                        <p className="task-info-left-description">Description</p>
                        <Form initialValues={
                            {
                                description: 'Description'
                            }}
                              form={form}
                              onFinish={values => handleSubmit(values)}
                              autoComplete="off">
                            <Form.Item name="description">
                                <TextArea ref={textAreaDescriptionFocus} row={4} placeholder="Enter task description"/>
                            </Form.Item>
                            {isTextAreaFocus && <Form.Item>
                                <Button type="primary" htmlType="submit" style={{width: "100px"}}
                                        className="primary-button-submit">
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
                            {isComments ? <CommentsContainer/> : <HistoryContainer/>}
                        </div>
                    </div>
                    <div className="task-info-right">
                        <h3>Information</h3>
                        <h4>Supervisor</h4>
                        <div className="supervisor-container">
                            <div className="supervisor-logo"> </div>
                            <span>No appointment</span>
                        </div>
                        <h4>Marks</h4>
                        <div>
                            Marks
                        </div>
                        <h4>Sprint</h4>
                        <p>Sprint name</p>
                        <h4>Author</h4>
                        <div className="supervisor-container">
                            <div className="supervisor-logo"> </div>
                            <span>OIE zhA</span>
                        </div>
                        <h4>Create date</h4>
                        <p>Date creation</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TaskInfoComponent
