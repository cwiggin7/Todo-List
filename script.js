// creates a 'todos' object which belongs to a project
class todos {
    constructor(title, description, due_date) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
    }
}

// creates a project of which 0 or more 'todos' belong to
class projects {
    constructor(name) {
        this.name = name
        this.todos = []
    }
}

const default_project = new projects('default');

all_projects = [];
all_projects.push(default_project);

all_projects.forEach(project => {
    var element = document.createElement('div')
    element.textContent = project.name
    document.body.appendChild(element)
});

// let newProjButton = document.getElementById('new-project-button')

const project_form = document.getElementById('project-form');
const project_input = document.getElementById('project-input');

function showForm() {
    project_form.style.visibility = 'visible';
}

document.getElementById('submit-project').addEventListener("click", function(event) {
    event.preventDefault();
    project_form.style.visibility = 'hidden';
    console.log(project_input.value);
});
