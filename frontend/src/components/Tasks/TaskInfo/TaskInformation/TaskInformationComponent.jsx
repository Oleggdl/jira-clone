import React from 'react'
import './TaskInformation.scss'
import {Button, Form, Input} from "antd"
import {CloseSquareOutlined} from "@ant-design/icons"

const TaskInformationComponent = ({
                                      currentTaskScrum, setIsAddMarks, isAddMarks, marksAddRef, currentTaskFromServer,
                                      onCancel, setActiveColor, addMarksConfirm, marksScrum, currentTask,
                                      active, setActive, activeColorHandler, deleteMarkHandler, form
                                  }) => {

    const markColors = [
        {id: 'red', value: '#ff4e4e'},
        {id: 'green', value: '#53ff4f'},
        {id: 'blue', value: '#4656ff'},
        {id: 'yellow', value: '#f3ff49'},
        {id: 'purple', value: '#f94dff'},
        {id: 'orange', value: '#ffa44b'},
    ]

    return (
        <>
            <div className="task-info-right">
                <h3>Information</h3>
                <h4>Author</h4>
                <div className="supervisor-container">
                    <div className="supervisor-logo">{currentTaskScrum?.creator_id?.username[0]}</div>
                    <span>{currentTaskScrum?.creator_id?.username}</span>
                </div>
                <h4>Marks</h4>
                <div className="mark-element-container">
                    {marksScrum.map(mark =>
                        <div className="mark-element" style={{backgroundColor: mark.mark_color}}
                             key={mark.id}>{mark.mark_text} <span onClick={() => deleteMarkHandler(mark)}>
                            <CloseSquareOutlined/></span>
                        </div>)}
                </div>
                <button className="add-mark-button" onClick={() => setIsAddMarks(true)}>Add mark</button>
                <h4>Sprint</h4>
                <p>{currentTask.sprint_task_sprint?.sprint_name ? currentTask.sprint_task_sprint?.sprint_name : 'None'}</p>
                <h4>Executor</h4>
                <div className="supervisor-container">
                    {currentTaskScrum?.executor_id?.username
                        && <div className="supervisor-logo">{currentTaskScrum?.executor_id?.username[0]}</div>}
                    <span>{currentTaskScrum?.executor_id?.username
                        ? currentTaskScrum?.executor_id?.username : 'NO APPOINTMENT'}</span>
                </div>
                <h4>Create date</h4>
                <p>{currentTaskScrum?.create_date}</p>
            </div>
            {isAddMarks && <>
                <div className="add-marks-container">
                    <h3>Add marks to <span>{currentTaskFromServer?.task_name}</span>?</h3>
                    <h4>Mark name</h4>
                    <Form form={form} onFinish={(values) => {
                        addMarksConfirm(values)
                        onCancel()
                    }}
                          autoComplete="off">
                        <Form.Item
                            name="mark_text"
                            style={{marginRight: "15px"}}
                            rules={[{required: false},
                                {max: 15, message: `Mark name cannot be longer than 15 characters`}]}>
                            <Input placeholder="Enter mark name"/>
                        </Form.Item>
                        <h4>Mark color</h4>
                        <div className="color-picker">
                            {markColors.map((markColor, index) =>
                                <div key={index} onClick={() => {
                                    setActiveColor(markColor.value)
                                    activeColorHandler()
                                    setActive(index)
                                }}
                                     className={active === index ? `active-color` : ''}
                                     style={{backgroundColor: markColor.value}}>
                                </div>)}
                        </div>
                        <Button className="add-marks-confirm" type="primary" htmlType="submit">
                            Add
                        </Button>
                        <Button onClick={onCancel}>
                            Cancel
                        </Button>
                    </Form>
                </div>
                <div className="delete-task-wrapper" ref={marksAddRef}></div>
            </>}
        </>
    )
}

export default TaskInformationComponent
