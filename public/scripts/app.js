
// Getting caloric goal from user
let calorieSubmit = document.getElementById('calorieSubmit');

calorieSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    let putCaloricGoalHere = document.getElementById('caloricGoalHere');
    let caloric_Goal = document.getElementById('calorieGoalInput').value;
    caloric_Goal = Number(caloric_Goal);

    putCaloricGoalHere.innerText = " " + caloric_Goal;

    localStorage.setItem("caloriesRemaining", caloric_Goal);
    localStorage.setItem("setGoal", caloric_Goal);
});


// Reset local storage on logout
let logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', ()=>{
    localStorage.setItem("caloriesRemaining", 0);
    localStorage.setItem("setGoal", 0);
})
