// Populating Caloric Goal with data from local storage
var putGoalHere = document.getElementById('caloricGoalHere');
// Remaining Calories span
var remainingCalories = document.getElementById('remainingCalories');
// Retrieve caloric goal from localStorage
var setGoal = localStorage.getItem('setGoal');
var caloriesRemaining = localStorage.getItem('caloriesRemaining');

// Checking if user has hit caloric goal!
if(caloriesRemaining <= 0) {
    window.location.href = "/congratulations";
}


putGoalHere.innerHTML = setGoal;
remainingCalories.innerHTML = caloriesRemaining;