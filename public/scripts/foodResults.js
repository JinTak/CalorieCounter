// Modal
let editFoodBtn = document.getElementById('saveSearchedFood');

// Get Modal Close Button
let modalCloseButton = document.getElementsByClassName('closeBtn');

let foodModal_0 = document.getElementById('foodModal-0');
let foodModal_1 = document.getElementById('foodModal-1');
let foodModal_2 = document.getElementById('foodModal-2');

editFoodBtn.addEventListener('click', ()=>{
    var radioChoice = document.getElementsByName('foodResultChoice');
    for(let c = 0; c < radioChoice.length; c++){
        if(radioChoice[c].checked){
            if(c === 0){
                foodModal_0.style.display = 'block';
            } else if(c === 1){
                foodModal_1.style.display = 'block';
            } else if(c === 2){
                foodModal_2.style.display = 'block';
            }
            
        }
    }
    
});

// Close modal when 'x' is clicked
for(var i = 0; i < modalCloseButton.length; i++){
    modalCloseButton[i].addEventListener('click', function() {
        foodModal_0.style.display = "none";
        foodModal_1.style.display = "none";
        foodModal_2.style.display = "none";
    })
}




// Picking api food result
// let foodRadioBtn = document.getElementsByClassName('apiFoodChoiceRadio');
// for(let i = 0; i < foodRadioBtn.length; i ++){
//     foodRadioBtn[i].addEventListener('click', ()=>{
//         let parentElement = foodRadioBtn[i].parentElement;
//         let foodNutritionList = parentElement.children;
//         // console.log(foodNutritionList);
//         for(let j = 0; j < 5; j++){
             
//             var desiredValues = foodNutritionList[j].getElementsByClassName('foodValue');
//             console.log(desiredValues[0].innerText);
        
//         }   
//     });
// }