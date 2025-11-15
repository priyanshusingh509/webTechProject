// Static Data
const defaultActivities = [
    { name: 'Morning Run', duration: 30, calories: 300, time: 'morning' },
    { name: 'Yoga Session', duration: 45, calories: 150, time: 'afternoon' },
    { name: 'Evening Walk', duration: 20, calories: 100, time: 'evening' }
];

const defaultMeals = {
    breakfast: [
        { name: 'Oatmeal', calories: 150 },
        { name: 'Banana', calories: 100 }
    ],
    lunch: [
        { name: 'Grilled Chicken Salad', calories: 400 },
        { name: 'Apple', calories: 80 }
    ],
    dinner: [
        { name: 'Salmon with Veggies', calories: 500 },
        { name: 'Yogurt', calories: 150 }
    ]
};

const weeklyActivities = [5, 3, 7, 4, 6, 2, 8]; // Mon to Sun
const weeklyCalories = [2000, 1800, 2200, 1900, 2100, 1700, 2300];
const activityTypes = ['Running', 'Yoga', 'Walking', 'Cycling', 'Swimming'];

// Load from localStorage or use defaults
let activities = JSON.parse(localStorage.getItem('activities')) || defaultActivities;
let meals = JSON.parse(localStorage.getItem('meals')) || defaultMeals;

// DOM Elements
const activityList = document.getElementById('activity-list');
const breakfastList = document.getElementById('breakfast-list');
const lunchList = document.getElementById('lunch-list');
const dinnerList = document.getElementById('dinner-list');
const totalCaloriesEl = document.getElementById('total-calories');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSection('overview');
    updateClock();
    setInterval(updateClock, 1000);
    loadActivities();
    loadMeals();
    updateProgressCircles();
    initCharts();
});

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Live Clock
function updateClock() {
    const now = new Date();
    document.getElementById('live-clock').textContent = now.toLocaleTimeString();
}

// Progress Circles
function updateProgressCircles() {
    document.querySelectorAll('.progress-circle').forEach(circle => {
        const value = parseInt(circle.dataset.value);
        const max = parseInt(circle.dataset.max);
        const percentage = (value / max) * 100;
        circle.style.background = `conic-gradient(#4caf50 ${percentage * 3.6}deg, #333 0deg)`;
    });
}

// Activity Log
function loadActivities() {
    activityList.innerHTML = '';
    activities.forEach(activity => {
        const li = document.createElement('li');
        li.textContent = `${activity.name} - ${activity.duration} mins - ${activity.calories} cal - ${activity.time}`;
        activityList.appendChild(li);
    });
}

function filterActivities(time) {
    const filtered = time === 'all' ? activities : activities.filter(a => a.time === time);
    activityList.innerHTML = '';
    filtered.forEach(activity => {
        const li = document.createElement('li');
        li.textContent = `${activity.name} - ${activity.duration} mins - ${activity.calories} cal - ${activity.time}`;
        activityList.appendChild(li);
    });
}

document.getElementById('activity-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('activity-name').value;
    const duration = parseInt(document.getElementById('activity-duration').value);
    const calories = parseInt(document.getElementById('activity-calories').value);
    const time = document.getElementById('activity-time').value;
    activities.push({ name, duration, calories, time });
    localStorage.setItem('activities', JSON.stringify(activities));
    loadActivities();
    closeModal('add-activity-modal');
    showSuccess('Activity Added Successfully');
    document.getElementById('activity-form').reset();
});

// Meal Planner
function loadMeals() {
    loadMealList('breakfast');
    loadMealList('lunch');
    loadMealList('dinner');
    updateTotalCalories();
}

function loadMealList(type) {
    const list = document.getElementById(`${type}-list`);
    list.innerHTML = '';
    meals[type].forEach((meal, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${meal.name} - ${meal.calories} cal <button onclick="removeMeal('${type}', ${index})">Remove</button>`;
        list.appendChild(li);
    });
}

function removeMeal(type, index) {
    meals[type].splice(index, 1);
    localStorage.setItem('meals', JSON.stringify(meals));
    loadMeals();
}

document.getElementById('meal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('meal-name').value;
    const calories = parseInt(document.getElementById('meal-calories').value);
    const type = document.getElementById('meal-type').value;
    meals[type].push({ name, calories });
    localStorage.setItem('meals', JSON.stringify(meals));
    loadMeals();
    closeModal('add-meal-modal');
    showSuccess('Meal Added Successfully');
    document.getElementById('meal-form').reset();
});

function updateTotalCalories() {
    let total = 0;
    Object.values(meals).forEach(mealList => {
        mealList.forEach(meal => total += meal.calories);
    });
    totalCaloriesEl.textContent = total;
}

// Modals
function openModal(modalId, mealType = '') {
    document.getElementById(modalId).style.display = 'block';
    if (mealType) {
        document.getElementById('meal-type').value = mealType;
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showSuccess(message) {
    document.getElementById('success-message').textContent = message;
    openModal('success-modal');
    setTimeout(() => closeModal('success-modal'), 2000);
}

// Charts
let activityChart, calorieChart, pieChart;

function initCharts() {
    // Activity Chart
    const ctx1 = document.getElementById('activity-chart').getContext('2d');
    activityChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Activities',
                data: weeklyActivities,
                backgroundColor: '#4caf50'
            }]
        }
    });

    // Calorie Chart
    const ctx2 = document.getElementById('calorie-chart').getContext('2d');
    calorieChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Calories',
                data: weeklyCalories,
                borderColor: '#4caf50',
                fill: false
            }]
        }
    });

    // Pie Chart
    const ctx3 = document.getElementById('pie-chart').getContext('2d');
    pieChart = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: activityTypes,
            datasets: [{
                data: [20, 15, 25, 10, 30],
                backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#f44336', '#9c27b0']
            }]
        }
    });
}

// Download Summary (simulated)
function downloadSummary() {
    alert('Summary downloaded (simulated)');
}

// Reset Dashboard
function resetDashboard() {
    localStorage.removeItem('activities');
    localStorage.removeItem('meals');
    activities = [...defaultActivities];
    meals = { ...defaultMeals };
    loadActivities();
    loadMeals();
    updateProgressCircles();
    alert('Dashboard reset');
}