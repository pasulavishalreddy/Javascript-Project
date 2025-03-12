const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    function formatTime(hours, minutes, seconds) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function updateTaskTimer(taskItem, endTime) {
        const timerElement = taskItem.querySelector('.time');
        const now = new Date();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            timerElement.textContent = '00:00:00';
            clearInterval(taskItem.timerInterval);
            taskItem.classList.add('list-group-item-danger');
            alert(`Task "${taskItem.dataset.taskName}" is complete!`);
            return;
        }

        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        timerElement.textContent = formatTime(hours, minutes, seconds);
    }

    function addTask(taskName, hours, minutes, seconds) {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item d-flex justify-content-between align-items-center task';
        taskItem.dataset.taskName = taskName;

        const endTime = new Date();
        endTime.setHours(endTime.getHours() + parseInt(hours));
        endTime.setMinutes(endTime.getMinutes() + parseInt(minutes));
        endTime.setSeconds(endTime.getSeconds() + parseInt(seconds));

        taskItem.innerHTML = `
            <div>
                <strong>${taskName}</strong>
                <div class="time">${formatTime(hours, minutes, seconds)}</div>
            </div>
            <div>
                <button class="btn btn-sm btn-primary me-2 start-task">Start</button>
                <button class="btn btn-sm btn-success me-2 play-pause-task" disabled>Pause</button>
                <button class="btn btn-sm btn-warning me-2 reset-task">Reset</button>
                <button class="btn btn-sm btn-danger delete-task">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);

        taskItem.timerInterval = null;
        taskItem.querySelector('.start-task').addEventListener('click', () => {
            taskItem.querySelector('.start-task').disabled = true;
            taskItem.querySelector('.play-pause-task').disabled = false;

            taskItem.timerInterval = setInterval(() => updateTaskTimer(taskItem, endTime), 1000);
        });

        taskItem.querySelector('.play-pause-task').addEventListener('click', (e) => {
            const button = e.target;

            if (button.textContent === 'Pause') {
                clearInterval(taskItem.timerInterval);
                button.textContent = 'Play';
            } else {
                button.textContent = 'Pause';
                taskItem.timerInterval = setInterval(() => updateTaskTimer(taskItem, endTime), 1000);
            }
        });

        taskItem.querySelector('.reset-task').addEventListener('click', () => {
            clearInterval(taskItem.timerInterval);

            const newEndTime = new Date();
            newEndTime.setHours(newEndTime.getHours() + parseInt(hours, 10));
            newEndTime.setMinutes(newEndTime.getMinutes() + parseInt(minutes, 10));
            newEndTime.setSeconds(newEndTime.getSeconds() + parseInt(seconds, 10));

            endTime.setTime(newEndTime.getTime());
            taskItem.querySelector('.time').textContent = formatTime(hours, minutes, seconds);

            taskItem.querySelector('.start-task').disabled = false;
            taskItem.querySelector('.play-pause-task').textContent = 'Pause';
            taskItem.querySelector('.play-pause-task').disabled = true;
        });

        taskItem.querySelector('.delete-task').addEventListener('click', () => {
            clearInterval(taskItem.timerInterval);
            taskList.removeChild(taskItem);
        });
    }

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskName = document.getElementById('taskName').value;
        const hours = document.getElementById('hours').value;
        const minutes = document.getElementById('minutes').value;
        const seconds = document.getElementById('seconds').value;

        addTask(taskName, hours, minutes, seconds);
        taskForm.reset();
    });
