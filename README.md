# FitTrack Pro — Personal Fitness & Wellness Dashboard

## Project Objective
To develop a modern, visually engaging fitness tracking dashboard that uses static data and entirely client-side logic. FitTrack Pro simulates goal tracking, activity logging, meal planning, and insights generation—using only HTML, CSS, and JavaScript.

## Scope & Key Features

### Page 1: Daily Wellness Overview
- Dashboard style layout with:
  - Steps taken
  - Calories burned
  - Water intake
- All values loaded from a JS object.
- Circular progress meters or bar indicators using CSS animations.
- Auto-updated live clock using JavaScript.

### Page 2: Activity Log
- List of daily activities (e.g., running, cycling, yoga).
- Client-side filtering: Morning / Afternoon / Evening activities.
- **Add Activity Form:**
  - Fields: Activity Name, Duration (mins), Calories Burned.
  - JavaScript validation.
  - Adds data dynamically to the activity list.
  - Custom modal confirms “Activity Added Successfully.”

### Page 3: Meal Planner
- Displays breakfast, lunch, dinner tiles with pre-loaded meals.
- Users can:
  - Add or remove meals.
  - View calories for each meal item.
- JavaScript dynamically recalculates daily calorie intake.

### Page 4: Insights & Summary
- Graph-like representation using div bars (no chart libraries).
- Shows:
  - Weekly activities
  - Weekly calorie graph
- “Download Summary” button (simulated).
- “Reset Dashboard” clears static session values (sessionStorage/localStorage).

## Technical Constraints
- Only HTML, CSS, JS (ES6+).
- No external frameworks (utility CSS via CDN allowed).
- No backend or database.
- Dynamic updates through JS DOM manipulation.
- All popups must be custom-built overlays.
- Fully functional on static hosting platforms.

## Getting Started

To run this project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Open the `index.html` file in your web browser.
