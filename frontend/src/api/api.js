import axios from "axios"

const instance = axios.create({
    withCredentials: false,
    baseURL: `http://localhost:8080/jira-clone`,
})

export const projectsAPI = {
    createProject(data, headers) {
        return instance.post(`scrum/projects`, data, {headers: headers})
    },
    updateProject(id, data, headers) {
        return instance.put(`scrum/projects/${id}`, data, {headers: headers})
    },
    getProjects(headers) {
        return instance.get(`scrum/projects`, {headers: headers})
    },
    getProjectById(id, headers) {
        return instance.get(`scrum/userScrumProject/${id}`, {headers: headers})
    },
    searchProjects(query, userId, headers) {
        return instance.get(`scrum/userScrumProject/search/${userId}?projectName=${query}`, {headers: headers})
    },
}

export const userScrumProjectAPI = {
    createUserScrumProject(data, headers) {
        return instance.post(`scrum/userScrumProject`, data, {headers: headers})
    },
    getUserScrumProject(userId, headers) {
        return instance.get(`/scrum/userScrumProject/forUsers/${userId}`, {headers: headers})
    },
    putUserScrumProject(userScrumProjectId, userId, projectId, userRoleId, headers) {
        return instance.put(`scrum/userScrumProject/${userScrumProjectId}/${userId}/${projectId}/${userRoleId}/`,
            null, {headers: headers})
    },
}

export const tasksAPI = {
    createTask(data, headers) {
        return instance.post(`scrum/tasks`, data, {headers: headers})
    },
    putTask(taskId, creatorId, executorId, headers) {
        return instance.put(`scrum/tasks/${taskId}/${creatorId}/${executorId}`, null, {headers: headers})
    },
    updateTaskDescription(taskId, data, headers) {
        return instance.put(`scrum/tasks/description/${taskId}`, data, {headers: headers})
    },
    getTasks(headers) {
        return instance.get(`scrum/tasks`, {headers: headers})
    },
    getTaskById(id, headers) {
        return instance.get(`scrum/tasks/${id}`, {headers: headers})
    },
    getUsersOnProject(projectId, headers) {
        return instance.get(`/scrum/userScrumProject/usersOnProject/${projectId}`, {headers: headers})
    },
}

export const sprintsAPI = {
    createSprint(data, headers) {
        return instance.post(`scrum/sprints`, data, {headers: headers})
    },
    getSprints(projectId, headers) {
        return instance.get(`scrum/sprints/project/${projectId}`, {headers: headers})
    },
    createSprintWithProject(sprintId, projectId, headers) {
        return instance.put(`scrum/sprints/project/${sprintId}/${projectId}`, null, {headers: headers})
    }
}

export const taskSprintAPI = {
    createTaskSprint(data, headers) {
        return instance.post(`scrum/taskSprint`, data, {headers: headers})
    },
    createTaskSprintPut(taskSprintId, sprintId, taskId, headers) {
        return instance.put(`scrum/taskSprint/${taskSprintId}/${sprintId}/${taskId}`, null, {headers: headers})
    },
    getTaskSprints(sprintId, headers) {
        return instance.get(`scrum/taskSprint/${sprintId}`, {headers: headers})
    },
    deleteTaskSprints(taskSprintId, headers) {
        return instance.delete(`scrum/taskSprint/${taskSprintId}`, {headers: headers})
    }
}

export const columnsAPI = {
    createColumn(data, headers) {
        return instance.post(`scrum/columns`, data, {headers: headers})
    },
    getColumns(headers) {
        return instance.get(`scrum/columns`, {headers: headers})
    },
    deleteColumnScrum(id, headers) {
        return instance.delete(`scrum/columns/${id}`, {headers: headers})
    },
}

export const commentsScrumAPI = {
    createCommentScrum(data, headers) {
        return instance.post(`scrum/commentsScrum`, data, {headers: headers})
    },
    getCommentsScrum(taskId, headers) {
        return instance.get(`scrum/commentsScrum/task/${taskId}`, {headers: headers})
    },
    createCommentScrumForTask(commentId, userId, taskId, headers) {
        return instance.put(`scrum/commentsScrum/user/${commentId}/${userId}/${taskId}`, null, {headers: headers})
    },
    deleteCommentsScrum(id, headers) {
        return instance.delete(`scrum/commentsScrum/${id}`, {headers: headers})
    },
}

export const backlogAPI = {
    createBacklogElement(data, headers) {
        return instance.post(`scrum/backlog`, data, {headers: headers})
    },
    getBacklogElements(headers) {
        return instance.get(`scrum/backlog`, {headers: headers})
    },
    deleteBacklogElement(id, headers) {
        return instance.delete(`scrum/backlog/${id}`, {headers: headers})
    },
    uniteBacklogProjectTask(backlogId, taskId, projectId, headers) {
        return instance.put(`scrum/backlog/${backlogId}/${taskId}/${projectId}`, null, {headers: headers})
    },
    getBacklogForProject(projectId, headers) {
        return instance.get(`scrum/backlog/tasks/${projectId}`, {headers: headers})
    },
}
