const main_content = document.getElementById('main-content');
const project_form = document.getElementById('project-form');
const project_name_input = document.getElementById('project-name-input');

// A class representing a project
class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
}

// A class represnting a todo which belongs to a project
class Todo {
    constructor(title, description, due_date) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
    }
}

// Opens the form that allows the user to create a new project
function openCreateProjectForm() { 
    project_form.style.visibility = 'visible';
    project_name_input.value = '';
}

// Parses and returns the list of projects from local storage
function getProjectsFromLocalStorage() {
    let projects = localStorage.getItem('projects');

    if (projects) {
        return JSON.parse(projects);
    }

    return [];
}

// Saves a list of projects into local storage as 'projects'
function saveProjectsToLocalStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Adds a new project to the 'projects' item in local storage
function addProjectToLocalStorage(project) {
    let projects = getProjectsFromLocalStorage();
    projects.push(project);
    saveProjectsToLocalStorage(projects);
}

// Runs when the page first loads
// Creates a default project if user is first time visitor
const visited = localStorage.getItem('visited');
if (visited) {
    getProjectsFromLocalStorage().forEach(project => {
        createProjectBlock(project.name);
    });
} else {
    const default_project = new Project('default');
    saveProjectsToLocalStorage([default_project]);

    localStorage.setItem('visited', 'true')
}

// Event listener for when the 'Create Project' button is clicked
document.getElementById('create-project-button').addEventListener('click', (event) => {
    event.preventDefault();
    project_form.style.visibility = 'hidden';

    createProjectBlock(project_name_input.value);
    addProjectToLocalStorage(new Project(project_name_input.value));
});

function createProjectBlock(project_name) {
    let project_block = document.createElement('div');
    let project_title = document.createElement('div');
    let project_menu = document.createElement('span');

    project_block.className = 'project-box';
    project_title.className = 'project-title';
    project_menu.classList.add('project-menu', 'material-symbols-outlined');

    project_title.textContent = project_name;
    project_menu.textContent = 'more_vert';

    project_block.appendChild(project_title);
    project_block.appendChild(project_menu);
    main_content.append(project_block);

    let menuCreated = false;
    let menu = null;

    project_menu.addEventListener('click', () => {
        if (!menuCreated) {
            menu = document.createElement('div');
            let delete_proj = document.createElement('div');
            delete_proj.textContent = 'Delete';
            menu.id = 'test';

            menu.addEventListener('click', () => {
                removeProjectFromStorage(project_name);
                project_block.remove();
            });

            menu.append(delete_proj);
            project_block.append(menu);

            menuCreated = true;
        } else {
            menu.remove();
            menuCreated = false;
        }
    });
}

// Removes project with the given name from local storage
function removeProjectFromStorage(project_name) {
    let projects = getProjectsFromLocalStorage();

    let index = projects.map(function(e) { return e.name; }).indexOf(project_name);
    if (index !== -1) {
        projects.splice(index, 1);
    }

    saveProjectsToLocalStorage(projects);
}
