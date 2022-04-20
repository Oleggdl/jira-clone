import React from 'react'
import './DeleteProject.scss'
import {Input} from "antd"

const DeleteProjectComponent = ({
                                    deleteProjectWrapper, isDisabled, projectData, setValue, value,
                                    deleteProjectHandler
                                }) => {

    return (
        <>
            <div className="delete-project-container">
                <h2>Are you absolutely sure?</h2>
                <p style={{fontWeight: "600"}}>Unexpected bad things will happen if you don’t read this!</p>
                <p> This action cannot be undone. This will permanently delete
                    the <span>{projectData.project_name}</span> sprints, tasks, labels and remove all
                    collaborator associations.</p>
                <p>Please type <span>{projectData.project_name}</span> to confirm.</p>
                <Input value={value} onChange={e => setValue(e.target.value)}/>
                <button disabled={isDisabled} className="confirm-delete" onClick={(e) => deleteProjectHandler(e)}>
                    I understand the consequences, delete this repository
                </button>
            </div>
            <div className="project-settings-wrapper" ref={deleteProjectWrapper}></div>
        </>
    )
}

export default DeleteProjectComponent
