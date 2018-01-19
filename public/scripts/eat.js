// Populating Caloric Goal with data from local storage
var putGoalHere = document.getElementById('caloricGoalHere');
// Remaining Calories span
var remainingCalories = document.getElementById('remainingCalories');
// Retrieve caloric goal from localStorage
var setGoal = localStorage.getItem('setGoal');
var caloriesRemaining = localStorage.getItem('caloriesRemaining');

var eatCustomFoodBtn = document.getElementById('eatCustomFoodBtn');
var newGoal = localStorage.getItem('caloriesRemaining');


eatCustomFoodBtn.addEventListener('click', ()=>{
    
    var customFoodForm = new FormData(document.getElementById("customFoodForm"));
    var eaten = customFoodForm.get("calories");
   
    newGoal = newGoal - eaten;
    if(newGoal <= 0){
        localStorage.setItem('caloriesRemaining', 0);
        
    } else {
        localStorage.setItem('caloriesRemaining', newGoal);
    }

});


// Checking if user has hit caloric goal!
if(caloriesRemaining <= 0) {
    window.location.href = "/congratulations";
}


putGoalHere.innerHTML = setGoal;
remainingCalories.innerHTML = caloriesRemaining;

// Reset local storage on logout
let logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', ()=>{
    localStorage.setItem("caloriesRemaining", 0);
    localStorage.setItem("setGoal", 0);
})
