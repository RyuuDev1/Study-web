let timerInterval;
let startTime;
let elapsedTime = 0;
let running = false;
let studyTimeToday = 0;

// Function to get current time in IST
function getISTTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ISTOffset = 330; // IST is UTC+5:30 which is 330 minutes
    return new Date(utc + (ISTOffset * 60000));
}

// Function to format the date in IST
function formatDateIST() {
    const istTime = getISTTime();
    const options = { weekday: 'short', day: 'numeric', month: 'numeric' };
    return istTime.toLocaleDateString('en-IN', options).replace(/,/g, '');
}

// Function to check if it's midnight in IST
function isMidnightIST() {
    const istTime = getISTTime();
    return istTime.getHours() === 0 && istTime.getMinutes() === 0 && istTime.getSeconds() === 0;
}

// Load study time from localStorage when the page loads
window.onload = function() {
    const savedTime = localStorage.getItem('studyTimeToday');
    if (savedTime) {
        studyTimeToday = parseInt(savedTime, 10);
    }
    updateDate();
    updateDisplay();
    // Add event listener to the toggle button
    document.getElementById('toggleButton').addEventListener('click', toggleTimer);
    
    // Check if it's midnight in IST on page load
    if (isMidnightIST()) {
        studyTimeToday = 0;
        localStorage.setItem('studyTimeToday', studyTimeToday);
    }
    
    // Set interval to check for midnight every minute
    setInterval(checkMidnightIST, 60000); // Check every minute
    // Update date every minute to ensure it's always current
    setInterval(updateDate, 60000);
};

function updateDate() {
    document.getElementById('date').innerHTML = formatDateIST();
}

function updateTimer() {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    const time = new Date(elapsedTime);
    const formattedTime = `${String(time.getUTCHours()).padStart(2, '0')}:${String(time.getUTCMinutes()).padStart(2, '0')}:${String(time.getUTCSeconds()).padStart(2, '0')}`;
    document.getElementById('timer').innerHTML = formattedTime;
    document.getElementById('currentTimer').innerHTML = formattedTime;
}

function toggleTimer() {
    if (!running) {
        startTimer();
    } else {
        stopTimer();
    }
}

function startTimer() {
    startTime = new Date().getTime() - elapsedTime;
    timerInterval = setInterval(updateTimer, 1000);
    running = true;
    document.getElementById('toggleButton').classList.add('running'); // Add class when running
}

function stopTimer() {
    clearInterval(timerInterval);
    running = false;
    studyTimeToday += elapsedTime;
    localStorage.setItem('studyTimeToday', studyTimeToday);
    elapsedTime = 0;
    updateDisplay();
    document.getElementById('toggleButton').classList.remove('running'); // Remove class when stopped
}

function updateDisplay() {
    const time = new Date(elapsedTime);
    const formattedTime = `${String(time.getUTCHours()).padStart(2, '0')}:${String(time.getUTCMinutes()).padStart(2, '0')}:${String(time.getUTCSeconds()).padStart(2, '0')}`;
    document.getElementById('timer').innerHTML = formattedTime;
    document.getElementById('currentTimer').innerHTML = formattedTime;
    document.getElementById('studyTimeDisplay').textContent = formatStudyTime(studyTimeToday);
}

// ... (previous code)

// Function to show the Timer section
function showTimer() {
    document.getElementById('timerContent').style.display = 'block';
    document.getElementById('booksContent').style.display = 'none';
    document.getElementById('insightsContent').style.display = 'none';
    document.getElementById('moreContent').style.display = 'none'; // Hide More section
    // Since we're using the footer for navigation, we don't need to update nav here
}

// Function to show the Books section
function showBooks() {
    document.getElementById('timerContent').style.display = 'none';
    document.getElementById('booksContent').style.display = 'block';
    document.getElementById('insightsContent').style.display = 'none';
    document.getElementById('moreContent').style.display = 'none'; // Hide More section
    document.getElementById('studyTimeDisplay').style.display = 'block';
    document.getElementById('studyTimeDisplay').textContent = formatStudyTime(studyTimeToday);
    // Since we're using the footer for navigation, we don't need to update nav here
}

// Function to show the Insights section
function showInsightsSection() {
    document.getElementById('timerContent').style.display = 'none';
    document.getElementById('booksContent').style.display = 'none';
    document.getElementById('insightsContent').style.display = 'block';
    document.getElementById('moreContent').style.display = 'none'; // Hide More section
    showInsights(); // Display insights when the section is shown
    // Since we're using the footer for navigation, we don't need to update nav here
}

