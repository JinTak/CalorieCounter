// Populating Caloric Goal with data from local storage
var putGoalHere = document.getElementById('caloricGoalHere');
// Remaining Calories span
var remainingCalories = document.getElementById('remainingCalories');
// Retrieve caloric goal from localStorage
var setGoal = localStorage.getItem('setGoal');
var caloriesEaten = localStorage.getItem('caloriesEaten');

putGoalHere.innerHTML = setGoal;
remainingCalories.innerHTML = caloriesEaten;