var putGoalHere = document.getElementById('caloricGoalHere');
var goal = localStorage.getItem('caloricGoal');


console.log(putGoalHere);
console.log(goal);
putGoalHere.innerHTML = goal;