// Function to show the More section
function showMoreSection() {
    document.getElementById('timerContent').style.display = 'none';
    document.getElementById('booksContent').style.display = 'none';
    document.getElementById('insightsContent').style.display = 'none';
    document.getElementById('moreContent').style.display = 'block';
    // Load the saved background image if any
    const savedBackground = localStorage.getItem('selectedBackground');
    if (savedBackground) {
        changeBackground(savedBackground);
    }
    // Load the saved profile picture if any
    const savedProfilePicture = localStorage.getItem('selectedProfilePicture');
    if (savedProfilePicture) {
        changeProfilePicture(savedProfilePicture);
    }
    // Since we're using the footer for navigation, we don't need to update nav here
}

// ... (rest of the code)

// ... (rest of the code)

function formatStudyTime(timeInMs) {
    const hours = Math.floor(timeInMs / 3600000);
    const minutes = Math.floor((timeInMs % 3600000) / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Check for midnight reset in IST
function checkMidnightIST() {
    if (isMidnightIST()) {
        studyTimeToday = 0;
        localStorage.setItem('studyTimeToday', studyTimeToday);
        updateDisplay();
    }
}

// Add To-Do List Functionality
function addTodo() {
    let todoInput = document.getElementById('todoInput');
    let todoList = document.getElementById('todoList');
    if (todoInput.value.trim() !== '') {
        let li = document.createElement('li');
        li.innerHTML = todoInput.value + ' <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>';
        todoList.appendChild(li);
        todoInput.value = '';
    }
}

function deleteTodo(element) {
    let todoList = document.getElementById('todoList');
    todoList.removeChild(element.parentElement);
}

// ... (previous code)

// Function to save daily data
function saveDailyData() {
    const istTime = getISTTime();
    const currentDate = istTime.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
    const dailyData = {
        studyTime: studyTimeToday,
        todos: Array.from(document.querySelectorAll('#todoList li')).map(li => li.textContent.trim())
    };
    
    // Retrieve existing data or initialize
    let yearlyData = JSON.parse(localStorage.getItem('yearlyData')) || {};
    
    // Save or update data for the current date
    yearlyData[currentDate] = dailyData;
    
    // Keep only the last 30 days of data
    const dates = Object.keys(yearlyData).sort((a, b) => new Date(b) - new Date(a));
    if (dates.length > 30) {
        dates.slice(30).forEach(date => delete yearlyData[date]);
    }
    
    localStorage.setItem('yearlyData', JSON.stringify(yearlyData));
}

// Modify stopTimer to save daily data
function stopTimer() {
    clearInterval(timerInterval);
    running = false;
    studyTimeToday += elapsedTime;
    localStorage.setItem('studyTimeToday', studyTimeToday);
    elapsedTime = 0;
    updateDisplay();
    saveDailyData(); // Save data when stopping the timer
}

// Function to display yearly progress (actually 30 days)
function showInsights() {
    const yearlyProgress = document.getElementById('yearlyProgress');
    yearlyProgress.innerHTML = ''; // Clear previous content
    
    const yearlyData = JSON.parse(localStorage.getItem('yearlyData')) || {};
    const dates = Object.keys(yearlyData).sort((a, b) => new Date(b) - new Date(a));
    
    if (dates.length === 0) {
        yearlyProgress.innerHTML = '<p>No data available yet.</p>';
        return;
    }
    
    dates.forEach(date => {
        const entry = yearlyData[date];
        const dayEntry = document.createElement('div');
        dayEntry.className = 'day-entry';
        
        const formattedDate = new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        dayEntry.innerHTML = `
            <h4>${formattedDate}</h4>
            <p>Study Time: ${formatStudyTime(entry.studyTime)}</p>
            <p>To-Do List:</p>
            <ul>${entry.todos.map(todo => `<li>${todo}</li>`).join('') || '<li>No tasks</li>'}</ul>
        `;
        yearlyProgress.appendChild(dayEntry);
    });
}

// Update the navigation function to show Insights
function showInsightsSection() {
    document.getElementById('timerContent').style.display = 'none';
    document.getElementById('booksContent').style.display = 'none';
    document.getElementById('insightsContent').style.display = 'block';
    showInsights(); // Display insights when the section is shown
    document.querySelector('.nav a.active').classList.remove('active');
    document.querySelector('.nav a:nth-child(3)').classList.add('active');
}

// Modify the navigation to include Insights
document.querySelector('.nav a:nth-child(3)').setAttribute('onclick', 'showInsightsSection()');


// ... (previous code)

// ... (previous code)

// Function to change the background image
function changeBackground(imageUrl) {
    document.querySelector('.header').style.backgroundImage = `url('${imageUrl}')`;
    localStorage.setItem('selectedBackground', imageUrl);
    console.log('Background changed to:', imageUrl);
}

// Function to change the profile picture
function changeProfilePicture(imageUrl) {
    const profileImages = document.querySelectorAll('.profile-image img');
    profileImages.forEach(img => {
        img.src = imageUrl;
        img.style.opacity = '0'; // Fade out the old image
        setTimeout(() => {
            img.style.opacity = '1'; // Fade in the new image
        }, 300); // Adjust timing as needed for smooth transition
    });
    localStorage.setItem('selectedProfilePicture', imageUrl);
    console.log('Profile picture changed to:', imageUrl);
}

// Function to initialize the application
// ... (previous code)

// Function to initialize the application
function initializeApp() {
    // Check for saved selections on initial load
    const savedBackground = localStorage.getItem('selectedBackground');
    if (savedBackground) {
        changeBackground(savedBackground);
    } else {
        // Default background if none is saved
        changeBackground('default-background.jpg'); // Replace with your default background
    }
    
    const savedProfilePicture = localStorage.getItem('selectedProfilePicture');
    if (savedProfilePicture) {
        changeProfilePicture(savedProfilePicture);
    } else {
        // Default profile picture if none is saved
        changeProfilePicture('default-profile.jpg'); // Replace with your default profile picture
    }

    // Initially show the Books section
    ;
}

// Call this function when the page loads
window.onload = function() {
    initializeApp();
    updateDate();
    updateDisplay();
    document.getElementById('toggleButton').addEventListener('click', toggleTimer);
    // Set interval to check for midnight every minute
    setInterval(checkMidnightIST, 60000);
    // Update date every minute to ensure it's always current
    setInterval(updateDate, 60000);
};

// ... (rest of the code)


// ... (rest of the code)

// ... (previous code)

// Function to get current time in IST
function getISTTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ISTOffset = 330; // IST is UTC+5:30 which is 330 minutes
    const istTime = new Date(utc + (ISTOffset * 60000));
    return istTime;
}

// Function to check if it's midnight in IST
function isMidnightIST() {
    const istTime = getISTTime();
    return istTime.getHours() === 0 && istTime.getMinutes() === 0 && istTime.getSeconds() === 0;
}

// Function to save the to-do list
function saveTodoList() {
    const todoList = document.getElementById('todoList');
    const todos = Array.from(todoList.children).map(li => li.textContent.trim());
    localStorage.setItem('todoList', JSON.stringify(todos));
}

// Function to load the to-do list
function loadTodoList() {
    const savedTodos = localStorage.getItem('todoList');
    if (savedTodos) {
        const todos = JSON.parse(savedTodos);
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = ''; // Clear existing list
        todos.forEach(todo => {
            let li = document.createElement('li');
            li.innerHTML = todo + ' <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>';
            todoList.appendChild(li);
        });
    }
}

// Modify addTodo function to save after adding
function addTodo() {
    let todoInput = document.getElementById('todoInput');
    let todoList = document.getElementById('todoList');
    if (todoInput.value.trim() !== '') {
        let li = document.createElement('li');
        li.innerHTML = todoInput.value + ' <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>';
        todoList.appendChild(li);
        todoInput.value = '';
        saveTodoList(); // Save the updated list
    }
}

// Modify deleteTodo function to save after deleting
function deleteTodo(element) {
    let todoList = document.getElementById('todoList');
    todoList.removeChild(element.parentElement);
    saveTodoList(); // Save the updated list
}

// Function to check for midnight reset in IST
function checkMidnightIST() {
    if (isMidnightIST()) {
        studyTimeToday = 0;
        localStorage.setItem('studyTimeToday', studyTimeToday);
        // Reset todo list at midnight
        localStorage.removeItem('todoList');
        updateDisplay();
    }
}

// Modify the initializeApp function to load the to-do list
function initializeApp() {
    // Check for saved selections on initial load
    const savedBackground = localStorage.getItem('selectedBackground');
    if (savedBackground) {
        changeBackground(savedBackground);
    } else {
        // Default background if none is saved
        changeBackground('default-background.jpg'); // Replace with your default background
    }
    
    const savedProfilePicture = localStorage.getItem('selectedProfilePicture');
    if (savedProfilePicture) {
        changeProfilePicture(savedProfilePicture);
    } else {
        // Default profile picture if none is saved
        changeProfilePicture('default-profile.jpg'); // Replace with your default profile picture
    }

    // Load saved to-do list
    loadTodoList();

    // Initially show the Books sectio
}

// Call this function when the page loads
window.onload = function() {
    initializeApp();
    updateDate();
    updateDisplay();
    document.getElementById('toggleButton').addEventListener('click', toggleTimer);
    // Set interval to check for midnight every minute
    setInterval(checkMidnightIST, 60000);
    // Update date every minute to ensure it's always current
    setInterval(updateDate, 60000);
};

// ... (rest of the code)

// ... (previous code)

// Function to get current time in IST
function getISTTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ISTOffset = 330; // IST is UTC+5:30 which is 330 minutes
    const istTime = new Date(utc + (ISTOffset * 60000));
    return istTime;
}

