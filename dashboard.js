document.addEventListener("DOMContentLoaded", function () {
    let currentSection = "landing";
    let timer;
    let timeLeft = 1500; // 25 minutes in seconds
    let isRunning = false;

    function showSection(section) {
        document.getElementById(currentSection).classList.add("d-none");
        document.getElementById(section).classList.remove("d-none");
        currentSection = section;
    }

    window.showSection = showSection;

    function addTask() {
        const taskInput = document.getElementById("taskInput");
        const taskList = document.getElementById("taskList");
        if (taskInput.value.trim() !== "") {
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent = taskInput.value;
            taskList.appendChild(li);
            taskInput.value = "";
        }
    }

    window.addTask = addTask;

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    alert("Time's up! Take a break.");
                }
            }, 1000);
        }
    }

    window.startTimer = startTimer;

    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
    }

    window.pauseTimer = pauseTimer;

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 1500;
        isRunning = false;
        updateTimerDisplay();
    }

    window.resetTimer = resetTimer;

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById("timerDisplay").textContent = 
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function toggleTheme() {
        document.body.classList.toggle("bg-dark");
        document.body.classList.toggle("text-light");
    }

    window.toggleTheme = toggleTheme;
});


    