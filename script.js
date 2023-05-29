const project_form = document.getElementById('project-form');
const project_form_input = document.getElementById('project-form-input');

// A class representing a todo item
class todo {
    constructor(title, description, due_date) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
    }
}

// A class representing a project
class project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
}

// Show the form that allows users to create a new project.
function showProjectForm() {
    project_form.style.visibility = 'visible';
    project_form_input.value = '';
}

// Get and return the 'projects' item from local storage.
// 'projects' contains a reference of all the projects a user has created.
function getProjects() {
    let projects = localStorage.getItem('projects');
    return JSON.parse(projects);
}

// Store user's projects in local storage under 'projects'. 
// This allows retaining user's projects across multiple visits.
function setProjects(projects) {
    projects = JSON.stringify(projects);
    localStorage.setItem('projects', projects);
}

// Check 'visited' in localStorage. If exists, user is returning; otherwise, they're a first-time visitor.
if (localStorage.getItem('visited')) {
    let projects = getProjects();
    projects.forEach(project => {
        createProjectBlock(project.name);
    });
} else {
    // For first-time visitors, create a 'default' project and store in localStorage.
    const default_project = new project('default');
    setProjects([default_project]);

    // Mark user as no longer a first-time visitor.
    localStorage.setItem('visited', 'true')
}

document.getElementById('create-project-btn').addEventListener('click', (event) => {
    event.preventDefault();
    project_form.style.visibility = 'hidden';
    createProjectBlock(project_form_input.value);
    let projects = getProjects();
    projects.push(new project(project_form_input.value));
    setProjects(projects);
});

// Create and display an HTML block for a given project.
// The block includes the project's name and a delete button.
function createProjectBlock(project_name) {
    let project_block = document.createElement('div');
    let project = document.createElement('div');
    let delete_project_btn = document.createElement('div');

    project_block.className = 'project-block';
    project.className = 'project';
    delete_project_btn.className = 'delete-project-btn';

    project.textContent = project_name;
    delete_project_btn.textContent = 'X';

    delete_project_btn.addEventListener('click', () => {
        project_block.remove();
        removeProjectFromStorage(project_name);
    });

    project_block.appendChild(project);
    project_block.appendChild(delete_project_btn);
    document.body.append(project_block);
}

// This function removes a project (with the given name) from 'projects' in local storage,
// assuming 'projects' is an array of objects each with a 'name' property.
function removeProjectFromStorage(project_name) {
    let projects = getProjects();

    let index = projects.map(function(e) { return e.name; }).indexOf(project_name);
    if (index !== -1) {
        projects.splice(index, 1);
    }

    setProjects(projects);
}
