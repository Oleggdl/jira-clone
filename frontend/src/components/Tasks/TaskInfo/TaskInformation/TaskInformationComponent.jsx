import React from 'react'
import './TaskInformation.scss'
import {Button, Input} from "antd"
import {CloseOutlined} from "@ant-design/icons";

const TaskInformationComponent = ({
                                      currentTaskScrum, setIsAddMarks, isAddMarks, marksAddRef, currentTaskFromServer,
                                      setValue, value, onCancel, setActiveColor, addMarksConfirm, marksScrum,
                                      active, setActive, activeColorHandler, deleteMarkHandler
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
                    <div className="supervisor-logo"></div>
                    <span>{currentTaskScrum?.creator_id?.username}</span>
                </div>
                <h4>Marks</h4>
                <div className="mark-element-container">
                    {marksScrum.map(mark =>
                        <div className="mark-element" style={{backgroundColor: mark.mark_color}}
                             key={mark.id}>{mark.mark_text} <span onClick={() => deleteMarkHandler(mark)}>
                            <CloseOutlined/></span>
                        </div>)}
                </div>
                <button className="add-mark-button" onClick={() => setIsAddMarks(true)}>Add mark</button>
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
            {isAddMarks && <>
                <div className="add-marks-container">
                    <h3>Add marks to <span>{currentTaskFromServer?.task_name}</span>?</h3>
                    <h4>Mark name</h4>
                    <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter mark name"/>
                    <h4>Mark color</h4>
                    <div className="color-picker">
                        {markColors.map((markColor, index) =>
                            <div key={index} onClick={() => {
                                setActiveColor(markColor.value)
                                activeColorHandler()
                            }}
                                // className={active}
                                 style={{backgroundColor: markColor.value}}>
                            </div>)}
                    </div>
                    <Button className="add-marks-confirm" type="primary" onClick={() => {
                        addMarksConfirm()
                        onCancel()
                    }}>Add</Button>
                    <Button onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
                <div className="delete-task-wrapper" ref={marksAddRef}></div>
            </>}
        </>
    )
}

export default TaskInformationComponent
