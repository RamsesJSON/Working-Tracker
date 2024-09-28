// Initialize the counter and retrieve saved data from localStorage
let dayCount = parseInt(localStorage.getItem('dayCount')) || 0;
let title = localStorage.getItem('title') || 'My Day Counter';

// Select elements
const dayDisplay = document.getElementById('current-day');
const daysContainer = document.querySelector('.days');
const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const titleElement = document.getElementById('title');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const keyInput = document.getElementById('keyInput');
const generatedKey = document.getElementById('generatedKey');
const copyKeyBtn = document.getElementById('copyKeyBtn');

// Update title from localStorage
titleElement.innerText = title;

// Function to create 40 circles
function createCircles() {
  daysContainer.innerHTML = '';
  for (let i = 1; i <= 40; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    if (i <= dayCount) {
      circle.classList.add('active');
    }
    daysContainer.appendChild(circle);
  }
}

// Function to update the display and save to localStorage
function updateDayCount() {
  dayDisplay.innerText = dayCount;
  localStorage.setItem('dayCount', dayCount);
  createCircles();
}

// Add day function
addBtn.addEventListener('click', () => {
  if (dayCount < 40) {
    dayCount++;
    updateDayCount();
  }
});

// Subtract day function
subtractBtn.addEventListener('click', () => {
  if (dayCount > 0) {
    dayCount--;
    updateDayCount();
  }
});

// Change the title and save to localStorage
titleElement.addEventListener('input', () => {
  localStorage.setItem('title', titleElement.innerText);
});

// Initialize
updateDayCount();

// Function to generate a unique key
function generateUniqueKey() {
  return 'key_' + Math.random().toString(36).substr(2, 9);
}

// Save the progress with a unique key
saveBtn.addEventListener('click', () => {
  const key = generateUniqueKey();
  const data = {
    dayCount: dayCount,
    title: titleElement.innerText
  };

  localStorage.setItem(key, JSON.stringify(data));
  generatedKey.innerText = key;
  alert("Progress saved! Your key is: " + key);
});

// Load the progress from the entered key
loadBtn.addEventListener('click', () => {
  const key = keyInput.value.trim();
  const savedData = localStorage.getItem(key);

  if (savedData) {
    const data = JSON.parse(savedData);
    dayCount = data.dayCount;
    titleElement.innerText = data.title;

    updateDayCount();
    alert("Progress loaded successfully!");
  } else {
    alert("Invalid key. Please enter a valid key.");
  }
});

// Copy the generated key to the clipboard
copyKeyBtn.addEventListener('click', () => {
  const key = generatedKey.innerText;
  if (key) {
    navigator.clipboard.writeText(key);
    alert("Key copied to clipboard!");
  } else {
    alert("No key to copy.");
  }
});
