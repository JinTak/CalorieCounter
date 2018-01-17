var eatMyFoodBtns = document.getElementsByClassName('eatMyFoodBtns');
var newGoal = localStorage.getItem('caloriesRemaining');

for(let i = 0; i < eatMyFoodBtns.length; i++){
    eatMyFoodBtns[i].addEventListener('click', ()=>{
        let parent = eatMyFoodBtns[i].parentNode;
        let anotherParent = parent.parentNode;
        
        let caloriesEaten = anotherParent.querySelector('#calories').innerText;
        caloriesEaten = Number(caloriesEaten);

        newGoal = newGoal - caloriesEaten;
        if(newGoal <= 0){
            localStorage.setItem('caloriesRemaining', 0);
            
        } else {
            localStorage.setItem('caloriesRemaining', newGoal);
        }

    });
}