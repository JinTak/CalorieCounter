var eatFoodBtn = document.getElementById('eatFoodBtn');
var newGoal = localStorage.getItem('caloriesRemaining');

eatFoodBtn.addEventListener('click', ()=>{
    var caloriesEaten = document.getElementById('calories').innerText;
    caloriesEaten = Number(caloriesEaten);
    console.log(typeof(caloriesEaten));
    newGoal = newGoal - caloriesEaten;
    if(newGoal <= 0){
        localStorage.setItem('caloriesRemaining', 0);
        
    } else {
        localStorage.setItem('caloriesRemaining', newGoal);
    }

});


// Reset local storage on logout
let logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', ()=>{
    localStorage.setItem("caloriesRemaining", 0);
    localStorage.setItem("setGoal", 0);
})