// Function to check if it's midnight in IST
function isMidnightIST() {
    const istTime = getISTTime();
    return istTime.getHours() === 0 && istTime.getMinutes() === 0 && istTime.getSeconds() === 0;
}

// Function to save daily data
function saveDailyData() {
    const istTime = getISTTime();
    const currentDate = istTime.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
    const dailyData = {
        studyTime: studyTimeToday,
        todos: Array.from(document.querySelectorAll('#todoList li')).map(li => li.textContent.trim())
    };
    
    // Retrieve existing data or initialize
    let yearlyData = JSON.parse(localStorage.getItem('yearlyData')) || {};
    
    // Save or update data for the current date
    yearlyData[currentDate] = dailyData;
    
    // Keep only the last 30 days of data
    const dates = Object.keys(yearlyData).sort((a, b) => new Date(b) - new Date(a));
    if (dates.length > 30) {
        dates.slice(30).forEach(date => delete yearlyData[date]);
    }
    
    localStorage.setItem('yearlyData', JSON.stringify(yearlyData));
}

// Function to load daily data
function loadDailyData() {
    const istTime = getISTTime();
    const currentDate = istTime.toISOString().split('T')[0];
    const yearlyData = JSON.parse(localStorage.getItem('yearlyData')) || {};
    
    if (yearlyData[currentDate]) {
        studyTimeToday = yearlyData[currentDate].studyTime;
        loadTodoList(yearlyData[currentDate].todos);
    } else {
        studyTimeToday = 0; // If no data for today, reset to 0
    }
    
    updateDisplay();
}

