document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('.add')) {
        // Function to add a new task
        document.querySelector('.add').addEventListener('submit', async function (e) {
            e.preventDefault();
            const title = this.title.value;
            const description = this.description.value;
            const completed = false;
    
            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, completed })
            });
    
            if (response.ok) {
                const newTask = await response.json();
                addTaskToList(newTask);
                this.reset();
            } else {
                showError('Failed to create task');
            }
        });

        // Function to delete a task
        document.querySelectorAll('.delete-form').forEach(form => {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();
                const id = this.querySelector('input[name="id"]').value;
    
                const response = await fetch(`/${id}`, {
                    method: 'DELETE'
                });
    
                if (response.ok) {
                    document.getElementById(`task-${id}`).remove();
                } else {
                    showError('Failed to delete task');
                }
            });
        });
    } else {
        // Function to update task
        document.querySelector('.update').addEventListener('submit', async function(e) {
            e.preventDefault();
            const title = this.title.value;
            const description = this.description.value;
            const id = this.action.replace('http://localhost:3000/', '');
            
            const response = await fetch(`/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            });
    
            if (response.ok) {
                const updateTask = await response.json();
                updateTaskInList(updateTask);
                this.reset();
            } else {
                showError('Failed to update task');
            }
        })

        // Function to delete a task
        document.querySelectorAll('.delete-form').forEach(form => {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();
                const id = this.querySelector('input[name="id"]').value;
    
                const response = await fetch(`/${id}`, {
                    method: 'DELETE'
                });
    
                if (response.ok) {
                    window.location.href = '/';
                } else {
                    showError('Failed to delete task');
                }
            });
        });
    }


    // Function to toggle task completion
    document.querySelectorAll('.complete-form').forEach(form => {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const id = this.querySelector('input[name="id"]').value;
            const completed = !this.querySelector('i').classList.contains('active');


            const response = await fetch(`/${id}?_method=PATCH`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed })
            });

            if (response.ok) {
                toggleTaskCompletion(id, completed);
            } else {
                console.log(response);
                showError('Failed to update task');
            }
        });
    });

    function showError(errorMessage) {
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message', 'alert', 'alert-danger');
        errorElement.innerHTML =`${errorMessage}`;

        document.querySelector('.main').prepend(errorElement);
    
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }

    function addTaskToList(task) {
        const taskElement = document.createElement('li');
        taskElement.classList.add('item', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        taskElement.id = `task-${task._id}`;
        taskElement.innerHTML = `
            <!-- top -->
            <div class="top">
              <!-- left -->
              <div class="left">
                <span>${task.title}</span>
              </div>
              <!-- right -->
              <div class="right">
                <form
                  id="complete-form-${task._id}"
                  action="/${task._id}?_method=PATCH"
                  method="post"
                  class="complete-form"
                >
                  <input type="hidden" name="id" value="${task._id}" />
                  <button type="submit" class="delete-submit button-action">
                    ${task.completed ? '<i class="fas fa-check-square checkbox active ms-4"></i>' : '<i class="far fa-square checkbox inactive ms-4"></i>'}
                  </button>
                </form>

                <form
                  id="delete-form-${task._id}"
                  action="/${task._id}?_method=DELETE"
                  method="post"
                  class="delete-form"
                >
                  <input type="hidden" name="id" value="${task._id}" />
                  <button type="submit" class="delete-submit button-action">
                    <i class="far fa-trash-alt delete ms-4"></i>
                  </button>
                </form>
              </div>
            </div>
            <!-- middle  -->
            <div class="middle">
              ${task.description.length > 35 ? `<p>${task.description.substring(0, 35)}.....</p>` : `<p>${task.description}</p>`}
            </div>
            <!-- bottom -->
            <div class="bottom">
              <a href="/${task._id}">More</a>
            </div>
        `;
        document.querySelector('.todos').prepend(taskElement);

        // Add event listeners to the new forms
        taskElement.querySelector('.delete-form').addEventListener('submit', async function (e) {
            e.preventDefault();
            const id = this.querySelector('input[name="id"]').value;

            const response = await fetch(`/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                document.getElementById(`task-${id}`).remove();
            } else {
                showError('Failed to delete task');
            }
        });

        taskElement.querySelector('.complete-form').addEventListener('submit', async function (e) {
            e.preventDefault();
            const id = this.querySelector('input[name="id"]').value;
            const completed = !this.querySelector('i').classList.contains('active');

            const response = await fetch(`/${id}?_method=PATCH`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed })
            });

            if (response.ok) {
                toggleTaskCompletion(id, completed);
            } else {
                showError('Failed to update task');
            }
        });
    }

    function updateTaskInList(task) {
        let taskElement = document.getElementById(`task-${task._id}`);
    
        // If the task element doesn't exist, create it
        if (!taskElement) {
            taskElement = document.createElement('li');
            taskElement.id = `task-${task._id}`;
            taskElement.classList.add('item', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            document.querySelector('.todos').prepend(taskElement);
        }
    
        // Update the task element's content
        taskElement.innerHTML = `
            <!-- top -->
            <div class="top">
              <!-- left -->
              <div class="left">
                <span>${task.title}</span>
              </div>
              <!-- right -->
              <div class="right">
                <form
                  id="complete-form-${task._id}"
                  action="/${task._id}?_method=PATCH"
                  method="post"
                  class="complete-form"
                >
                  <input type="hidden" name="id" value="${task._id}" />
                  <button type="submit" class="delete-submit button-action">
                    ${task.completed ? '<i class="fas fa-check-square checkbox active ms-4"></i>' : '<i class="far fa-square checkbox inactive ms-4"></i>'}
                  </button>
                </form>
    
                <form
                  id="delete-form-${task._id}"
                  action="/${task._id}?_method=DELETE"
                  method="post"
                  class="delete-form"
                >
                  <input type="hidden" name="id" value="${task._id}" />
                  <button type="submit" class="delete-submit button-action">
                    <i class="far fa-trash-alt delete ms-4"></i>
                  </button>
                </form>
              </div>
            </div>
            <!-- middle  -->
            <div class="middle">
              ${task.description.length > 35 ? `<p>${task.description.substring(0, 35)}.....</p>` : `<p>${task.description}</p>`}
            </div>
            <!-- bottom -->
        `;
    
        // Add event listeners to the forms
        taskElement.querySelector('.delete-form').addEventListener('submit', async function (e) {
            e.preventDefault();
            const id = this.querySelector('input[name="id"]').value;
    
            const response = await fetch(`/${id}`, {
                method: 'DELETE'
            });
    
            if (response.ok) {
                document.getElementById(`task-${id}`).remove();
            } else {
                showError('Failed to delete task');
            }
        });
    
        taskElement.querySelector('.complete-form').addEventListener('submit', async function (e) {
            e.preventDefault();
            const id = this.querySelector('input[name="id"]').value;
            const completed = !this.querySelector('i').classList.contains('active');
    
            const response = await fetch(`/${id}?_method=PATCH`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed })
            });
    
            if (response.ok) {
                toggleTaskCompletion(id, completed);
            } else {
                showError('Failed to update task');
            }
        });
    }
    
    function toggleTaskCompletion(id, completed) {
        const taskElement = document.getElementById(`task-${id}`);
        const icon = taskElement.querySelector('.complete-form i');
        icon.classList.toggle('fas');
        icon.classList.toggle('far');
        icon.classList.toggle('fa-check-square');
        icon.classList.toggle('fa-square');
        icon.classList.toggle('active');
        icon.classList.toggle('inactive');
    }
});
