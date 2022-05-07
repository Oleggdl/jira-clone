import React from 'react'
import './Sprint.scss'
import {Button, DatePicker, Form, Input} from "antd"
import SprintStartWindowContainer from "./SprintStartWindow/SprintStartWindowContainer"
import {EllipsisOutlined} from "@ant-design/icons"
import SprintList from "./SprintListComponents"
import moment from "moment";

const SprintComponent = ({
                             sprint, index, taskSprints, isCreateTask, onSetIsCreateTask, onCancel, form,
                             onKeyDown, taskInputRef, isInputVisible, setIsSprintStartingMod, handleSubmit,
                             isSprintStartingMod, completeSprint, isSettingsSprint, isChangeSprint, setIsChangeSprint,
                             isSettingsSprintHandler, isDeleteSprint, setIsDeleteSprint, sprintDelRef,
                             setIsSettingsSprint, deleteSprintHandler, tasks, title, sprintSettingsRef, settingsBtnRef
                         }) => {

    return (
        <>
            {isSprintStartingMod && <SprintStartWindowContainer setIsSprintStartingMod={setIsSprintStartingMod}
                                                                sprint={sprint} index={index} title={title}
                                                                taskCount={tasks ? tasks.length : null}/>}
            <div className="sprint-container">
                <div className="sprint-container-header">
                    <h4>{sprint?.sprint_name || `BoardSprint ${index + 1}`}</h4>
                    {sprint?.start_date && <>
                        <div className="sprint-header-text">{sprint?.start_date}</div>
                        <div className="sprint-header-text"> –</div>
                        <div className="sprint-header-text">{sprint?.end_date}</div>
                    </>}
                    <div className="sprint-header-text">(Tasks count: <span>{tasks ? tasks.length : null}</span>)</div>
                    {sprint?.is_started
                        ? <Button className="start-sprint-button" type="primary"
                                  onClick={completeSprint}>Complete a sprint</Button>
                        : (index !== 0 || tasks?.length === 0
                            ? <Button disabled={true}>Start a sprint</Button>
                            : <Button className="start-sprint-button" type="primary"
                                      onClick={() => setIsSprintStartingMod(true)}>Start a sprint</Button>)}
                    <div className="sprint-settings" onClick={isSettingsSprintHandler} ref={settingsBtnRef}>
                        <EllipsisOutlined/></div>
                    {isSettingsSprint && <div className="sprint-settings-window" ref={sprintSettingsRef}>
                        <div onClick={() => {
                            setIsChangeSprint(true)
                            setIsSettingsSprint()
                        }}><h4>Change sprint</h4></div>
                        <div onClick={() => {
                            setIsDeleteSprint(true)
                            setIsSettingsSprint()
                        }}><h4>Delete sprint</h4></div>
                    </div>}
                    {isDeleteSprint && <>
                        <div className="delete-sprint-container">
                            <h3>Remove Sprint?</h3>
                            <p>Are you sure you want to delete <span>{sprint?.sprint_name}</span>?</p>
                            <Button danger={true} onClick={() => {
                                deleteSprintHandler()
                                setIsDeleteSprint(false)
                            }}
                                    className="confirm-delete-sprint">Delete</Button>
                            <Button onClick={() => setIsDeleteSprint(false)}>Cancel</Button>
                        </div>
                        <div className="delete-task-wrapper" ref={sprintDelRef}></div>
                    </>}
                    {isChangeSprint && <>
                        <div className="change-sprint-container">
                            <h2>Change sprint: <span>{sprint?.sprint_name}</span></h2>

                            <Form form={form}
                                  onFinish={values => {
                                      handleSubmit(values)
                                      // setColumnHandler()
                                  }}
                                  autoComplete="off"
                                  initialValues={
                                      {
                                          sprint_name: sprint.sprint_name,
                                          start_date: sprint.start_date && moment(sprint.start_date, 'DD/MM/YYYY'),
                                          end_date: sprint.end_date && moment(sprint.end_date, 'DD/MM/YYYY')
                                      }}>
                                <h4>Sprint name</h4>
                                <Form.Item
                                    name="sprint_name"
                                    rules={[{required: true, message: 'Please input sprint name!'},
                                        {max: 50, message: `Sprint name cannot be longer than 50 characters`},
                                        {min: 3, message: 'Sprint name must be at least 3 characters'},
                                        {
                                            pattern: new RegExp(/[a-z]/gi),
                                            message: 'Sprint name must contain letters'
                                        }]}>
                                    <Input placeholder="Enter sprint name"/>
                                </Form.Item>
                                <h4>The date of the beginning</h4>
                                <Form.Item name="start_date"
                                           rules={[{required: false}]}>
                                    <DatePicker/>
                                </Form.Item>
                                <h4>The date of the ending</h4>
                                <Form.Item name="end_date"
                                           rules={[{required: false}]}>
                                    <DatePicker/>
                                </Form.Item>
                                <Form.Item className="start-sprint-buttons">
                                    <Button type="primary" htmlType="submit" style={{width: "100px"}}
                                            className="primary-button-submit"
                                    >
                                        Update
                                    </Button>
                                    <Button style={{marginLeft: "15px", width: "100px"}}
                                            onClick={onCancel}>Cancel</Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="delete-task-wrapper" ref={sprintDelRef}></div>
                    </>}
                </div>
                <SprintList
                    listId={title}
                    listType="SPRINT"
                    tasks={tasks}
                    sprint={sprint}
                />

                <input className={`task-creations-input ${isInputVisible}`} ref={taskInputRef}
                       onKeyDown={e => onKeyDown(e)} placeholder="What should be done?"/>
                {!isCreateTask && <button style={{display: "block"}} className="create-task-button"
                                          onMouseUp={onSetIsCreateTask}>Create task</button>}
            </div>
        </>
    )
}

export default SprintComponent


