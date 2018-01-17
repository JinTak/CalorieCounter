///////////////////////////////////////////////////
// Functionality for Food Modal for submitting ///
//////////////////////////////////////////////////
let editFoodBtn = document.getElementById('saveSearchedFoodBtn');

// Get Modal Close Button
let modalCloseButton = document.getElementsByClassName('closeBtn');

let foodModal_0 = document.getElementById('foodModal-0');
let foodModal_1 = document.getElementById('foodModal-1');
let foodModal_2 = document.getElementById('foodModal-2');

var pickedFood = undefined;

editFoodBtn.addEventListener('click', ()=>{
    console.log('hit submit');
    var radioChoice = document.getElementsByName('foodResultChoice');
    
    for(let c = 0; c < radioChoice.length; c++){
        if(radioChoice[c].checked){
            if(c === 0){
                pickedFood = foodModal_0;
                foodModal_0.style.display = 'block';
            } else if(c === 1){
                pickedFood = foodModal_1;
                foodModal_1.style.display = 'block';
            } else if(c === 2){
                pickedFood = foodModal_2;
                foodModal_2.style.display = 'block';
            }
            
        }
    }

    scroll(0, 0);

    console.log(pickedFood);
    
});

// Close modal when 'x' is clicked
for(var i = 0; i < modalCloseButton.length; i++){
    modalCloseButton[i].addEventListener('click', function() {
        foodModal_0.style.display = "none";
        foodModal_1.style.display = "none";
        foodModal_2.style.display = "none";
    })
}


/////////////////////////////////////////////////////////////
// This section is is to update local storage caloric goal //
/////////////////////////////////////////////////////////////

// Retrieve caloric goal from localStorage
var newGoal = localStorage.getItem('caloriesRemaining');

var foodModalSubmit = document.getElementsByClassName('foodModalSubmit');
for(var i = 0; i < foodModalSubmit.length; i++) {
    foodModalSubmit[i].addEventListener('click', function(){
        let eaten = pickedFood.getElementsByTagName('input')[1].value;
        newGoal = newGoal - eaten;
        if(newGoal <= 0){
            localStorage.setItem('caloriesRemaining', 0);
            
        } else {
            localStorage.setItem('caloriesRemaining', newGoal);
        }
       
    });
}
