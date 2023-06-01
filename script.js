const main_content = document.getElementById('main-content');
const project_form = document.getElementById('project-form');
const project_name_input = document.getElementById('project-name-input');

class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
}

class Todo {
    constructor(title, description, due_date) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
    }
}

function openCreateProjectForm() { 
    project_form.style.visibility = 'visible';
    project_name_input.value = '';
}

function getProjectsFromLocalStorage() {
    let projects = localStorage.getItem('projects');

    if (projects) {
        return JSON.parse(projects);
    }

    return [];
}

function saveProjectsToLocalStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function addProjectToLocalStorage(project) {
    let projects = getProjectsFromLocalStorage();
    projects.push(project);
    setProjectsInLocalStorage(projects);
}

const visited = localStorage.getItem('visited');
if (visited) {
    getProjectsFromLocalStorage().forEach(project => {
        createProjectBlock(project.name);
    });
} else {
    const default_project = new Project('default');
    setProjectsInLocalStorage([default_project]);

    localStorage.setItem('visited', 'true')
}

document.getElementById('create-project-button').addEventListener('click', (event) => {
    event.preventDefault();
    project_form.style.visibility = 'hidden';

    createProjectBlock(project_name_input.value);
    addProjectToLocalStorage(new Project(project_name_input.value));
});

document.querySelectorAll('.project-menu').forEach(project => {
    project.addEventListener('click', () => {

    });
});

function createProjectBlock(project_name) {
    let project_box = document.createElement('div');
    let project_title = document.createElement('div');
    let project_menu = document.createElement('span');
    let delete_project_button = document.createElement('div');

    project_box.className = 'project-box';
    project_title.className = 'project-title';
    project_menu.classList.add('project-menu', 'material-symbols-outlined');
    delete_project_button.className = 'delete-project-button';

    project_title.textContent = project_name;
    project_menu.textContent = 'more_vert';
    delete_project_button.textContent = 'X';

    delete_project_button.addEventListener('click', () => {
        project_box.remove();
        removeProjectFromStorage(project_name);
    });

    project_box.appendChild(project_title);
    project_box.appendChild(project_menu);
    project_box.appendChild(delete_project_button);
    main_content.append(project_box);
}

function removeProjectFromStorage(project_name) {
    let projects = getProjectsFromLocalStorage();

    let index = projects.map(function(e) { return e.name; }).indexOf(project_name);
    if (index !== -1) {
        projects.splice(index, 1);
    }

    setProjectsInLocalStorage(projects);
}