// Modify stopTimer to save daily data
function stopTimer() {
    clearInterval(timerInterval);
    running = false;
    studyTimeToday += elapsedTime;
    elapsedTime = 0;
    saveDailyData(); // Save data when stopping the timer
    updateDisplay();
}

// Function to check for midnight reset in IST
function checkMidnightIST() {
    if (isMidnightIST()) {
        studyTimeToday = 0;
        localStorage.removeItem('todoList'); // Clear the to-do list
        localStorage.removeItem('yearlyData'); // Clear yearly data to reset everything
        updateDisplay();
    }
}

// Modify the initializeApp function to load daily data
function initializeApp() {
    // Check for saved selections on initial load
    const savedBackground = localStorage.getItem('selectedBackground');
    if (savedBackground) {
        changeBackground(savedBackground);
    } else {
        // Default background if none is saved
        changeBackground('default-background.jpg'); // Replace with your default background
    }
    
    const savedProfilePicture = localStorage.getItem('selectedProfilePicture');
    if (savedProfilePicture) {
        changeProfilePicture(savedProfilePicture);
    } else {
        // Default profile picture if none is saved
        changeProfilePicture('default-profile.jpg'); // Replace with your default profile picture
    }

    // Load saved daily data
    loadDailyData();

    // Initially show the Books section
}

// Call this function when the page loads
window.onload = function() {
    initializeApp();
    updateDate();
    updateDisplay();
    document.getElementById('toggleButton').addEventListener('click', toggleTimer);
    // Set interval to check for midnight every minute
    setInterval(checkMidnightIST, 60000);
    // Update date every minute to ensure it's always current
    setInterval(updateDate, 60000);
};

// ... (rest of the code)