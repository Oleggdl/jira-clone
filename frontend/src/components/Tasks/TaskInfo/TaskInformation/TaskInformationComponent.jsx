import React from 'react'
import './TaskInformation.scss'
import {Button, Form, Input} from "antd"
import {CloseSquareOutlined} from "@ant-design/icons"

const TaskInformationComponent = ({
                                      currentTaskScrum, setIsAddMarks, isAddMarks, marksAddRef, currentTaskFromServer,
                                      onCancel, setActiveColor, addMarksConfirm, marksScrum, currentTask, text,
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
                <h3>{text("taskInformation.title")}</h3>
                <h4>{text("taskInformation.author")}</h4>
                <div className="supervisor-container">
                    <div className="supervisor-logo">{currentTaskScrum?.creator_id?.username[0]}</div>
                    <span>{currentTaskScrum?.creator_id?.username}</span>
                </div>
                <h4>{text("taskInformation.marks")}</h4>
                <div className="mark-element-container">
                    {marksScrum.map(mark =>
                        <div className="mark-element" style={{backgroundColor: mark.mark_color}}
                             key={mark.id}>{mark.mark_text} <span onClick={() => deleteMarkHandler(mark)}>
                            <CloseSquareOutlined/></span>
                        </div>)}
                </div>
                <button className="add-mark-button" onClick={() => setIsAddMarks(true)}>
                    {text("taskInformation.addMark")}
                </button>
                <h4>{text("taskInformation.sprint")}</h4>
                <p>{currentTask.sprint_task_sprint?.sprint_name
                    ? currentTask.sprint_task_sprint?.sprint_name : 'None'}</p>
                <h4>{text("taskInformation.executor")}</h4>
                <div className="supervisor-container">
                    {currentTaskScrum?.executor_id?.username
                        && <div className="supervisor-logo">{currentTaskScrum?.executor_id?.username[0]}</div>}
                    <span>{currentTaskScrum?.executor_id?.username
                        ? currentTaskScrum?.executor_id?.username : `${text("taskInformation.noAppointment")}`}</span>
                </div>
                <h4>{text("taskInformation.createDate")}</h4>
                <p>{currentTaskScrum?.create_date}</p>
            </div>
            {isAddMarks && <>
                <div className="add-marks-container">
                    <h3>{text("taskInformation.marksWindow.title")}
                        <span>{currentTaskFromServer?.task_name}</span>?</h3>
                    <h4>{text("taskInformation.marksWindow.name")}</h4>
                    <Form form={form} onFinish={(values) => {
                        addMarksConfirm(values)
                        onCancel()
                    }}
                          autoComplete="off">
                        <Form.Item
                            name="mark_text"
                            style={{marginRight: "15px"}}
                            rules={[{required: false},
                                {max: 15, message: `${text("taskInformation.marksWindow.input.error")}`}]}>
                            <Input placeholder={`${text("taskInformation.marksWindow.input.placeholder")}`}/>
                        </Form.Item>
                        <h4>{text("taskInformation.marksWindow.color")}</h4>
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
                            {text("taskInformation.marksWindow.addBtn")}
                        </Button>
                        <Button onClick={onCancel}>
                            {text("taskInformation.marksWindow.cancel")}
                        </Button>
                    </Form>
                </div>
                <div className="delete-task-wrapper" ref={marksAddRef}></div>
            </>}
        </>
    )
}

export default TaskInformationComponent
