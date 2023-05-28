const project_form = document.getElementById('project-form');
const project_form_input = document.getElementById('project-form-input');

//  a class representing a todo item
class todo {
    constructor(title, description, due_date) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
    }
}

//  a class representing a project
class project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
}

function showProjectForm() {
    project_form.style.visibility = 'visible';
    project_form_input.value = '';
}

document.getElementById('create-project-btn').addEventListener('click', (event) => {
    event.preventDefault();
    project_form.style.visibility = 'hidden';
    addProjectToLocal(new project(project_form_input.value));
});


//  returns the 'projects' item from local storage
function getProjects() {
    let projects = localStorage.getItem('projects');
    return JSON.parse(projects);
}

/*
  projects parameter: a list of project objects
  set the list in local storage as 'projects'
*/
function setProjects(projects) {
    projects = JSON.stringify(projects);
    localStorage.setItem('projects', projects);
}

//  adds a new project to 'projects' in local storage
function addProjectToLocal(project) {
    projects = getProjects();
    projects.push(project);
    setProjects(projects);
}

/*
  projects parameter: a list of project objects
  creates a div with project name for each project in list
*/
function displayProjects(projects) {
    projects.forEach(project => {
        let div = document.createElement('div');
        div.textContent = project.name;
        document.body.appendChild(div);
    });
}

//  flag to check if new or returning user
const visited = localStorage.getItem('visited')
if (visited) {
    //  get projects from localStorage and display them
    let projects = getProjects();
    displayProjects(projects);
} else {
    //  mark that the user has now visited this site
    localStorage.setItem('visited', 'true')

    //  create the default project for first-time visitors
    const default_project = new project('default');
    let projects = [default_project];
    setProjects(projects);
}
