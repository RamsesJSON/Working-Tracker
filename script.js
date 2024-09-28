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

// Function to encode data to Base64
function encodeData(dayCount, title) {
  const data = { dayCount, title };
  const jsonData = JSON.stringify(data);
  return btoa(jsonData); // Base64 encoding
}

// Function to decode Base64 data
function decodeData(encodedData) {
  try {
    const decodedData = atob(encodedData); // Base64 decoding
    return JSON.parse(decodedData);
  } catch (error) {
    alert("Invalid key. Please check and try again.");
    return null;
  }
}

// Save the progress with a Base64 encoded key
saveBtn.addEventListener('click', () => {
  const encodedKey = encodeData(dayCount, titleElement.innerText);
  generatedKey.innerText = encodedKey;
  alert("Progress saved! Your key is: " + encodedKey);
});

// Load the progress from the entered Base64 key
loadBtn.addEventListener('click', () => {
  const encodedKey = keyInput.value.trim();
  const data = decodeData(encodedKey);

  if (data) {
    dayCount = data.dayCount;
    titleElement.innerText = data.title;

    updateDayCount();
    alert("Progress loaded successfully!");
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
