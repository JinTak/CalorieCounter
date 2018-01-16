var putGoalHere = document.getElementById('goal');
var goal = localStorage.getItem('caloricGoal');


console.log(putGoalHere);
console.log(goal);
putGoalHere.innerHTML = goal;