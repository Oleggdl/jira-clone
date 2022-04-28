import React from 'react'
import './Sprint.scss'
import {Button} from "antd"
import SprintStartWindowContainer from "./SprintStartWindow/SprintStartWindowContainer"
import {EllipsisOutlined} from "@ant-design/icons"
import SprintList from "./SprintListComponents"

const SprintComponent = ({
                             sprint, index, taskSprints, isCreateTask, onSetIsCreateTask,
                             onKeyDown, taskInputRef, isInputVisible, setIsSprintStartingMod,
                             isSprintStartingMod, completeSprint, isSettingsSprint,
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
                        <div>{sprint?.start_date}</div>
                        <div> –</div>
                        <div>{sprint?.end_date}</div>
                    </>}
                    <div>(Tasks count: <span>{tasks ? tasks.length : null}</span>)</div>
                    {sprint?.is_started
                        ? <Button className="start-sprint-button" type="primary"
                                  onClick={completeSprint}>Complete a sprint</Button>
                        : (index === 0
                            ? <Button className="start-sprint-button" type="primary"
                                      onClick={() => setIsSprintStartingMod(true)}>Start a sprint</Button>
                            : <Button disabled={true}>Start a sprint</Button>)}
                    <div className="sprint-settings" onClick={isSettingsSprintHandler} ref={settingsBtnRef}>
                        <EllipsisOutlined/></div>
                    {isSettingsSprint && <div className="sprint-settings-window" ref={sprintSettingsRef}>
                        {/*<div><h3>Change sprint</h3></div>*/}
                        <div onClick={() => {
                            setIsDeleteSprint(true)
                            setIsSettingsSprint()
                        }}><h3>Delete sprint</h3></div>
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
                </div>
                <SprintList
                    listId={title}
                    listType="SPRINT"
                    tasks={tasks}
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


