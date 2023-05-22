class todos {
    constructor(title, description, due_date) {
        this.title = title;
        this.description = description;
        this.due_date = due_date;
    }
}

class projects {
    constructor(name) {
        this.name = name
        this.todos = []
    }
}

let default_project = new projects('default')

all_projects = []
all_projects.push(default_project)

all_projects.forEach(project => {
    var element = document.createElement('div')
    element.textContent = project.name
    document.body.appendChild(element)
});

let newProjButton = document.getElementById('new-project-button')

let project_form = document.getElementById('project-form')

function showForm() {
    project_form.style.visibility = 'visible';
}
